import prisma from "../config/prisma.js";
import { randomUUID } from "crypto";
import supabase from "../config/supabase.js";

// CREATE MEMBER

export const createMember = async (req, res) => {
  console.log("🔥 CREATE MEMBER CONTROLLER HIT");

  const {
    name,
    phone,
    email,
    monthlyFee,
    startDate,
    internalNotes,
    age,
    height,
    weight,
    diet,
    exerciseType,
  } = req.body;

  console.log("BACKEND req.body:", req.body);
  console.log("BACKEND req.file:", req.file);

  try {
    // ---------------------------------------------
    // 1. Required fields
    // ---------------------------------------------

    if (!name?.trim() || !phone?.trim() || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: "name, phone, and monthlyFee are required",
      });
    }

    // ---------------------------------------------
    // 2. Validate optional numeric fields
    // ---------------------------------------------

    if (age !== undefined && age !== null && age !== "") {
      const parsedAge = Number(age);

      if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return res.status(400).json({
          success: false,
          message: "Age must be a valid number between 1 and 120",
        });
      }
    }

    if (height !== undefined && height !== null && height !== "") {
      const parsedHeight = Number(height);

      if (!Number.isFinite(parsedHeight) || parsedHeight <= 0) {
        return res.status(400).json({
          success: false,
          message: "Height must be a valid positive number",
        });
      }
    }

    if (weight !== undefined && weight !== null && weight !== "") {
      const parsedWeight = Number(weight);

      if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
        return res.status(400).json({
          success: false,
          message: "Weight must be a valid positive number",
        });
      }
    }

    // ---------------------------------------------
    // 3. Create member first
    // ---------------------------------------------

    const member = await prisma.member.create({
      data: {
        name: name.trim(),

        phone: phone.trim(),

        email: email?.trim() || null,

        monthlyFee: Number(monthlyFee),

        startDate: startDate ? new Date(startDate) : new Date(),

        internalNotes: internalNotes?.trim() || null,

        // Member information
        age:
          age !== undefined && age !== null && age !== "" ? Number(age) : null,

        height:
          height !== undefined && height !== null && height !== ""
            ? Number(height)
            : null,

        weight:
          weight !== undefined && weight !== null && weight !== ""
            ? Number(weight)
            : null,

        diet: diet?.trim() || null,

        exerciseType: exerciseType?.trim() || null,

        // Image starts as null.
        // We will upload it immediately below.
        image: null,

        // Connect member to logged-in trainer
        trainer: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    console.log("CREATED MEMBER:", member);

    // ---------------------------------------------
    // 4. Upload image if one was selected
    // ---------------------------------------------

    // ---------------------------------------------
    // 4. Upload image if one was selected
    // ---------------------------------------------

    if (req.file) {
      console.log("📸 Member image detected. Uploading...");
      console.log("📁 File name:", req.file.originalname);
      console.log("📦 File size:", req.file.size);
      console.log("📝 MIME type:", req.file.mimetype);

      const extension =
        req.file.originalname.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `member-${member.id}-${randomUUID()}.${extension}`;

      console.log("📤 Uploading to bucket: gym-member-images");
      console.log("📄 File name:", fileName);

      const { error: uploadError } = await supabase.storage
        .from("gym-profile-image")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        console.error("❌ SUPABASE UPLOAD ERROR");
        console.error("Message:", uploadError.message);
        console.error("Name:", uploadError.name);
        console.error("Details:", uploadError);

        return res.status(500).json({
          success: false,
          message: "Supabase image upload failed",
          error: uploadError.message,
          details: uploadError,
        });
      }

      console.log("✅ Image uploaded successfully");

      const { data: publicUrlData } = supabase.storage
        .from("gym-profile-image")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      console.log("🌐 SUPABASE IMAGE URL:", imageUrl);

      const updatedMember = await prisma.member.update({
        where: {
          id: member.id,
        },
        data: {
          image: imageUrl,
        },
      });

      console.log("✅ MEMBER WITH IMAGE:", updatedMember);

      return res.status(201).json({
        success: true,
        message: "Member created successfully",
        member: updatedMember,
      });
    }
    // ---------------------------------------------
    // 7. No image selected
    // ---------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Member created successfully",
      member,
    });
  } catch (error) {
    console.error("Create member error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A member with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create member. Please try again.",
    });
  }
};

// GET ALL MEMBERS

export const getMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      where: {
        trainerId: req.user.id,
      },

      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      members,
    });
  } catch (error) {
    console.error("Get members error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// GET SINGLE MEMBER

export const getMember = async (req, res) => {
  const { id } = req.params;

  try {
    const memberId = Number(id);

    if (!Number.isInteger(memberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID",
      });
    }

    const member = await prisma.member.findFirst({
      where: {
        id: memberId,
        trainerId: req.user.id,
      },
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    console.log(member);

    return res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    console.error("Get member error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// =====================================================
// UPDATE MEMBER
// =====================================================

export const updateMember = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    phone,
    email,
    monthlyFee,
    startDate,
    internalNotes,
    age,
    height,
    weight,
    diet,
    exerciseType,
  } = req.body;

  try {
    // =====================================================
    // 1. VALIDATE MEMBER ID
    // =====================================================

    const memberId = Number(id);

    if (!Number.isInteger(memberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID",
      });
    }

    // =====================================================
    // 2. REQUIRED FIELDS
    // =====================================================

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone is required",
      });
    }

    if (monthlyFee === undefined || monthlyFee === null || monthlyFee === "") {
      return res.status(400).json({
        success: false,
        message: "Monthly fee is required",
      });
    }

    const parsedMonthlyFee = Number(monthlyFee);

    if (!Number.isFinite(parsedMonthlyFee) || parsedMonthlyFee < 0) {
      return res.status(400).json({
        success: false,
        message: "Monthly fee must be a valid number",
      });
    }

    // =====================================================
    // 3. VALIDATE AGE
    // =====================================================

    let parsedAge = null;

    if (age !== undefined && age !== null && age !== "") {
      parsedAge = Number(age);

      if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return res.status(400).json({
          success: false,
          message: "Age must be a valid number between 1 and 120",
        });
      }
    }

    // =====================================================
    // 4. VALIDATE HEIGHT
    // =====================================================

    let parsedHeight = null;

    if (height !== undefined && height !== null && height !== "") {
      parsedHeight = Number(height);

      if (!Number.isFinite(parsedHeight) || parsedHeight <= 0) {
        return res.status(400).json({
          success: false,
          message: "Height must be a valid positive number",
        });
      }
    }

    // =====================================================
    // 5. VALIDATE WEIGHT
    // =====================================================

    let parsedWeight = null;

    if (weight !== undefined && weight !== null && weight !== "") {
      parsedWeight = Number(weight);

      if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
        return res.status(400).json({
          success: false,
          message: "Weight must be a valid positive number",
        });
      }
    }

    // =====================================================
    // 6. FIND MEMBER
    // =====================================================

    const existingMember = await prisma.member.findFirst({
      where: {
        id: memberId,
        trainerId: req.user.id,
      },
    });

    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // =====================================================
    // 7. PREPARE IMAGE
    // =====================================================

    let imageUrl = existingMember.image;

    // =====================================================
    // 8. UPLOAD NEW IMAGE IF PROVIDED
    // =====================================================

    if (req.file) {
      console.log("📸 New member image detected");

      console.log("📁 File:", req.file.originalname);
      console.log("📦 Size:", req.file.size);
      console.log("📝 MIME:", req.file.mimetype);

      const extension =
        req.file.originalname.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `member-${memberId}-${randomUUID()}.${extension}`;

      console.log("📤 Uploading:", fileName);

      const { error: uploadError } = await supabase.storage
        .from("gym-profile-image")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        console.error("❌ SUPABASE UPLOAD ERROR:", uploadError);

        return res.status(500).json({
          success: false,
          message: "Supabase image upload failed",
          error: uploadError.message,
        });
      }

      console.log("✅ New image uploaded");

      const { data: publicUrlData } = supabase.storage
        .from("gym-profile-image")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;

      console.log("🌐 New image URL:", imageUrl);

      // =====================================================
      // DELETE OLD IMAGE
      // =====================================================

      if (existingMember.image) {
        try {
          const bucketName = "gym-profile-image";

          const oldImageUrl = existingMember.image;

          const marker = `${bucketName}/`;

          const markerIndex = oldImageUrl.indexOf(marker);

          if (markerIndex !== -1) {
            const oldFilePath = oldImageUrl.substring(
              markerIndex + marker.length,
            );

            console.log("🗑️ Old image path:", oldFilePath);

            const { error: deleteError } = await supabase.storage
              .from(bucketName)
              .remove([oldFilePath]);

            if (deleteError) {
              console.error(
                "⚠️ Could not delete old image:",
                deleteError.message,
              );
            } else {
              console.log("✅ Old image deleted");
            }
          }
        } catch (deleteError) {
          console.error("⚠️ Old image deletion error:", deleteError);
        }
      }
    }

    // =====================================================
    // 9. UPDATE MEMBER
    // =====================================================

    const updatedMember = await prisma.member.update({
      where: {
        id: memberId,
      },

      data: {
        name: name.trim(),

        phone: phone.trim(),

        email: email?.trim() || null,

        monthlyFee: parsedMonthlyFee,

        startDate: startDate ? new Date(startDate) : existingMember.startDate,

        internalNotes: internalNotes?.trim() || null,

        age: parsedAge,

        height: parsedHeight,

        weight: parsedWeight,

        diet: diet?.trim() || null,

        exerciseType: exerciseType?.trim() || null,

        image: imageUrl,
      },
    });

    // =====================================================
    // 10. RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("❌ Update member error:", error);

    // Prisma unique constraint
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A member with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update member. Please try again.",
    });
  }
};

// DELETE MEMBER

export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const memberId = Number(id);

    if (!Number.isInteger(memberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID",
      });
    }

    // Make sure the member belongs to the logged-in trainer
    const existingMember = await prisma.member.findFirst({
      where: {
        id: memberId,
        trainerId: req.user.id,
      },
    });

    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    await prisma.member.delete({
      where: {
        id: memberId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error("Delete member error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete member. Please try again.",
    });
  }
};

export const uploadMemberProfileImage = async (req, res) => {
  try {
    // 1. Check if image exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    // 2. Get member ID from URL
    const memberId = req.params.id;

    // 3. Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // 4. Get file extension
    const extension =
      req.file.originalname.split(".").pop()?.toLowerCase() || "jpg";

    // 5. Create unique filename
    const fileName = `member-${memberId}-${randomUUID()}.${extension}`;

    // 6. Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from("gym-profile-images")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);

      return res.status(500).json({
        success: false,
        message: "Failed to upload member image",
        error: uploadError.message,
      });
    }

    // 7. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("gym-profile-images")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // 8. Save URL in database
    const member = await prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        image: imageUrl,
      },
      select: {
        id: true,
        image: true,
      },
    });

    // 9. Send response
    return res.status(200).json({
      success: true,
      message: "Member profile image uploaded successfully",
      data: member,
    });
  } catch (error) {
    console.error("Member image upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while uploading member image",
      error: error.message,
    });
  }
};
