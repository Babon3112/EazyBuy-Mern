import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const createOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);

  const saveOrder = await newOrder.save();
  if (!saveOrder) {
    throw new ApiError(500, "Something went wrong while creating order");
  }

  res
    .status(200)
    .json(new ApiResponse(200, saveOrder, "Order created successfully"));
});

export const updateOrder = asyncHandler(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating order");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedOrder, "Order updated successfully"));
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const deluccess = await Order.findByIdAndDelete(req.params.id);
  if (!deluccess) {
    throw new ApiError(500, "Something went wrong while deleting order");
  }

  res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  if (!orders) {
    throw new ApiError(500, "Something went wrong while fetching user orders");
  }

  res
    .status(200)
    .json(new ApiResponse(200, orders, "User orders fetched successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    throw new ApiError(500, "Something went wrong while fetching orders");
  }

  res
    .status(200)
    .json(new ApiResponse(200, orders, "All orders fetched successfully"));
});

export const getMonthlyIncome = asyncHandler(async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

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
  if (!income) {
    throw new ApiError(500, "Something went wrong while generating the income");
  }

  res
    .status(200)
    .json(new ApiResponse(200, income, "income generated successfully"));
});
