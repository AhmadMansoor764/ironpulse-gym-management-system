import {
  createPayment,
  getPaymentsByMember,
} from "../controller/paymentcontroller.js";
import express from "express";

const router = express.Router();

router.post("/add", createPayment);
router.get("/member/:id", getPaymentsByMember);

export default router;
