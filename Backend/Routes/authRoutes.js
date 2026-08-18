import {
  register,
  login,
  getcurrentuser,
  logout,
} from "../Controller/authController.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getcurrentuser);
router.post("/logout", logout);

export default router;
