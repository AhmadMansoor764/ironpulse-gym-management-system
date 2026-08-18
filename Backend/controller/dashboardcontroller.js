import prisma from "../config/prisma.js";

export const getDashboard = async (req, res) => {
  try {
    // Assuming your auth middleware provides the logged-in trainer
    const trainerId = Number(req.user.id);

    if (!trainerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const now = new Date();

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Start of current month
    const monthStart = new Date(currentYear, currentMonth, 1);

    // Start of next month
    const nextMonthStart = new Date(currentYear, currentMonth + 1, 1);

    // -------------------------------------------------------
    // TOTAL MEMBERS
    // -------------------------------------------------------

    const totalMembers = await prisma.member.count({
      where: {
        trainerId,
      },
    });

    // -------------------------------------------------------
    // ALL MEMBERS
    // -------------------------------------------------------

    const members = await prisma.member.findMany({
      where: {
        trainerId,
      },
      include: {
        payments: {
          orderBy: {
            paymentMonth: "desc",
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    // -------------------------------------------------------
    // CURRENT MONTH PAYMENTS
    // -------------------------------------------------------

    const currentMonthPayments = await prisma.payment.findMany({
      where: {
        member: {
          trainerId,
        },

        paymentMonth: {
          gte: monthStart,
          lt: nextMonthStart,
        },
      },

      include: {
        member: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    // -------------------------------------------------------
    // PAID / UNPAID
    // -------------------------------------------------------

    const paidMemberIds = new Set(
      currentMonthPayments.map((payment) => payment.memberId),
    );

    const paidThisMonth = paidMemberIds.size;

    const unpaid = Math.max(totalMembers - paidThisMonth, 0);

    // -------------------------------------------------------
    // MONTHLY REVENUE
    // -------------------------------------------------------

    const monthlyRevenue = currentMonthPayments.reduce(
      (total, payment) => total + Number(payment.amount),
      0,
    );

    // -------------------------------------------------------
    // OVERDUE / UNPAID MEMBERS
    // -------------------------------------------------------

    const actionableUnpaid = members
      .filter((member) => !paidMemberIds.has(member.id))
      .map((member) => {
        const startDate = new Date(member.startDate);

        const daysOverdue = Math.max(
          1,
          Math.floor(
            (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
          ),
        );

        return {
          id: member.id,
          initials: member.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),

          name: member.name,

          overdue: `${daysOverdue} days`,

          amount: Number(member.monthlyFee),
        };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // -------------------------------------------------------
    // RECENT PAYMENTS
    // -------------------------------------------------------

    const recentPayments = currentMonthPayments.slice(0, 5).map((payment) => ({
      id: payment.id,

      initials: payment.member.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),

      name: payment.member.name,

      plan: "Monthly Membership",

      amount: Number(payment.amount),

      paymentMonth: payment.paymentMonth,

      createdAt: payment.createdAt,
    }));

    // -------------------------------------------------------
    // REVENUE TREND
    // Last 6 months
    // -------------------------------------------------------

    const revenueTrend = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1);

      const year = date.getFullYear();
      const month = date.getMonth();

      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 1);

      const payments = await prisma.payment.findMany({
        where: {
          member: {
            trainerId,
          },

          paymentMonth: {
            gte: start,
            lt: end,
          },
        },
      });

      const revenue = payments.reduce(
        (total, payment) => total + Number(payment.amount),
        0,
      );

      revenueTrend.push({
        month: date.toLocaleString("en-US", {
          month: "short",
        }),

        year,

        revenue,
      });
    }

    // -------------------------------------------------------
    // TOTAL EXPENSES CURRENT MONTH
    // -------------------------------------------------------

    const currentMonthExpenses = await prisma.expense.findMany({
      where: {
        trainerId,

        expenseDate: {
          gte: monthStart,
          lt: nextMonthStart,
        },
      },
    });

    const monthlyExpenses = currentMonthExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );

    // -------------------------------------------------------
    // RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({
      success: true,

      stats: {
        totalMembers,
        paidThisMonth,
        unpaid,
        monthlyRevenue,
        monthlyExpenses,
        netProfit: monthlyRevenue - monthlyExpenses,
      },

      revenueTrend,

      actionableUnpaid,

      recentPayments,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard data",
    });
  }
};
