import prisma from "../config/prisma.js";

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
    image,
  } = req.body;

  console.log("BACKEND req.body:", req.body);

  console.log("BACKEND extracted values:", {
    age,
    height,
    weight,
    diet,
    exerciseType,
    internalNotes,
  });

  try {
    // Required fields
    if (!name?.trim() || !phone?.trim() || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: "name, phone, and monthlyFee are required",
      });
    }

    // Validate optional numeric fields
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
    console.log("CREATE MEMBER BODY:", req.body);

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

        image: image?.trim() || null,

        // Connect member to logged-in trainer
        trainer: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    console.log("CREATED MEMBER:", member);

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

// UPDATE MEMBER

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
    image,
  } = req.body;

  try {
    const memberId = Number(id);

    if (!Number.isInteger(memberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID",
      });
    }

    // Required fields
    if (!name?.trim() || !phone?.trim() || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: "name, phone, and monthlyFee are required",
      });
    }

    // Validate optional numeric fields
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

    const updatedMember = await prisma.member.update({
      where: {
        id: memberId,
      },

      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        monthlyFee: Number(monthlyFee),

        startDate: startDate ? new Date(startDate) : existingMember.startDate,

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

        image: image?.trim() || null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("Update member error:", error);

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
