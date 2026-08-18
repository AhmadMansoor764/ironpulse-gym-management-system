import prisma from "../config/prisma.js";

export const createPayment = async (req, res) => {
  const { memberId, paymentMonth, amount } = req.body;

  try {
    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    const member = await prisma.member.findUnique({
      where: {
        id: Number(memberId),
      },
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const inputDate = new Date(paymentMonth);

    if (Number.isNaN(inputDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment month",
      });
    }

    const paymentDate = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      1,
    );

    if (Number.isNaN(paymentDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment month",
      });
    }

    const existingPayment = await prisma.payment.findUnique({
      where: {
        memberId_paymentMonth: {
          memberId: Number(memberId),
          paymentMonth: paymentDate,
        },
      },
    });

    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message: "Payment for this month already exists for this member",
      });
    }

    const payment = await prisma.payment.create({
      data: {
        memberId: Number(memberId),
        amount: numericAmount,
        paymentMonth: paymentDate,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      payment,
    });
  } catch (error) {
    console.error("Create payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getPaymentsByMember = async (req, res) => {
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

    const payments = await prisma.payment.findMany({
      where: {
        memberId: Number(id),
      },
      orderBy: {
        paymentMonth: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Get payments by member error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
