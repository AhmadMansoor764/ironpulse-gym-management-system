import express from "express";

import {
  createExpense,
  getAllExpenses,
  getExpenseSummary,
  deleteExpense,
  updateExpense,
} from "../controller/expensecontroller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, createExpense);

router.get("/all", authMiddleware, getAllExpenses);

router.get("/summary", authMiddleware, getExpenseSummary);

router.put("/:id", authMiddleware, updateExpense);

router.delete("/:id", authMiddleware, deleteExpense);

export default router;
