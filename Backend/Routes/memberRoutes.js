import {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
} from "../controller/membercontroller.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, createMember);
router.get("/all", authMiddleware, getMembers);
router.get("/:id", authMiddleware, getMember);
router.put("/:id", authMiddleware, updateMember);
router.delete("/:id", authMiddleware, deleteMember);

export default router;
