import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js"; // corrected import path
import CryptoJS from "crypto-js";
import { User } from "../models/user.model.js";

const router = Router();

// update password
router.put("/updatedetails/:id", verifyTokenAndAuthorization, async (req, res) => {
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

export default router;
