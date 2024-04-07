import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userID: { type: String, required: true },
    products: [
      {
        productID: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("Cart", cartSchema);
