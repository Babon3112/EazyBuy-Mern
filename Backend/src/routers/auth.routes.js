import { Router } from "express";
import { User } from "../models/user.model.js";
import Cryptojs from "crypto-js";
import jwt from "jsonwebtoken";

const router = Router();

//Register

router.route("/register").post(async (req, res) => {
  const { fullName, userName, mobileNo, email, password } = req.body;
  try {
    const user = await User.create({
      userName: userName.toLowerCase(),
      fullName,
      mobileNo,
      email,
      password: Cryptojs.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET
      ).toString(),
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route("/login").post(async (req, res) => {
  const { email, mobileNo, password } = req.body;
  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (mobileNo) {
      user = await User.findOne({ mobileNo });
    }
    if (!user) res.status(401).json("user not found");

    const savedPassword = Cryptojs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const userPassword = savedPassword.toString(Cryptojs.enc.Utf8);
    if (password != userPassword) res.status(401).json("wrong password");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const loggedinUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    res.status(200).json({ loggedinUser, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
