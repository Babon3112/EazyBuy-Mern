import { Router } from "express";
import { Order } from "../models/order.model.js";
import {
  verifyJWTAndAdmin,
  verifyJWTAndAuthorization,
} from "../middleWares/auth.middleware.js";

const router = Router();

// create
router
  .route("/create-order")
  .post(verifyJWTAndAuthorization, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
      const saveOrder = await newOrder.save();
      res.status(200).json(saveOrder);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  });

// update
router.route("/update-order/:id").put(verifyJWTAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
});

// delete
router
  .route("/delete-order/:id")
  .delete(verifyJWTAndAdmin, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order deleted");
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  });

// get user orders
router.route("/order/:userId").get(verifyJWTAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all orders
router.route("/").get(verifyJWTAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get monthly income
router.route("/monthly-income").get(verifyJWTAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
