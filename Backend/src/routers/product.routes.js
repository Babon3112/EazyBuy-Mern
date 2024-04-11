import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js"; // corrected import path
import CryptoJS from "crypto-js";
import { Product } from "../models/product.model.js";

const router = Router();

// create
router.route("/add-product").post(verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
});

// update
router
  .route("/update-product/:id")
  .put(verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  });

// delete
router
  .route("/delete-product/:id")
  .delete(verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product deleted");
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  });

// get product
router.route("/product/:id").get(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all products
router.route("/").get(async (req, res) => {
  const queryNew = req.query.new;
  const queryCategories = req.query.category;

  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (queryCategories) {
      products = await Product.find({
        categories: {
          $in: [queryCategories],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
});

export default router;
