import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    image: { type: String },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNo: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
