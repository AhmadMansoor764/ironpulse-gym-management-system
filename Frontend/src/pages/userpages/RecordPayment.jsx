import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiChevronDown,
  FiCheck,
  FiCreditCard,
} from "react-icons/fi";

import { FaMoneyBillWave, FaUniversity } from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext";

function RecordPayment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { t } = useLanguage();
  const recordPaymentT = t.recordPaymentPage;

  // =========================================================
  // MEMBER
  // =========================================================

  const memberId = searchParams.get("member");

  // =========================================================
  // MONTHS
  // =========================================================

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

  // =========================================================
  // YEARS
  // =========================================================

  const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032];

  // =========================================================
  // BILLING PERIOD
  // =========================================================

  const [selectedMonth, setSelectedMonth] = useState("November");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [periodOpen, setPeriodOpen] = useState(false);

  const [member, setMember] = useState(null);

  // =========================================================
  // FORM
  // =========================================================

  const [amount, setAmount] = useState("120.00");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [sendReceipt, setSendReceipt] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // PAYMENT METHODS
  // =========================================================

  const paymentMethods = [
    {
      id: "cash",
      label: recordPaymentT.cash,
      icon: FaMoneyBillWave,
      selected: true,
    },
    {
      id: "card",
      label: recordPaymentT.card,
      icon: FiCreditCard,
    },
    {
      id: "transfer",
      label: recordPaymentT.transfer,
      icon: FaUniversity,
    },
  ];

  // =========================================================
  // CURRENT BILLING PERIOD
  // =========================================================

  const billingPeriod = `${
    recordPaymentT.months[selectedMonth]
  } ${selectedYear}`;

  // =========================================================
  // CANCEL
  // =========================================================

  const handleCancel = () => {
    navigate(-1);
  };

  // =========================================================
  // CONFIRM PAYMENT
  // =========================================================

  const handleConfirmPayment = async () => {
    console.log("CONFIRM PAYMENT CLICKED");
    console.log("memberId:", memberId);

    setError("");

    if (!memberId) {
      setError(recordPaymentT.memberInformationMissing);
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError(recordPaymentT.validPaymentAmount);
      return;
    }

    setLoading(true);

    try {
      const paymentMonth = new Date(
        Date.UTC(selectedYear, months.indexOf(selectedMonth), 1),
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId: Number(memberId),
            amount: Number(amount),
            paymentMonth,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || recordPaymentT.unableToAddPayment);
      }

      navigate(-1);
    } catch (error) {
      console.error("Payment error:", error);

      setError(error.message || recordPaymentT.paymentRecordingError);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SELECT MONTH
  // =========================================================

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  // =========================================================
  // SELECT YEAR
  // =========================================================

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  // =========================================================
  // GET MEMBER
  // =========================================================

  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/member/${memberId}`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || recordPaymentT.unableToAddPayment);
        }

        setMember(data.member);
        setAmount(data.member.monthlyFee.toString());
      } catch (error) {
        console.error(error);
      }
    };

    if (memberId) {
      getMember();
    }
  }, [memberId]);

  return (
    <div className="min-h-screen w-full bg-[#111111] text-white">
      {/* =====================================================
          PAGE
      ====================================================== */}

      <div className="mx-auto min-h-screen w-full max-w-[780px]">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            grid
            h-[68px]
            w-full
            grid-cols-[1fr_auto_1fr]
            items-center
            px-4

            sm:h-[74px]
            sm:px-6

            lg:h-[78px]
            lg:px-8
          "
        >
          {/* CANCEL */}

          <div className="flex justify-start">
            <motion.button
              type="button"
              onClick={handleCancel}
              whileTap={{ scale: 0.94 }}
              className="
                flex
                items-center
                gap-2
                text-[#c8c9b5]
                transition-colors
                hover:text-white
              "
            >
              <FiArrowLeft
                className="
                  h-[20px]
                  w-[20px]

                  sm:h-[22px]
                  sm:w-[22px]

                  lg:h-[23px]
                  lg:w-[23px]
                "
                strokeWidth={1.8}
              />

              <span
                className="
                  text-[13px]
                  font-medium
                  tracking-wide

                  sm:text-[14px]

                  lg:text-[14px]
                "
              >
                {recordPaymentT.cancel}
              </span>
            </motion.button>
          </div>

          {/* LOGO */}

          <motion.h1
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="
              whitespace-nowrap
              text-[24px]
              font-bold
              leading-none
              tracking-[-1px]
              text-[#f5f5f5]

              sm:text-[27px]

              lg:text-[29px]
            "
          >
            IronPulse
          </motion.h1>

          {/* RIGHT EMPTY SPACE */}

          <div />
        </motion.header>

        {/* =====================================================
            MAIN
        ====================================================== */}

        <main
          className="
            px-3
            pb-10
            pt-5

            sm:px-5
            sm:pb-12
            sm:pt-7

            lg:px-8
            lg:pb-14
            lg:pt-8
          "
        >
          {/* =================================================
              PAYMENT CARD
          ================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="
              w-full
              rounded-[16px]
              border
              border-[#292a27]
              bg-[#1c1c1c]
              px-4
              pb-6
              pt-6
              shadow-[0_18px_45px_rgba(0,0,0,0.28)]

              sm:rounded-[18px]
              sm:px-7
              sm:pb-8
              sm:pt-7

              lg:rounded-[20px]
              lg:px-9
              lg:pb-9
              lg:pt-8
            "
          >
            {/* =================================================
                TITLE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.35,
              }}
            >
              <h2
                className="
                  text-[26px]
                  font-bold
                  leading-tight
                  tracking-[-0.7px]
                  text-[#f4f4f4]

                  sm:text-[30px]

                  lg:text-[32px]
                "
              >
                {recordPaymentT.recordPayment}
              </h2>

              <p
                className="
                  mt-3
                  text-[14px]
                  leading-6
                  text-[#aeb09f]

                  sm:text-[15px]

                  lg:text-[15px]
                "
              >
                {recordPaymentT.processingManualTransaction}{" "}
                <span className="font-semibold text-[#caff00]">
                  {member?.name || recordPaymentT.member}
                </span>
                .
              </p>
            </motion.div>

            {/* DIVIDER */}

            <div className="mt-5 h-px w-full bg-[#343532]" />

            {/* =================================================
                BILLING PERIOD
            ================================================== */}

            <div className="mt-6 sm:mt-7 lg:mt-8">
              <label
                className="
                  block
                  text-[13px]
                  font-bold
                  tracking-[0.4px]
                  text-[#d7d8cf]

                  sm:text-[14px]
                "
              >
                {recordPaymentT.billingPeriod}
              </label>

              <div className="relative mt-2.5">
                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.995,
                  }}
                  onClick={() => setPeriodOpen((prev) => !prev)}
                  className="
                    flex
                    h-[52px]
                    w-full
                    items-center
                    justify-between
                    rounded-[11px]
                    bg-[#2a2a2a]
                    px-4
                    text-left
                    transition-colors
                    hover:bg-[#303030]

                    sm:h-[56px]
                    sm:px-5

                    lg:h-[58px]
                  "
                >
                  <span
                    className="
                      text-[16px]
                      font-medium
                      text-[#dededb]

                      sm:text-[17px]
                    "
                  >
                    {billingPeriod}
                  </span>

                  <motion.div
                    animate={{
                      rotate: periodOpen ? 180 : 0,
                    }}
                  >
                    <FiChevronDown className="h-5 w-5" strokeWidth={2.2} />
                  </motion.div>
                </motion.button>

                {/* PERIOD PICKER */}

                <AnimatePresence>
                  {periodOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -6,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -6,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.16,
                      }}
                      className="
                        absolute
                        left-0
                        right-0
                        top-[59px]
                        z-50
                        rounded-[13px]
                        border
                        border-[#3b3b38]
                        bg-[#292929]
                        p-3
                        shadow-[0_18px_35px_rgba(0,0,0,0.45)]
                      "
                    >
                      {/* YEAR */}

                      <div className="mb-4">
                        <p
                          className="
                            mb-2
                            px-1
                            text-[10px]
                            font-bold
                            tracking-[1px]
                            text-[#77796a]
                          "
                        >
                          {recordPaymentT.year}
                        </p>

                        <div
                          className="
                            grid
                            grid-cols-3
                            gap-1.5

                            sm:grid-cols-4
                          "
                        >
                          {years.map((year) => (
                            <button
                              key={year}
                              type="button"
                              onClick={() => handleYearSelect(year)}
                              className={`
                                rounded-[8px]
                                py-2
                                text-[12px]
                                font-medium
                                transition-colors

                                ${
                                  selectedYear === year
                                    ? "bg-[#caff00] text-[#101010]"
                                    : "bg-[#333333] text-[#d5d5cd] hover:bg-[#3a3a3a]"
                                }
                              `}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* MONTH */}

                      <div>
                        <p
                          className="
                            mb-2
                            px-1
                            text-[10px]
                            font-bold
                            tracking-[1px]
                            text-[#77796a]
                          "
                        >
                          {recordPaymentT.month}
                        </p>

                        <div
                          className="
                            grid
                            max-h-[220px]
                            grid-cols-3
                            gap-1.5
                            overflow-y-auto
                            pr-1

                            sm:grid-cols-4
                          "
                        >
                          {months.map((month) => (
                            <button
                              key={month}
                              type="button"
                              onClick={() => handleMonthSelect(month)}
                              className={`
                                rounded-[8px]
                                px-1
                                py-2
                                text-[11px]
                                font-medium
                                transition-colors

                                sm:text-[12px]

                                ${
                                  selectedMonth === month
                                    ? "bg-[#caff00] text-[#101010]"
                                    : "bg-[#333333] text-[#d5d5cd] hover:bg-[#3a3a3a]"
                                }
                              `}
                            >
                              {recordPaymentT.months[month]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* DONE */}

                      <button
                        type="button"
                        onClick={() => setPeriodOpen(false)}
                        className="
                          mt-3
                          flex
                          w-full
                          items-center
                          justify-center
                          rounded-[8px]
                          bg-[#3a3a3a]
                          py-2
                          text-[12px]
                          font-bold
                          text-[#caff00]
                          transition
                          hover:bg-[#444444]
                        "
                      >
                        {recordPaymentT.done}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* =================================================
                AMOUNT
            ================================================== */}

            <div className="mt-5 sm:mt-6">
              <label
                className="
                  block
                  text-[13px]
                  font-bold
                  tracking-[0.4px]
                  text-[#d7d8cf]

                  sm:text-[14px]
                "
              >
                {recordPaymentT.amountCollected}
              </label>

              <div className="relative mt-2.5">
                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[19px]
                    font-bold
                    text-[#bfc0ad]
                  "
                >
                  $
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="
                    h-[52px]
                    w-full
                    rounded-[11px]
                    bg-[#2a2a2a]
                    pl-10
                    pr-4
                    text-[18px]
                    font-semibold
                    tracking-[-0.2px]
                    text-[#f0f0ed]
                    outline-none
                    transition-all
                    focus:bg-[#303030]
                    focus:ring-2
                    focus:ring-[#caff00]

                    sm:h-[56px]
                    sm:text-[19px]

                    lg:h-[58px]
                  "
                />
              </div>

              <p
                className="
                  mt-2
                  text-[12px]
                  leading-5
                  text-[#929487]

                  sm:text-[13px]
                "
              >
                {recordPaymentT.standardMonthlyFee}
              </p>
            </div>

            {/* =================================================
                PAYMENT METHOD
            ================================================== */}

            <div className="mt-6 sm:mt-7">
              <label
                className="
                  block
                  text-[13px]
                  font-bold
                  tracking-[0.4px]
                  text-[#d7d8cf]

                  sm:text-[14px]
                "
              >
                {recordPaymentT.paymentMethod}
              </label>

              <div
                className="
                  mt-2.5
                  grid
                  grid-cols-3
                  gap-2

                  sm:gap-3
                "
              >
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const selected = paymentMethod === method.id;

                  return (
                    <motion.button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className={`
                        flex
                        h-[68px]
                        flex-col
                        items-center
                        justify-center
                        rounded-[10px]
                        transition-all

                        sm:h-[74px]
                        sm:rounded-[11px]

                        ${
                          selected
                            ? "border-2 border-[#caff00] bg-[#242719]"
                            : "border-2 border-transparent bg-[#2a2a2a] hover:bg-[#303030]"
                        }
                      `}
                    >
                      <Icon
                        className="
                          h-[20px]
                          w-[20px]
                          text-[#d0d1bc]

                          sm:h-[22px]
                          sm:w-[22px]
                        "
                      />

                      <span
                        className="
                          mt-1.5
                          text-[10px]
                          font-semibold
                          tracking-[0.3px]
                          text-[#d0d0c7]

                          sm:text-[11px]
                        "
                      >
                        {method.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================== */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    height: 0,
                  }}
                  className="
                    mt-5
                    rounded-[10px]
                    border
                    border-[#70433e]
                    bg-[#342522]
                    px-3.5
                    py-3
                    text-[13px]
                    font-medium
                    leading-5
                    text-[#ff9b91]

                    sm:text-[14px]
                  "
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                ACTION BUTTONS
            ================================================== */}

            <div
              className="
                mt-7
                grid
                grid-cols-2
                gap-2.5

                sm:mt-8
                sm:gap-3

                lg:mt-9
              "
            >
              {/* CANCEL */}

              <motion.button
                type="button"
                onClick={handleCancel}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  h-[54px]
                  rounded-[10px]
                  border
                  border-[#3b3c39]
                  bg-transparent
                  text-[13px]
                  font-bold
                  tracking-wide
                  text-[#f0f0ed]
                  transition-colors
                  hover:bg-[#242424]

                  sm:h-[58px]
                  sm:text-[14px]
                "
              >
                {recordPaymentT.cancel}
              </motion.button>

              {/* CONFIRM */}

              <motion.button
                type="button"
                disabled={loading}
                onClick={handleConfirmPayment}
                whileHover={{
                  boxShadow: "0 0 20px rgba(202,255,0,0.16)",
                }}
                whileTap={{
                  scale: 0.975,
                }}
                className="
                  flex
                  h-[54px]
                  items-center
                  justify-center
                  gap-2
                  rounded-[10px]
                  bg-[#caff00]
                  px-3
                  text-[13px]
                  font-bold
                  leading-tight
                  tracking-wide
                  text-[#080808]
                  transition-opacity
                  disabled:cursor-not-allowed
                  disabled:opacity-70

                  sm:h-[58px]
                  sm:text-[14px]
                "
              >
                {loading ? (
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "linear",
                    }}
                    className="
                      h-[20px]
                      w-[20px]
                      rounded-full
                      border-[3px]
                      border-[#111111]
                      border-t-transparent
                    "
                  />
                ) : (
                  <>
                    <FiCheck
                      className="
                        h-[18px]
                        w-[18px]

                        sm:h-[19px]
                        sm:w-[19px]
                      "
                      strokeWidth={2.5}
                    />

                    <span className="text-center">
                      {recordPaymentT.confirmPayment}
                    </span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}

export default RecordPayment;
