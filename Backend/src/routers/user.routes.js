import { Router } from "express";
import { upload } from "../middleWares/multer.middleware.js";
import {
  getStats,
  loginUser,
  logoutUser,
  deleteUser,
  getAllUser,
  registerUser,
  getUserDetails,
  getUserForAdmin,
  updateUserDetails,
  changeUserPassword,
} from "../controllers/user.controller.js";
import {
  verifyJWTAndAdmin,
  verifyJWTAndAuthorization,
} from "../middleWares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/update-details").patch(
  verifyJWTAndAuthorization,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  updateUserDetails
);
router
  .route("/change-password")
  .post(verifyJWTAndAuthorization, changeUserPassword);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWTAndAuthorization, logoutUser);
router.route("/your-profile").get(verifyJWTAndAuthorization, getUserDetails);
router.route("/delete-account").delete(verifyJWTAndAuthorization, deleteUser);
router.route("/").get(verifyJWTAndAdmin, getAllUser);
router.route("/stats").get(verifyJWTAndAdmin, getStats);
router.route("/:userId").get(verifyJWTAndAdmin, getUserForAdmin);

export default router;
