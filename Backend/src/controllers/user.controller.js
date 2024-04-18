import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.util.js";
import { CLOUD_AVATAR_FOLDER_NAME } from "../constants.js";
import { Cart } from "../models/cart.model.js";

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
    ![fullName, userName, mobileNo, email, password].every(
      (field) => field && field.trim()
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { mobileNo }, { email }],
  });
  if (existedUser) {
    throw new ApiError(
      409,
      "User with userName, mobile, or email already exists"
    );
  }

  const avatarLocalPath =
    req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0
      ? req.files.avatar[0].path
      : null;
  const avatar = await uploadOnCloudinary(
    avatarLocalPath,
    CLOUD_AVATAR_FOLDER_NAME
  );
  if (avatarLocalPath && !avatar) {
    throw new ApiError(500, "Error uploading avatar");
  }

  const user = await User.create({
    avatar: avatar?.url,
    userName: userName.toLowerCase(),
    fullName,
    mobileNo,
    email,
    password,
  });

  const userCart = await Cart.create({ userId: user._id });
  if (!userCart) {
    throw new ApiError(500, "Error creating user cart");
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Error registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;
  if (!email && !userName) {
    throw new ApiError(400, "userName or email required");
  }

  const user = await User.findOne({ $or: [{ userName }, { email }] });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedinUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const changeUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(
      400,
      "Both currentPassword and newPassword are required"
    );
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid current password");
  }

  if (currentPassword === newPassword) {
    throw new ApiError(
      400,
      "New password cannot be the same as the old password"
    );
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
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "Current User fetched successfully"
      )
    );
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, userName, mobileNo, email } = req.body;
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const toUpdate = {};
  if (fullName) toUpdate.fullName = fullName;

  if (userName && userName !== user.userName) {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      throw new ApiError(400, "This username is already taken");
    }
    toUpdate.userName = userName;
  }

  if (mobileNo && mobileNo !== user.mobileNo) {
    const existingUser = await User.findOne({ mobileNo });
    if (existingUser) {
      throw new ApiError(400, "This mobile number is already taken");
    }
    toUpdate.mobileNo = mobileNo;
  }

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "This email is already taken");
    }
    toUpdate.email = email;
  }

  if (req.files && req.files.avatar && req.files.avatar.length > 0) {
    const avatarLocalPath = req.files.avatar[0].path;
    const delSuccess = await deleteFromCloudinary(user.avatar);
    if (!delSuccess) {
      throw new ApiError(
        500,
        "Something went wrong while deleting previous avatar"
      );
    }
    const avatar = await uploadOnCloudinary(
      avatarLocalPath,
      CLOUD_AVATAR_FOLDER_NAME
    );
    if (!avatar) {
      throw new ApiError(500, "Something went wrong while uploading avatar");
    }
    toUpdate.avatar = avatar.url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: toUpdate },
    { new: true, select: "-password -refreshToken" }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User details updated successfully")
    );
});

const deleteUser = asyncHandler(async (req, res) => {
  const { password } = req.body;
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  const [cartDelete, userDelete] = await Promise.all([
    Cart.findOneAndDelete({ userId: user._id }),
    User.findByIdAndDelete(user._id),
  ]);

  if (!cartDelete || !userDelete) {
    throw new ApiError(500, "Error deleting user or cart");
  }

  if (user.avatar !== "") {
    deleteFromCloudinary(user.avatar)
      .then(() => console.log("Avatar deleted successfully"))
      .catch((err) => console.error("Error deleting avatar:", err));
  }

  res.status(200).json(new ApiResponse(200, {}, "User successfully deleted"));
});

const getUserForAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
    .select("-password -refreshToken")
    .lean();
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully"));
});

const getAllUser = asyncHandler(async (req, res) => {
  const { new: query } = req.query;

  const users = await (query
    ? User.find().sort({ _id: -1 }).limit(5)
    : User.find());

  if (!users.length) {
    throw new ApiError(500, "Error while fetching users");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

const getStats = asyncHandler(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  if (!data.length) {
    throw new ApiError(
      500,
      "Error while fetching user registration statistics"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        data,
        "User registration statistics fetched successfully"
      )
    );
});

export {
  getStats,
  loginUser,
  logoutUser,
  getAllUser,
  deleteUser,
  registerUser,
  getUserDetails,
  getUserForAdmin,
  updateUserDetails,
  changeUserPassword,
};
