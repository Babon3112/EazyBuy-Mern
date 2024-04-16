import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { CLOUD_PRODUCT_FOLDER_NAME } from "../constants.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.util.js";

const addProduct = asyncHandler(async (req, res) => {
  const { title, description, categories, color, size, price, inStock } =
    req.body;

  if (
    [title, description, categories, color, price].some(
      (field) => !field?.trim()
    )
  ) {
    throw new ApiError(400, "All fields are required except size");
  }

  const existedProduct = await Product.findOne({ title });
  if (existedProduct) {
    throw new ApiError(409, "This product name is already in use");
  }

  const productImageLocalPath = req.files.productImage?.[0]?.path;

  if (!productImageLocalPath) {
    throw new ApiError(400, "Product Image is required");
  }

  const productImage = await uploadOnCloudinary(
    productImageLocalPath,
    CLOUD_PRODUCT_FOLDER_NAME
  );

  if (!productImage) {
    throw new ApiError(500, "Something went wrong uploading product image");
  }

  const productData = {
    title,
    description,
    categories,
    color,
    size: size || [],
    price,
    inStock,
    image: productImage.url,
  };

  const product = await Product.create(productData);

  if (!product) {
    throw new ApiError(500, "Something went wrong while adding the product");
  }

  res
    .status(201)
    .json(new ApiResponse(200, product, "Product added successfully"));
});

const updateProduct = async (req, res) => {
  const { title, description, categories, color, size, price, inStock } =
    req.body;
  const toUpdate = {
    title,
    description,
    categories,
    color,
    size,
    price,
    inStock,
  };

  Object.keys(toUpdate).forEach(
    (key) => toUpdate[key] === undefined && delete toUpdate[key]
  );

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    { $set: { ...toUpdate } },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Error updating product");
  }

  res
    .status(201)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const deletedProduct = await Product.findOneAndDelete({ _id: productId });

  if (!deletedProduct) {
    throw new ApiError(404, "Product not found");
  }

  const delSuccess = await deleteFromCloudinary(deletedProduct.image);

  if (!delSuccess) {
    throw new ApiError(
      500,
      "Something went wrong while deleting the product image"
    );
  }

  res
    .status(201)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
};

const getAllProducts = asyncHandler(async (req, res) => {
  const queryNew = req.query.new;
  const queryCategories = req.query.category;

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

  if (!products || products.length === 0) {
    throw new ApiError(500, "Something went wrong while fetching products");
  }

  res
    .status(200)
    .json(new ApiResponse(200, products, "All Products fetched successfully"));
});

const searchProducts = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    throw new ApiError(400, "Keyword is required for searching products");
  }

  const products = await Product.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { categories: { $regex: keyword, $options: "i" } },
    ],
  }).lean();

  if (!products) {
    throw new ApiError(500, "Error while searching products");
  }

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products searched successfully"));
};

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  searchProducts,
};
