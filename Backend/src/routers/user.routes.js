import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js";
import CryptoJS from "crypto-js";
import { User } from "../models/user.model.js";
import { upload } from "../middleWares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    const { fullName, userName, mobileNo, email, password } = req.body;

    let avatarLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      avatarLocalPath = req.files.coverImage[0].path;
    }

    const avatar = await uploadOnCloudinary(
      avatarLocalPath,
      CLOUD_AVATAR_FOLDER_NAME
    );

    try {
      const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        mobileNo,
        email,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_SECRET
        ).toString(),
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

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

    const savedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const userPassword = savedPassword.toString(CryptoJS.enc.Utf8);
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
router.route("/").get(verifyTokenAndAdmin, async (req, res) => {
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
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
