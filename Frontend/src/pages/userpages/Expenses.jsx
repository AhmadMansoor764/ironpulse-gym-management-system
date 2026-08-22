import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiTool,
  FiHome,
  FiMonitor,
  FiWifi,
  FiMoreHorizontal,
  FiChevronDown,
  FiPlus,
  FiDollarSign,
  FiArrowDownRight,
  FiArrowUpRight,
  FiX,
  FiCheck,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import { useLanguage } from "../context/LanguageContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const categories = [
  {
    name: "Equipment",
    icon: FiTool,
  },
  {
    name: "Facility",
    icon: FiHome,
  },
  {
    name: "Marketing",
    icon: FiArrowUpRight,
  },
  {
    name: "Software",
    icon: FiMonitor,
  },
  {
    name: "Utilities",
    icon: FiWifi,
  },
  {
    name: "Other",
    icon: FiMoreHorizontal,
  },
];

function Expenses() {
  const { t } = useLanguage();

  const expensesT = t.expensesPage;

  const chartColors = [
    "#caff00",
    "#ffaaa3",
    "#91b0ed",
    "#3b3b3b",
    "#d9a441",
    "#a78bfa",
  ];

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const [editingExpense, setEditingExpense] = useState(null);

  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    expenses: [],
  });

  const [form, setForm] = useState({
    description: "",
    category: "Facility",
    amount: "",
    expenseDate: new Date().toLocaleDateString("en-CA"),
  });

  /* =====================================================
     API
  ===================================================== */

  const fetchFinancialData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expense/summary?year=${selectedYear}&month=${selectedMonth + 1}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || expensesT.loadError);
      }

      setFinancialData({
        totalIncome: Number(data.totalIncome || 0),
        totalExpenses: Number(data.totalExpenses || 0),
        expenses: data.expenses || [],
      });
    } catch (error) {
      console.error("Failed to load expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, [selectedMonth, selectedYear]);

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const netProfit = financialData.totalIncome - financialData.totalExpenses;

  const expenseCount = financialData.expenses.length;

  /* =====================================================
     FORMAT MONEY
  ===================================================== */

  const formatMoney = (amount) => {
    return Math.trunc(Number(amount) || 0).toLocaleString("en-US");
  };

  /* =====================================================
     CATEGORY DATA
  ===================================================== */

  const categoryData = useMemo(() => {
    const totals = {};

    financialData.expenses.forEach((expense) => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0;
      }

      totals[expense.category] += Number(expense.amount);
    });

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);

    return Object.entries(totals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total ? (amount / total) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [financialData.expenses]);

  const chartGradient = useMemo(() => {
    if (!categoryData.length) {
      return "#303030";
    }

    let currentPercentage = 0;

    const segments = categoryData
      .map((item, index) => {
        const start = currentPercentage;

        currentPercentage += item.percentage;

        const color = chartColors[index % chartColors.length];

        return `${color} ${start}% ${currentPercentage}%`;
      })
      .join(", ");

    return `conic-gradient(${segments})`;
  }, [categoryData]);

  /* =====================================================
     ADD EXPENSE
  ===================================================== */

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (
      !form.description.trim() ||
      !form.amount ||
      Number(form.amount) <= 0 ||
      !form.expenseDate
    ) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expense/add`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            description: form.description,
            category: form.category,
            amount: Number(form.amount),
            expenseDate: form.expenseDate,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || expensesT.addExpenseError);
      }

      setShowExpenseModal(false);

      setForm({
        description: "",
        category: "Facility",
        amount: "",
        expenseDate: new Date().toLocaleDateString("en-CA"),
      });

      await fetchFinancialData();
    } catch (error) {
      console.error("Add expense error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     EDIT EXPENSE
  ===================================================== */

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);

    setForm({
      description: expense.description,
      category: expense.category,
      amount: String(expense.amount),
      expenseDate: new Date(expense.expenseDate).toLocaleDateString("en-CA"),
    });

    setShowExpenseModal(true);
  };

  /* =====================================================
     UPDATE EXPENSE
  ===================================================== */

  const handleUpdateExpense = async (e) => {
    e.preventDefault();

    if (
      !form.description.trim() ||
      !form.amount ||
      Number(form.amount) <= 0 ||
      !form.expenseDate
    ) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expense/${editingExpense.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            description: form.description,
            category: form.category,
            amount: Number(form.amount),
            expenseDate: form.expenseDate,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || expensesT.addExpenseError);
      }

      setShowExpenseModal(false);

      setEditingExpense(null);

      setForm({
        description: "",
        category: "Facility",
        amount: "",
        expenseDate: new Date().toLocaleDateString("en-CA"),
      });

      await fetchFinancialData();
    } catch (error) {
      console.error("Update expense error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     DELETE EXPENSE
  ===================================================== */

  const handleDeleteExpense = async (expenseId) => {
    const confirmed = window.confirm(expensesT.deleteExpenseConfirm);

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expense/${expenseId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || expensesT.deleteExpenseError);
      }

      await fetchFinancialData();
    } catch (error) {
      console.error("Delete expense error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     MONTH
  ===================================================== */

  const selectMonth = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setShowMonthPicker(false);
  };

  /* =====================================================
     CATEGORY ICON
  ===================================================== */

  const getCategoryIcon = (category) => {
    const found = categories.find((item) => item.name === category);

    return found?.icon || FiMoreHorizontal;
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-[#111111] pb-[100px] text-[#f3f3f3]">
      <div className="mx-auto max-w-[1100px] px-5 pb-10 pt-7 sm:px-7 lg:px-10 lg:pt-10">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[32px] font-bold tracking-[-1px] sm:text-[36px]"
            >
              {expensesT.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-[16px] text-[#c9c9b1] sm:text-[18px]"
            >
              {expensesT.subtitle}
            </motion.p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* MONTH PICKER */}

            <div className="relative">
              <button
                onClick={() => setShowMonthPicker(!showMonthPicker)}
                className="flex h-[46px] w-full items-center justify-between gap-5 rounded-xl bg-[#292929] px-5 text-[15px] font-semibold text-[#e3e3dd] transition hover:bg-[#323232] sm:w-[220px]"
              >
                <span>
                  {months[selectedMonth]} {selectedYear}
                </span>

                <FiChevronDown
                  className={`transition ${
                    showMonthPicker ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showMonthPicker && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    className="absolute right-0 top-[55px] z-50 w-[260px] overflow-hidden rounded-xl border border-[#363636] bg-[#202020] p-3 shadow-2xl"
                  >
                    <div className="mb-3 flex items-center justify-between px-2">
                      <button
                        onClick={() => setSelectedYear(selectedYear - 1)}
                        className="rounded-lg px-3 py-2 text-[#caff00] hover:bg-[#303030]"
                      >
                        ←
                      </button>

                      <span className="font-bold">{selectedYear}</span>

                      <button
                        onClick={() => setSelectedYear(selectedYear + 1)}
                        className="rounded-lg px-3 py-2 text-[#caff00] hover:bg-[#303030]"
                      >
                        →
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      {months.map((month, index) => (
                        <button
                          key={month}
                          onClick={() => selectMonth(index)}
                          className={`rounded-lg px-2 py-2 text-[12px] transition ${
                            selectedMonth === index
                              ? "bg-[#caff00] font-bold text-[#111]"
                              : "text-[#c7c7b8] hover:bg-[#303030]"
                          }`}
                        >
                          {month.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ADD EXPENSE */}

            <button
              onClick={() => {
                setEditingExpense(null);

                setForm({
                  description: "",
                  category: "Facility",
                  amount: "",
                  expenseDate: new Date().toLocaleDateString("en-CA"),
                });

                setShowExpenseModal(true);
              }}
              className="flex h-[46px] items-center justify-center gap-2 rounded-xl bg-[#caff00] px-6 text-[15px] font-bold text-[#111] transition hover:bg-[#d7ff36] active:scale-[0.98]"
            >
              <FiPlus size={20} />

              {expensesT.addExpense}
            </button>
          </div>
        </div>

        {/* =================================================
            FINANCIAL CARDS
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FinancialCard
            title={expensesT.totalIncome}
            value={formatMoney(financialData.totalIncome)}
            subtitle={expensesT.actualMemberPayments}
            icon={<FiDollarSign size={27} />}
            type="income"
          />

          <FinancialCard
            title={expensesT.totalExpenses}
            value={formatMoney(financialData.totalExpenses)}
            subtitle={`${expenseCount} ${expensesT.expenses}`}
            icon={<FiArrowDownRight size={27} />}
            type="expense"
          />

          <FinancialCard
            title={expensesT.netProfit}
            value={formatMoney(netProfit)}
            subtitle={expensesT.netProfitCalculation}
            icon={
              netProfit >= 0 ? (
                <FiArrowUpRight size={27} />
              ) : (
                <FiArrowDownRight size={27} />
              )
            }
            type={netProfit >= 0 ? "profit" : "loss"}
          />
        </div>

        {/* =================================================
            BREAKDOWN + SUMMARY
        ================================================= */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
          {/* BREAKDOWN */}

          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[18px] border border-[#303030] bg-[#1d1d1d] p-6"
          >
            <h2 className="text-[21px] font-bold">{expensesT.otherExpenses}</h2>

            <p className="mt-1 text-[14px] text-[#9e9e92]">
              {months[selectedMonth]} {selectedYear}
            </p>

            <div className="mt-7 flex items-center gap-7">
              <div
                className="relative h-[145px] w-[145px] shrink-0 rounded-full"
                style={{
                  background: chartGradient,
                }}
              >
                <div className="absolute inset-[28px] flex items-center justify-center rounded-full bg-[#1d1d1d]">
                  <span className="text-[17px] font-bold">
                    {months[selectedMonth].slice(0, 3)}
                  </span>
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-4">
                {categoryData.map((item, index) => {
                  const color = chartColors[index % chartColors.length];

                  return (
                    <div key={item.category} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor: color,
                        }}
                      />

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-[#e1e1dc]">
                          {item.category}
                        </p>

                        <p className="text-[12px] text-[#929289]">
                          {formatMoney(item.amount)} (
                          {item.percentage.toFixed(0)}
                          %)
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* SUMMARY */}

          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[18px] border border-[#303030] bg-[#1d1d1d] p-6"
          >
            <h2 className="text-[21px] font-bold">
              {expensesT.financialOverview}
            </h2>

            <p className="mt-1 text-[14px] text-[#9e9e92]">
              {months[selectedMonth]} {selectedYear}
            </p>

            <div className="mt-7 space-y-5">
              <SummaryRow
                label={expensesT.memberPayments}
                value={formatMoney(financialData.totalIncome)}
                positive
              />

              <SummaryRow
                label={expensesT.otherExpenses}
                value={formatMoney(financialData.totalExpenses)}
                negative
              />

              <div className="border-t border-[#353535] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-semibold text-[#c7c7ba]">
                    {expensesT.netProfit}
                  </span>

                  <span
                    className={`text-[24px] font-bold ${
                      netProfit >= 0 ? "text-[#caff00]" : "text-[#ff9b91]"
                    }`}
                  >
                    {formatMoney(netProfit)}
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* =================================================
            RECENT EXPENSES
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-5 overflow-hidden rounded-[18px] border border-[#303030] bg-[#1d1d1d]"
        >
          <div className="flex flex-col gap-3 border-b border-[#2c2c2c] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[21px] font-bold">
                {expensesT.recentExpenses}
              </h2>

              <p className="mt-1 text-[13px] text-[#929289]">
                {expensesT.otherExpensesDescription}
              </p>
            </div>

            <span className="text-[14px] font-semibold text-[#caff00]">
              {expenseCount} {expensesT.total}
            </span>
          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-[#202020] text-left text-[13px] uppercase tracking-[1px] text-[#c6c6b4]">
                  <th className="px-6 py-4">{expensesT.expenseDate}</th>

                  <th className="px-6 py-4">{expensesT.expenseName}</th>

                  <th className="px-6 py-4">{expensesT.expenses}</th>

                  <th className="px-6 py-4 text-right">
                    {expensesT.expenseAmount}
                  </th>

                  <th className="px-6 py-4 text-right">
                    {expensesT.editExpense}
                  </th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {financialData.expenses.map((expense) => {
                    const CategoryIcon = getCategoryIcon(expense.category);

                    return (
                      <motion.tr
                        layout
                        key={expense.id}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: 20,
                        }}
                        className="border-t border-[#292929] transition hover:bg-[#222222]"
                      >
                        <td className="whitespace-nowrap px-6 py-5 text-[14px] text-[#d4d4cd]">
                          {new Date(expense.expenseDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </td>

                        <td className="px-6 py-5 text-[15px] font-medium">
                          {expense.description}
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#292929] px-3 py-1.5 text-[13px] text-[#deded7]">
                            <CategoryIcon
                              size={14}
                              className="text-[#caff00]"
                            />

                            {expense.category}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right text-[15px] font-semibold">
                          {formatMoney(expense.amount)}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditExpense(expense)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#292929] text-[#caff00] transition hover:bg-[#343434]"
                              title={expensesT.editExpense}
                            >
                              <FiEdit2 size={15} />
                            </button>

                            <button
                              onClick={() => handleDeleteExpense(expense.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#292929] text-[#ff9b91] transition hover:bg-[#343434]"
                              title={expensesT.deleteExpense}
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* MOBILE */}

          <div className="divide-y divide-[#292929] md:hidden">
            {financialData.expenses.map((expense) => {
              const CategoryIcon = getCategoryIcon(expense.category);

              return (
                <motion.div
                  layout
                  key={expense.id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-semibold">
                        {expense.description}
                      </h3>

                      <p className="mt-1 text-[12px] text-[#8f8f86]">
                        {new Date(expense.expenseDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    <p className="shrink-0 text-[16px] font-bold">
                      {formatMoney(expense.amount)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#292929] px-3 py-1.5 text-[12px] text-[#d5d5cc]">
                      <CategoryIcon size={13} className="text-[#caff00]" />

                      {expense.category}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#343434] bg-[#292929] py-3 text-[13px] font-semibold text-[#caff00] transition hover:bg-[#343434]"
                    >
                      <FiEdit2 size={15} />

                      {expensesT.editExpense}
                    </button>

                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#343434] bg-[#292929] py-3 text-[13px] font-semibold text-[#ff9b91] transition hover:bg-[#343434]"
                    >
                      <FiTrash2 size={15} />

                      {expensesT.deleteExpense}
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {financialData.expenses.length === 0 && (
              <div className="px-5 py-12 text-center">
                <FiFileText size={35} className="mx-auto text-[#555]" />

                <p className="mt-3 text-[15px] text-[#888]">
                  {expensesT.noExpenses}
                </p>
              </div>
            )}
          </div>
        </motion.section>
      </div>

      {/* =================================================
          ADD / EDIT EXPENSE MODAL
      ================================================= */}

      <AnimatePresence>
        {showExpenseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowExpenseModal(false)}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 px-0 pb-[110px] pt-5 backdrop-blur-sm sm:items-center sm:p-5"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.97,
              }}
              onClick={(e) => e.stopPropagation()}
              className="my-auto flex max-h-[calc(100dvh-130px)] w-full max-w-[550px] flex-col overflow-hidden rounded-[24px] border border-[#333] bg-[#1d1d1d] shadow-2xl sm:max-h-[calc(100dvh-40px)] sm:rounded-[22px]"
            >
              {/* MODAL HEADER */}

              <div className="flex shrink-0 items-center justify-between border-b border-[#2c2c2c] px-6 py-5 sm:px-8 sm:py-6">
                <div>
                  <h2 className="text-[25px] font-bold">
                    {editingExpense
                      ? expensesT.editExpense
                      : expensesT.addNewExpense}
                  </h2>

                  <p className="mt-1 text-[14px] text-[#999990]">
                    {editingExpense
                      ? expensesT.expenseDescription
                      : expensesT.otherExpensesDescription}
                  </p>
                </div>

                <button
                  onClick={() => setShowExpenseModal(false)}
                  className="shrink-0 rounded-full p-2 text-[#aaa] transition hover:bg-[#303030] hover:text-white"
                >
                  <FiX size={22} />
                </button>
              </div>

              {/* SCROLLABLE CONTENT */}

              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
                <form
                  onSubmit={
                    editingExpense ? handleUpdateExpense : handleAddExpense
                  }
                  className="space-y-5"
                >
                  {/* EXPENSE NAME */}

                  <div>
                    <label className="mb-2 block text-[13px] font-bold uppercase tracking-[1px] text-[#c6c6b7]">
                      {expensesT.expenseName}
                    </label>

                    <input
                      type="text"
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description: e.target.value,
                        })
                      }
                      placeholder={expensesT.expenseNamePlaceholder}
                      className="h-[52px] w-full rounded-xl border border-[#343434] bg-[#292929] px-4 text-[15px] outline-none placeholder:text-[#777] focus:border-[#caff00]"
                    />
                  </div>

                  {/* CATEGORY */}

                  <div>
                    <label className="mb-2 block text-[13px] font-bold uppercase tracking-[1px] text-[#c6c6b7]">
                      {expensesT.expenses}
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {categories.map((category) => {
                        const Icon = category.icon;

                        const active = form.category === category.name;

                        return (
                          <button
                            type="button"
                            key={category.name}
                            onClick={() =>
                              setForm({
                                ...form,
                                category: category.name,
                              })
                            }
                            className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-[13px] transition ${
                              active
                                ? "border-[#caff00] bg-[#272d12] text-[#caff00]"
                                : "border-[#343434] bg-[#292929] text-[#bdbdb2] hover:border-[#555]"
                            }`}
                          >
                            <Icon size={17} />

                            {category.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* AMOUNT */}

                  <div>
                    <label className="mb-2 block text-[13px] font-bold uppercase tracking-[1px] text-[#c6c6b7]">
                      {expensesT.expenseAmount}
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-bold text-[#caff00]">
                        {expensesT.currency}
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.amount}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            amount: e.target.value,
                          })
                        }
                        placeholder={expensesT.expenseAmountPlaceholder}
                        className="h-[52px] w-full rounded-xl border border-[#343434] bg-[#292929] pl-10 pr-4 text-[17px] font-semibold outline-none placeholder:text-[#777] focus:border-[#caff00]"
                      />
                    </div>
                  </div>

                  {/* DATE */}

                  <div>
                    <label className="mb-2 block text-[13px] font-bold uppercase tracking-[1px] text-[#c6c6b7]">
                      {expensesT.expenseDate}
                    </label>

                    <input
                      type="date"
                      value={form.expenseDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          expenseDate: e.target.value,
                        })
                      }
                      className="h-[52px] w-full rounded-xl border border-[#343434] bg-[#292929] px-4 text-[15px] outline-none focus:border-[#caff00]"
                    />
                  </div>

                  {/* DESCRIPTION */}

                  <div>
                    <label className="mb-2 block text-[13px] font-bold uppercase tracking-[1px] text-[#c6c6b7]">
                      {expensesT.expenseDescription}
                    </label>

                    <textarea
                      placeholder={expensesT.expenseDescriptionPlaceholder}
                      className="min-h-[100px] w-full resize-none rounded-xl border border-[#343434] bg-[#292929] px-4 py-3 text-[15px] outline-none placeholder:text-[#777] focus:border-[#caff00]"
                    />
                  </div>

                  {/* BUTTONS */}

                  <div className="flex gap-3 pb-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowExpenseModal(false);

                        setEditingExpense(null);
                      }}
                      className="h-[54px] flex-1 rounded-xl border border-[#383838] text-[15px] font-bold transition hover:bg-[#292929]"
                    >
                      {expensesT.cancel}
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex h-[54px] flex-[1.4] items-center justify-center gap-2 rounded-xl bg-[#caff00] text-[15px] font-bold text-[#111] transition hover:bg-[#d8ff38] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FiCheck size={19} />

                      {loading
                        ? expensesT.savingExpense
                        : expensesT.saveExpense}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   FINANCIAL CARD
========================================================= */

function FinancialCard({ title, value, subtitle, icon, type }) {
  const isIncome = type === "income";
  const isExpense = type === "expense";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -3,
      }}
      className="relative overflow-hidden rounded-[18px] border border-[#303030] bg-[#1d1d1d] p-6"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#caff00]/5 blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[13px] font-semibold tracking-[1px] text-[#c5c5b3]">
            {title}
          </p>

          <p
            className={`mt-3 text-[32px] font-bold tracking-[-1.5px] sm:text-[36px] ${
              type === "profit"
                ? "text-[#caff00]"
                : type === "loss"
                  ? "text-[#ff9b91]"
                  : ""
            }`}
          >
            {value}
          </p>

          <p className="mt-2 text-[13px] text-[#999990]">{subtitle}</p>
        </div>

        <div
          className={`flex h-[50px] w-[50px] items-center justify-center rounded-xl ${
            isIncome
              ? "bg-[#caff00]/10 text-[#caff00]"
              : isExpense
                ? "bg-[#ffaaa3]/10 text-[#ffaaa3]"
                : "bg-[#caff00]/10 text-[#caff00]"
          }`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({ label, value, positive, negative }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            positive
              ? "bg-[#caff00]/10 text-[#caff00]"
              : negative
                ? "bg-[#ffaaa3]/10 text-[#ffaaa3]"
                : "bg-[#292929]"
          }`}
        >
          {positive ? (
            <FiArrowUpRight size={16} />
          ) : (
            <FiArrowDownRight size={16} />
          )}
        </div>

        <span className="text-[14px] text-[#bdbdb3]">{label}</span>
      </div>

      <span className="text-[15px] font-semibold">{value}</span>
    </div>
  );
}

export default Expenses;
