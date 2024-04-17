import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  return user;
};

export const verifyJWTAndAuthorization = asyncHandler(
  async (req, res, next) => {
    try {
      req.user = await verifyJWT(req);
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid Access Token");
    }
  }
);

export const verifyJWTAndAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = await verifyJWT(req);

    if (!user.isAdmin) {
      throw new ApiError(403, "You are not an Admin!");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      error?.status || 401,
      error?.message || "Invalid Access Token"
    );
  }
});
