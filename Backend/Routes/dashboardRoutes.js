import express from "express";
import { getDashboard } from "../controller/dashboardcontroller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboard);

export default router;
