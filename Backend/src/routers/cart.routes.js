import { Router } from "express";
import { Cart } from "../models/cart.model.js";
import {
  verifyJWTAndAdmin,
  verifyJWTAndAuthorization,
} from "../middleWares/auth.middleware.js";

const router = Router();

// create
router.route("/your-cart").post(verifyJWTAndAuthorization, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
});

// update
router.route("/update-cart/:id").put(verifyJWTAndAuthorization, async (req, res) => {
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
router.route("/delete-cart/:id").delete(verifyJWTAndAuthorization, async (req, res) => {
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
  .get(verifyJWTAndAuthorization, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// get all cart
router.route("/all-cart").get(verifyJWTAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
