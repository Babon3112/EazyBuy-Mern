import { Router } from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome,
} from "../controllers/order.controller.js";
import {
  verifyJWTAndAdmin,
  verifyJWTAndAuthorization,
} from "../middleWares/auth.middleware.js";

const router = Router();

router.route("/create-order").post(verifyJWTAndAuthorization, createOrder);
router.route("/your-orders").get(verifyJWTAndAuthorization, getUserOrders);
router.route("/update-order/:orderId").patch(verifyJWTAndAdmin, updateOrder);
router.route("/delete-order/:orderId").delete(verifyJWTAndAdmin, deleteOrder);
router.route("/monthly-income").get(verifyJWTAndAdmin, getMonthlyIncome);
router.route("/").get(verifyJWTAndAdmin, getAllOrders);

export default router;
