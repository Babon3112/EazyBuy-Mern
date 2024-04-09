import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js"; // corrected import path
import CryptoJS from "crypto-js";
import { Cart } from "../models/cart.model.js";

const router = Router();

// create
router.route("/your-cart").post(verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
});

// update
router
  .route("/update-cart/:id")
  .put(verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  });

// delete
router
  .route("/delete-cart/:id")
  .delete(verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart deleted");
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  });

// get user cart
router
  .route("/cart/:userId")
  .get(verifyTokenAndAuthorization, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// get all products
router.route("/all-cart").get(verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
