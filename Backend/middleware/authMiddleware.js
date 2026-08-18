import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.trainer.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "the user is already deleted or does not exist",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "something went wrong from middleware",
    });
  }
};
