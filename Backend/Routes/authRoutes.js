import {
  register,
  login,
  getcurrentuser,
  logout,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "../controller/authcontroller.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getcurrentuser);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);

export default router;
