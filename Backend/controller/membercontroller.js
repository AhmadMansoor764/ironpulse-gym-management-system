import prisma from "../config/prisma.js";

export const createMember = async (req, res) => {
  const { name, phone, email, monthlyFee, startDate, internalNotes } = req.body;

  try {
    if (!name || !phone || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: "name, phone, and monthlyFee are required",
      });
    }

    const member = await prisma.member.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        monthlyFee: Number(monthlyFee),
        startDate: startDate ? new Date(startDate) : new Date(),
        internalNotes: internalNotes?.trim() || null,

        // ⭐ Connect member to logged-in trainer
        trainer: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

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

export const getMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
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

export const getMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await prisma.member.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

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

export const updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, monthlyFee, startDate, internalNotes } = req.body;

  try {
    const memberId = Number(id);

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID",
      });
    }

    if (!name || !phone || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: "name, phone, and monthlyFee are required",
      });
    }

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

    const updatedMember = await prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        name,
        phone,
        email: email || null,
        monthlyFee: Number(monthlyFee),
        startDate: startDate ? new Date(startDate) : existingMember.startDate,
        internalNotes: internalNotes || null,
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

export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const memberId = Number(id);

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID",
      });
    }

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
