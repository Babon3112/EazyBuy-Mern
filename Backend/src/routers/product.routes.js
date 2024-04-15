import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js"; // corrected import path
import CryptoJS from "crypto-js";
import { Product } from "../models/product.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.util.js";
import { CLOUD_PRODUCT_FOLDER_NAME } from "../constants.js";
import { upload } from "../middleWares/multer.middleware.js";

const router = Router();

// create
router.route("/add-product").post(
  verifyTokenAndAdmin,
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    const { title, description, categories, size, color, price, inStock } =
      req.body;

    let productImageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.productImage) &&
      req.files.productImage.length > 0
    ) {
      productImageLocalPath = req.files.productImage[0].path;
    }

    const productImage = await uploadOnCloudinary(
      productImageLocalPath,
      CLOUD_PRODUCT_FOLDER_NAME
    );

    try {
      const product = await Product.create({
        title,
        description,
        categories,
        size,
        color,
        price,
        inStock,
        image: productImage?.url,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  }
);

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
      const product = await Product.findById(req.params.id);
      await deleteFromCloudinary(product.image);
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product deleted");
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  });

// get product
router.route("/:id").get(async (req, res) => {
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
