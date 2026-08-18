import prisma from "../config/prisma.js";

// =====================================================
// CREATE EXPENSE
// =====================================================

export const createExpense = async (req, res) => {
  const { description, category, amount, expenseDate } = req.body;

  try {
    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (!category?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    const date = expenseDate ? new Date(expenseDate) : new Date();

    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense date",
      });
    }

    const expense = await prisma.expense.create({
      data: {
        description: description.trim(),
        category: category.trim(),
        amount: numericAmount,
        expenseDate: date,
        trainerId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    console.error("Create expense error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// =====================================================
// GET ALL EXPENSES
// =====================================================

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        trainerId: req.user.id,
      },
      orderBy: {
        expenseDate: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error("Get expenses error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// =====================================================
// GET EXPENSE SUMMARY
// =====================================================

export const getExpenseSummary = async (req, res) => {
  const { year, month } = req.query;

  try {
    const selectedYear = Number(year);
    const selectedMonth = Number(month);

    if (!selectedYear || !selectedMonth) {
      return res.status(400).json({
        success: false,
        message: "Year and month are required",
      });
    }

    // JavaScript month is 0-11.
    // API month is 1-12.

    const startDate = new Date(selectedYear, selectedMonth - 1, 1);

    const endDate = new Date(selectedYear, selectedMonth, 1);

    // =================================================
    // EXPENSES
    // =================================================

    const expenses = await prisma.expense.findMany({
      where: {
        trainerId: req.user.id,

        expenseDate: {
          gte: startDate,
          lt: endDate,
        },
      },

      orderBy: {
        expenseDate: "desc",
      },
    });

    // =================================================
    // TOTAL EXPENSES
    // =================================================

    const expenseResult = await prisma.expense.aggregate({
      where: {
        trainerId: req.user.id,

        expenseDate: {
          gte: startDate,
          lt: endDate,
        },
      },

      _sum: {
        amount: true,
      },
    });

    const totalExpenses = Number(expenseResult._sum.amount || 0);

    // =================================================
    // MEMBER PAYMENTS / INCOME
    // =================================================

    const paymentResult = await prisma.payment.aggregate({
      where: {
        paymentMonth: {
          gte: startDate,
          lt: endDate,
        },

        member: {
          trainerId: req.user.id,
        },
      },

      _sum: {
        amount: true,
      },
    });

    const totalIncome = Number(paymentResult._sum.amount || 0);

    // =================================================
    // NET PROFIT
    // =================================================

    const netProfit = totalIncome - totalExpenses;

    return res.status(200).json({
      success: true,

      totalIncome,
      totalExpenses,
      netProfit,

      expenseCount: expenses.length,

      expenses,
    });
  } catch (error) {
    console.error("Get expense summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// =====================================================
// DELETE EXPENSE
// =====================================================

export const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);

  try {
    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }

    const expense = await prisma.expense.findFirst({
      where: {
        id,
        trainerId: req.user.id,
      },
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await prisma.expense.delete({
      where: {
        id: expense.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Delete expense error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateExpense = async (req, res) => {
  const id = Number(req.params.id);

  const { description, category, amount, expenseDate } = req.body;

  try {
    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (!category?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    const date = new Date(expenseDate);

    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense date",
      });
    }

    const existingExpense = await prisma.expense.findFirst({
      where: {
        id,
        trainerId: req.user.id,
      },
    });

    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const updatedExpense = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        description: description.trim(),
        category: category.trim(),
        amount: numericAmount,
        expenseDate: date,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error("Update expense error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
