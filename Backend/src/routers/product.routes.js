import { Router } from "express";
import { upload } from "../middleWares/multer.middleware.js";
import { verifyJWTAndAdmin } from "../middleWares/auth.middleware.js";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/add-product").post(
  verifyJWTAndAdmin,
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
  ]),
  addProduct
);
router.route("/").get(getAllProducts);
router.route("/:productId").get(getProductById);
router
  .route("/update-product/:productId")
  .post(verifyJWTAndAdmin, updateProduct);
router
  .route("/delete-product/:productId")
  .delete(verifyJWTAndAdmin, deleteProduct);

export default router;
