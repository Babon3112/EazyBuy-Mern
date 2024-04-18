import { Router } from "express";
import {
  getAllCarts,
  getUserCart,
  updateItemToCart,
  deleteItemFromCart,
} from "../controllers/cart.controller.js";
import {
  verifyJWTAndAdmin,
  verifyJWTAndAuthorization,
} from "../middleWares/auth.middleware.js";

const router = Router();

router.route("/delete-item").put(verifyJWTAndAuthorization, deleteItemFromCart);
router.route("/update-item").patch(verifyJWTAndAuthorization, updateItemToCart);
router.route("/your-cart").get(verifyJWTAndAuthorization, getUserCart);
router.route("/all-cart").get(verifyJWTAndAdmin, getAllCarts);

export default router;
