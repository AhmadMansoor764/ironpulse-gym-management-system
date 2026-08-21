import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import resend from "../config/resend.js";

export const register = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const userExist = await prisma.trainer.findUnique({
      where: {
        email: email,
      },
    });

    console.log(userExist);

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await prisma.trainer.create({
      data: {
        name,
        password: hashedpassword,
        email,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const user = await prisma.trainer.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "please register first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const getcurrentuser = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to logout",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await prisma.trainer.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    // Don't reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If this email is registered, a reset code has been sent.",
      });
    }

    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Code expires in 10 minutes
    const resetCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.trainer.update({
      where: {
        id: user.id,
      },
      data: {
        resetCode,
        resetCodeExpiry,
      },
    });

    const { data, error } = await resend.emails.send({
      from: "IronPulse <onboarding@resend.dev>",
      to: [user.email],
      subject: "IronPulse Password Reset Code",
      text: `Your IronPulse password reset code is ${resetCode}. This code expires in 10 minutes.`,
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 500px;
          margin: auto;
          padding: 30px;
          background: #111111;
          color: white;
          border-radius: 12px;
        ">
          <h1 style="color: #c6ff00;">
            IronPulse
          </h1>

          <p>
            You requested to reset your password.
          </p>

          <p>
            Your password reset code is:
          </p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #c6ff00;
            margin: 25px 0;
          ">
            ${resetCode}
          </div>

          <p>
            This code expires in <strong>10 minutes</strong>.
          </p>

          <p style="color: #999;">
            If you did not request this password reset,
            you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      throw new Error(error.message);
    }

    return res.status(200).json({
      success: true,
      message: "If this email is registered, a reset code has been sent.",
    });
  } catch (error) {
    console.error("========== FORGOT PASSWORD ERROR ==========");
    console.error(error);
    console.error("============================================");

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to process your request.",
    });
  }
};

export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({
      success: false,
      message: "Email and reset code are required",
    });
  }

  try {
    const user = await prisma.trainer.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!user || !user.resetCode || !user.resetCodeExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset code",
      });
    }

    if (new Date() > user.resetCodeExpiry) {
      return res.status(400).json({
        success: false,
        message: "Reset code has expired",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reset code verified successfully",
    });
  } catch (error) {
    console.error("VERIFY RESET CODE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify reset code",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, reset code and new password are required",
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  try {
    const user = await prisma.trainer.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!user || !user.resetCode || !user.resetCodeExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset code",
      });
    }

    if (new Date() > user.resetCodeExpiry) {
      return res.status(400).json({
        success: false,
        message: "Reset code has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.trainer.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,

        // Invalidate the reset code
        resetCode: null,
        resetCodeExpiry: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};
