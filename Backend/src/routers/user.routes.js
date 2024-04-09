import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js"; // corrected import path
import CryptoJS from "crypto-js";
import { User } from "../models/user.model.js";

const router = Router();

// update details
router
  .route("/updatedetails/:id")
  .put(verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      const newPassword = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString();
      req.body.password = newPassword;
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// delete
router
  .route("/delete-profile/:id")
  .delete(verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });

// get user profile
router.route("/your-profile/:id").get(verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all user profile
router.route("/all-profile").get(verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get user stats
router.route("/stats").get(verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum },
        },
      },
    ]);
    res.sendStatus(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
