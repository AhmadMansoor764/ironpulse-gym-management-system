import { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaArrowUp,
} from "react-icons/fa";

const Dashboard = () => {
  const [period, setPeriod] = useState("Last 6 Months");

  const [dashboard, setDashboard] = useState({
    stats: {
      totalMembers: 0,
      paidThisMonth: 0,
      unpaid: 0,
      monthlyRevenue: 0,
      monthlyExpenses: 0,
      netProfit: 0,
    },

    revenueTrend: [],

    actionableUnpaid: [],

    recentPayments: [],
  });

  const [loading, setLoading] = useState(true);

  const [animatedMembers, setAnimatedMembers] = useState(0);
  const [animatedPaid, setAnimatedPaid] = useState(0);
  const [animatedUnpaid, setAnimatedUnpaid] = useState(0);

  // =========================================================
  // FETCH DASHBOARD
  // =========================================================

  useEffect(() => {
    const getDashboard = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/dashboard`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load dashboard");
        }

        setDashboard({
          stats: {
            totalMembers: Number(data.stats?.totalMembers || 0),
            paidThisMonth: Number(data.stats?.paidThisMonth || 0),
            unpaid: Number(data.stats?.unpaid || 0),
            monthlyRevenue: Number(data.stats?.monthlyRevenue || 0),
            monthlyExpenses: Number(data.stats?.monthlyExpenses || 0),
            netProfit: Number(data.stats?.netProfit || 0),
          },

          revenueTrend: data.revenueTrend || [],

          actionableUnpaid: data.actionableUnpaid || [],

          recentPayments: data.recentPayments || [],
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);

  // =========================================================
  // DATA
  // =========================================================

  const stats = dashboard.stats;

  const overdueMembers = dashboard.actionableUnpaid;

  const recentPayments = dashboard.recentPayments;

  // =========================================================
  // ANIMATED COUNTERS
  // =========================================================

  useEffect(() => {
    if (loading) return;

    let members = 0;
    let paid = 0;
    let unpaid = 0;

    const interval = setInterval(() => {
      members += Math.max(1, Math.ceil(stats.totalMembers / 30));

      paid += Math.max(1, Math.ceil(stats.paidThisMonth / 30));

      unpaid += Math.max(1, Math.ceil(stats.unpaid / 30));

      if (members >= stats.totalMembers) {
        members = stats.totalMembers;
      }

      if (paid >= stats.paidThisMonth) {
        paid = stats.paidThisMonth;
      }

      if (unpaid >= stats.unpaid) {
        unpaid = stats.unpaid;
      }

      setAnimatedMembers(members);
      setAnimatedPaid(paid);
      setAnimatedUnpaid(unpaid);

      if (
        members === stats.totalMembers &&
        paid === stats.paidThisMonth &&
        unpaid === stats.unpaid
      ) {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [loading, stats.totalMembers, stats.paidThisMonth, stats.unpaid]);

  // =========================================================
  // PAYMENT PERCENTAGE
  // =========================================================

  const paymentPercentage =
    stats.totalMembers > 0
      ? (stats.paidThisMonth / stats.totalMembers) * 100
      : 0;

  // =========================================================
  // FORMAT MONEY
  // =========================================================

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  // =========================================================
  // REVENUE CHART
  // =========================================================

  const chartData = useMemo(() => {
    if (period === "This Month") {
      return dashboard.revenueTrend.slice(-1);
    }

    if (period === "Last Month") {
      return dashboard.revenueTrend.slice(-2, -1);
    }

    if (period === "Last 3 Months") {
      return dashboard.revenueTrend.slice(-3);
    }

    return dashboard.revenueTrend.slice(-6);
  }, [dashboard.revenueTrend, period]);

  const chartPoints = useMemo(() => {
    if (!chartData.length) return "";

    const maxRevenue = Math.max(
      ...chartData.map((item) => Number(item.revenue)),
      1,
    );

    const width = 500;
    const height = 220;

    return chartData
      .map((item, index) => {
        const x =
          chartData.length === 1
            ? width / 2
            : (index / (chartData.length - 1)) * width;

        const y = height - (Number(item.revenue) / maxRevenue) * 170 - 20;

        return `${x} ${y}`;
      })
      .join(" L ");
  }, [chartData]);

  const chartPath = chartPoints ? `M ${chartPoints}` : "";

  const chartAreaPath = chartPoints ? `${chartPath} L 500 220 L 0 220 Z` : "";

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[1180px] px-5 pt-7 lg:px-[38px]">
        <h1 className="text-[32px] font-bold tracking-[-1px]">Overview</h1>

        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[180px] animate-pulse rounded-[15px] border border-[#303030] bg-[#1d1d1d]"
            />
          ))}
        </div>

        <div className="mt-7 h-[300px] animate-pulse rounded-[15px] border border-[#303030] bg-[#1d1d1d]" />
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 pt-7 lg:px-[38px]">
      {/* PAGE TITLE */}

      <div className="mb-7">
        <h1 className="text-[32px] font-bold tracking-[-1px] text-[#f4f4f4]">
          Overview
        </h1>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* TOTAL MEMBERS */}

        <div
          className="
            rounded-[15px]
            border
            border-[#303030]
            bg-[#1d1d1d]
            p-5
            shadow-[0_8px_30px_rgba(0,0,0,0.18)]
            transition
            hover:border-[#3c4220]
          "
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#d4d6b7]">
              Total Members
            </p>

            <FaUsers className="text-[19px] text-[#c6ff00]" />
          </div>

          <p className="mt-5 text-[43px] font-black leading-none">
            {animatedMembers}
          </p>

          <div className="mt-4 flex items-center gap-1 text-[14px] font-semibold text-[#c6ff00]">
            <FaArrowUp />
            Active members
          </div>
        </div>

        {/* PAID */}

        <div
          className="
            rounded-[15px]
            border
            border-[#303030]
            bg-[#1d1d1d]
            p-5
            transition
            hover:border-[#3c4220]
          "
        >
          <div className="flex items-start justify-between">
            <p className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#d4d6b7]">
              Paid This Month
            </p>

            <FaCheckCircle className="text-[19px] text-[#c6ff00]" />
          </div>

          <p className="mt-5 text-[43px] font-black leading-none">
            {animatedPaid}
          </p>

          <div className="mt-5 h-[12px] overflow-hidden rounded-full bg-[#303030]">
            <div
              className="h-full rounded-full bg-[#c6ff00] transition-all duration-700"
              style={{
                width: `${paymentPercentage}%`,
              }}
            />
          </div>

          <p className="mt-2 text-[12px] text-[#999]">
            {paymentPercentage.toFixed(0)}% of members paid
          </p>
        </div>

        {/* UNPAID */}

        <div
          className="
            rounded-[15px]
            border
            border-[#303030]
            bg-[#1d1d1d]
            p-5
            transition
            hover:border-[#553636]
          "
        >
          <div className="flex items-start justify-between">
            <p className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#d4d6b7]">
              Unpaid
            </p>

            <FaExclamationTriangle className="text-[19px] text-[#ffaaa5]" />
          </div>

          <p className="mt-5 text-[43px] font-black leading-none text-[#ffaaa5]">
            {animatedUnpaid}
          </p>

          <span className="mt-4 inline-flex rounded-full bg-[#342a2a] px-3 py-1 text-[13px] font-semibold text-[#ffaaa5]">
            Action Required
          </span>
        </div>

        {/* REVENUE */}

        <div
          className="
            rounded-[15px]
            border
            border-[#303030]
            bg-[#1d1d1d]
            p-5
            transition
            hover:border-[#3c4220]
          "
        >
          <div className="flex items-start justify-between">
            <p className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#d4d6b7]">
              Monthly Revenue
            </p>

            <FaMoneyBillWave className="text-[19px] text-[#c6ff00]" />
          </div>

          <p className="mt-5 text-[40px] font-black leading-none">
            {formatMoney(stats.monthlyRevenue)}
          </p>

          <p className="mt-4 text-[14px] text-[#d4d6b7]">
            Expenses: {formatMoney(stats.monthlyExpenses)}
          </p>
        </div>
      </section>

      {/* =====================================================
          REVENUE CHART
      ===================================================== */}

      <section
        className="
          mt-7
          rounded-[15px]
          border
          border-[#303030]
          bg-[#1d1d1d]
          p-5
          shadow-[0_8px_30px_rgba(0,0,0,0.18)]
          lg:p-6
        "
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-[23px] font-bold">Revenue Trend</h2>

            <p className="mt-1 text-[13px] text-[#999]">
              Actual member payments
            </p>
          </div>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="
              rounded-lg
              border
              border-[#383838]
              bg-[#282828]
              px-3
              py-2
              text-[13px]
              text-white
              outline-none
            "
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
          </select>
        </div>

        <div className="relative mt-6 h-[230px] overflow-hidden">
          {/* GRID */}

          <div className="absolute inset-0 flex flex-col justify-between opacity-30">
            <div className="border-t border-[#393939]" />
            <div className="border-t border-[#393939]" />
            <div className="border-t border-[#393939]" />
            <div className="border-t border-[#393939]" />
            <div className="border-t border-[#393939]" />
          </div>

          {/* CHART */}

          {chartData.length > 0 && (
            <svg
              viewBox="0 0 500 220"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#c6ff00" stopOpacity="0.28" />

                  <stop offset="100%" stopColor="#c6ff00" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path d={chartAreaPath} fill="url(#revenueGradient)" />

              <path
                d={chartPath}
                fill="none"
                stroke="#c6ff00"
                strokeWidth="2"
              />
            </svg>
          )}

          {chartData.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-[14px] text-[#777]">
              No revenue data available.
            </div>
          )}
        </div>

        {/* MONTH LABELS */}

        <div className="mt-3 flex justify-between">
          {chartData.map((item) => (
            <div
              key={`${item.month}-${item.year}`}
              className="text-[12px] text-[#888]"
            >
              {item.month}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          BOTTOM SECTIONS
      ===================================================== */}

      <section className="mt-7 grid gap-5 lg:grid-cols-2">
        {/* ACTIONABLE UNPAID */}

        <div
          className="
            rounded-[15px]
            border
            border-[#303030]
            bg-[#1d1d1d]
            p-5
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[23px] font-bold">Actionable Unpaid</h2>

            <span className="text-[14px] font-bold text-[#c6ff00]">
              {stats.unpaid} unpaid
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {overdueMembers.length === 0 ? (
              <div className="rounded-[11px] bg-[#292929] p-6 text-center">
                <FaCheckCircle className="mx-auto text-[28px] text-[#c6ff00]" />

                <p className="mt-3 text-[14px] text-[#aaa]">
                  All members have paid this month.
                </p>
              </div>
            ) : (
              overdueMembers.map((member) => (
                <div
                  key={member.id}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-[11px]
                    bg-[#292929]
                    p-3
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#343434]
                      text-[13px]
                      font-bold
                    "
                  >
                    {member.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-bold">
                      {member.name}
                    </p>

                    <p className="text-[12px] text-[#d4d6b7]">Payment due</p>
                  </div>

                  <p className="text-[14px] font-bold text-[#ffaaa5]">
                    {formatMoney(member.amount)}
                  </p>

                  <button
                    className="
                      hidden
                      rounded-lg
                      border
                      border-[#59612d]
                      px-3
                      py-1.5
                      text-[12px]
                      font-bold
                      sm:block
                    "
                  >
                    Remind
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RECENT PAYMENTS */}

        <div
          className="
            rounded-[15px]
            border
            border-[#303030]
            bg-[#1d1d1d]
            p-5
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[23px] font-bold">Recent Payments</h2>

            <span className="text-[14px] font-bold text-[#c6ff00]">
              This Month
            </span>
          </div>

          <div className="mt-5">
            {recentPayments.length === 0 ? (
              <div className="py-8 text-center text-[14px] text-[#777]">
                No payments recorded this month.
              </div>
            ) : (
              recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="
                    grid
                    grid-cols-[1fr_auto]
                    items-center
                    gap-3
                    border-b
                    border-[#292929]
                    py-4
                    last:border-b-0
                    sm:grid-cols-[1.2fr_1fr_auto]
                  "
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#343434]
                        text-[11px]
                        font-bold
                      "
                    >
                      {payment.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold">
                        {payment.name}
                      </p>

                      <p className="truncate text-[12px] text-[#d4d6b7] sm:hidden">
                        {payment.plan}
                      </p>
                    </div>
                  </div>

                  <p className="hidden truncate text-[14px] text-[#d4d6b7] sm:block">
                    {payment.plan}
                  </p>

                  <p className="text-[14px] font-bold">
                    {formatMoney(payment.amount)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
