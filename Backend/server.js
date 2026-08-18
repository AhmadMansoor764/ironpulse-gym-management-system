import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";
import memberRoutes from "./Routes/memberRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//middlewares i do have them for gym system
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// all the routes i have

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "IronPulse API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/user", profileRoutes);

app.use("/api/member", memberRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/expense", expenseRoutes);

app.use("/api/dashboard", dashboardRoutes);

//start the server now
app.listen(PORT, () => {
  console.log(`🚀 IronPulse server is running on port ${PORT}`);
});
