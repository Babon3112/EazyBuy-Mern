import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
