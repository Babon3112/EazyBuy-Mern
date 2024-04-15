import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.util.js";
import { CLOUD_AVATAR_FOLDER_NAME } from "../constants.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token",
      error
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, mobileNo, email, password } = req.body;

  if (
    [fullName, userName, mobileNo, email, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "all fields is required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { mobileNo }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or userName already exists");
  }

  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  const avatar = await uploadOnCloudinary(
    avatarLocalPath,
    CLOUD_AVATAR_FOLDER_NAME
  );

  const user = await User.create({
    avatar: avatar?.url,
    userName: userName.toLowerCase(),
    fullName,
    mobileNo,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;
  if (!(email || userName)) {
    throw new ApiError(400, "userName or email required");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword || newPassword)) {
    throw new ApiError(400, "oldPassword or newPassword required");
  }

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  if (oldPassword === newPassword) {
    throw new ApiError(400, "New password cannot be same as old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const getUserDetails = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current User fetched successfully"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  let toUpdate = {};

  if (fullName) {
    toUpdate["fullName"] = fullName;
  }

  if (email) {
    const user = await User.findOne({ email });
    if (user) {
      throw new ApiError(400, "This email is already taken");
    }
    toUpdate["email"] = email;
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { ...toUpdate },
    },
    { new: true }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken"
  );

  const delSuccess = await deleteFromCloudinary(user.avatar);
  if (!delSuccess) {
    throw new ApiError(500, "Something went wrong while updating avatar");
  }

  const avatar = await uploadOnCloudinary(
    avatarLocalPath,
    CLOUD_AVATAR_FOLDER_NAME
  );

  if (!avatar.url) {
    throw new ApiError(
      500,
      "Error while uploading on avatar file in cloudinary"
    );
  }

  user.avatar = avatar.url;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

export {
  loginUser,
  registerUser,
  getUserDetails,
  updateUserAvatar,
  updateUserDetails,
  changeUserPassword,
};
