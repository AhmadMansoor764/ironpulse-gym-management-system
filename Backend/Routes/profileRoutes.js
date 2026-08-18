import express from "express";
import {
  updateProfile,
  getprofile,
  uploadProfileImage,
  changePassword,
} from "../Controller/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getprofile);
router.put("/profile", authMiddleware, updateProfile);
router.post(
  "/profile/image",
  authMiddleware,
  upload.single("image"),
  uploadProfileImage,
);
router.put("/profile/change-password", authMiddleware, changePassword);

export default router;
