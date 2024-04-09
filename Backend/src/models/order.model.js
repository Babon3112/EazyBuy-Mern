import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userID: { type: String, required: true },
    products: [
      {
        productID: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
