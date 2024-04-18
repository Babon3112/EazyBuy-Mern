import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { Product } from "../models/product.model.js";

export const updateItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity, color, size } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  let cart = await Cart.findOneAndUpdate(
    { userId, "products.productId": productId },
    {
      $inc: {
        "products.$.quantity": quantity,
        "products.$.price": product.price * quantity,
      },
    },
    { new: true }
  );

  if (!cart) {
    cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $setOnInsert: { userId },
        $addToSet: {
          products: {
            productId,
            quantity,
            color,
            size,
            price: product.price * quantity,
          },
        },
      },
      { upsert: true, new: true }
    );
  }

  if (!cart) {
    throw new ApiError(500, "Something went wrong when updating cart");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, cart, "Cart updated successfully"));
});

export const deleteItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } }, // $pull to remove item from array
      { new: true } // return the modified document
    );

    if (!updatedCart) {
      throw new ApiError(404, "Cart not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedCart,
          "Product deleted from Cart successfully"
        )
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export const getUserCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    cart = await Cart.create({ userId: req.user._id, items: [] });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Your cart fetched successfully"));
});

export const getAllCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find();
  if (!carts) {
    throw new ApiError(500, "Something went wrong while fetching carts");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, carts, "All carts fetched successfully"));
});
