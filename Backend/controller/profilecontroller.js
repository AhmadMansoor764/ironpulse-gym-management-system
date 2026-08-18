import crypto from "crypto";
import prisma from "../config/prisma.js";
import supabase from "../config/supabase.js";
import bcrypt from "bcryptjs";

export const getprofile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await prisma.trainer.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        about: true,
        gymName: true,
        gymAddress: true,
        image: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong from profile page",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { email, name, phone, about, gymName, gymAddress, image } = req.body;

    if (!email || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await prisma.trainer.update({
      where: {
        id: req.user.id,
      },
      data: {
        email: email,
        name: name,
        phone: phone,
        about: about,
        gymName: gymName,
        gymAddress: gymAddress,
        image: image,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong from profile page",
    });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    // Check whether an image was actually uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const trainerId = req.user.id;

    // Get the file extension
    const extension = req.file.originalname.split(".").pop();

    // Create a unique filename
    const fileName = `trainer-${trainerId}-${crypto.randomUUID()}.${extension}`;

    const filePath = `gym-profile-image/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("gym-profile-image")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);

      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("gym-profile-image")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    // Save image URL in database
    const trainer = await prisma.trainer.update({
      where: {
        id: trainerId,
      },
      data: {
        image: imageUrl,
      },
      select: {
        id: true,
        image: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      data: trainer,
    });
  } catch (error) {
    console.error("Profile image upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while uploading profile image",
    });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  const id = req.user.id;

  try {
    const userExist = await prisma.trainer.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, userExist.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "پسورد قبلی شما صحیح نیست",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.trainer.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      success: true,
      message: "پسورد شما با موفقیت تغییر کرد",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong from profile page",
    });
  }
};
