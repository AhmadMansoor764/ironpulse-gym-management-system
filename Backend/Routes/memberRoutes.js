import {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
  uploadMemberProfileImage,
} from "../controller/membercontroller.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, upload.single("image"), createMember);
router.get("/all", authMiddleware, getMembers);
router.post(
  "/:id/image",
  authMiddleware,
  upload.single("image"),
  uploadMemberProfileImage,
);

router.get("/:id", authMiddleware, getMember);
router.put("/:id", authMiddleware, updateMember);
router.delete("/:id", authMiddleware, deleteMember);

export default router;
