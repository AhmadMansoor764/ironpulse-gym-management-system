import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaPhone,
  FaEnvelope,
  FaPlus,
  FaHistory,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const MemberDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();

  const memberDetailsT = t.memberDetailsPage;

  const [member, setMember] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  const [error, setError] = useState("");
  const [paymentsError, setPaymentsError] = useState("");

  // ==========================================
  // GET MEMBER DETAILS
  // ==========================================
  useEffect(() => {
    const getMemberDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/member/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t.unableToGetMember);
        }

        setMember(data.member);
      } catch (error) {
        console.error("Get member error:", error);
        setError(error.message || t.unableToGetMember);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getMemberDetail();
    }
  }, [id, t.unableToGetMember]);

  // ==========================================
  // GET MEMBER PAYMENTS
  // ==========================================
  useEffect(() => {
    const getAllPayments = async () => {
      try {
        setPaymentsLoading(true);
        setPaymentsError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payment/member/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t.unableToGetPayments);
        }

        setPayments(data.payments || []);
      } catch (error) {
        console.error("Get payments error:", error);
        setPaymentsError(error.message || t.unableToGetPayments);
      } finally {
        setPaymentsLoading(false);
      }
    };

    if (id) {
      getAllPayments();
    }
  }, [id, t.unableToGetPayments]);

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] p-5 text-white">
        {memberDetailsT.loading}
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="min-h-screen bg-[#111111] p-5 text-white">{error}</div>
    );
  }

  // ==========================================
  // MEMBER NOT FOUND
  // ==========================================
  if (!member) {
    return (
      <div className="min-h-screen bg-[#111111] p-5 text-white">
        {memberDetailsT.memberNotFound}
      </div>
    );
  }

  // ==========================================
  // FORMATTERS
  // ==========================================
  const formatMonth = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // CURRENT MONTH PAYMENT
  // ==========================================
  const currentDate = new Date();

  const currentMonthPayment = payments.find((payment) => {
    const paymentDate = new Date(payment.paymentMonth);

    return (
      paymentDate.getMonth() === currentDate.getMonth() &&
      paymentDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const hasCurrentMonthPayment = Boolean(currentMonthPayment);

  const currentStatus = hasCurrentMonthPayment
    ? memberDetailsT.paid
    : memberDetailsT.unpaid;

  // ==========================================
  // MEMBER IMAGE
  // ==========================================
  const memberImage =
    member.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      member.name,
    )}&background=242424&color=c6ff00&size=200`;

  // ==========================================
  // EXERCISE TYPE TRANSLATION
  // ==========================================
  const getExerciseTypeLabel = (value) => {
    if (!value) {
      return memberDetailsT.notAdded;
    }

    const exerciseTypeMap = {
      Gym: memberDetailsT.exerciseTypes?.gym,
      Fitness: memberDetailsT.exerciseTypes?.fitness,
      "Personal Training": memberDetailsT.exerciseTypes?.personalTraining,
      "Strength Training": memberDetailsT.exerciseTypes?.strengthTraining,
      Cardio: memberDetailsT.exerciseTypes?.cardio,
      "Weight Loss": memberDetailsT.exerciseTypes?.weightLoss,
      Bodybuilding: memberDetailsT.exerciseTypes?.bodybuilding,
      Other: memberDetailsT.exerciseTypes?.other,
    };

    return exerciseTypeMap[value] || value;
  };

  return (
    <div
      className="
        min-h-screen bg-[#111111]
        pb-[180px] text-white
        lg:pb-[120px]
      "
    >
      {/* ==========================================
          HEADER
      ========================================== */}
      <header
        className="
          sticky top-0 z-30
          h-[64px] border-b border-[#292929]
          bg-[#111111]/95 backdrop-blur-xl
          sm:h-[68px] lg:h-[72px]
        "
      >
        <div
          className="
            mx-auto flex h-full w-full max-w-[1280px]
            items-center justify-between
            px-4 sm:px-6 lg:px-8 xl:px-10
          "
        >
          <button
            onClick={() => navigate(-1)}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full text-[#dddddd]
              transition-all hover:bg-[#202020]
              hover:text-white active:scale-90
              sm:h-10 sm:w-10
            "
          >
            <FaArrowLeft className="text-base sm:text-lg" />
          </button>

          <h1
            className="
              text-[18px] font-semibold tracking-tight
              sm:text-[20px] lg:text-[21px]
            "
          >
            {memberDetailsT.memberDetails}
          </h1>

          <div className="w-9 sm:w-10" />
        </div>
      </header>

      {/* ==========================================
          MAIN
      ========================================== */}
      <main
        className="
          mx-auto w-full max-w-[1280px]
          px-4 pt-7
          sm:px-6 sm:pt-8
          lg:px-8 lg:pt-9
          xl:px-10
        "
      >
        {/* ==========================================
            MEMBER PROFILE
        ========================================== */}
        <section
          className="
            flex flex-col items-center text-center
            animate-[fadeIn_0.5s_ease-out]
          "
        >
          {/* PROFILE IMAGE */}
          <div className="relative">
            <div
              className="
                h-[92px] w-[92px] rounded-full
                border-[4px] border-[#242424]
                bg-[#1c1c1c] p-[4px]
                shadow-[0_0_25px_rgba(0,0,0,0.35)]
                sm:h-[108px] sm:w-[108px]
                lg:h-[118px] lg:w-[118px]
              "
            >
              <img
                src={memberImage}
                alt={member.name}
                className="
                  h-full w-full rounded-full object-cover
                "
              />
            </div>

            <div
              className="
                absolute bottom-0 right-0 flex
                h-6 w-6 items-center justify-center
                rounded-full border-[3px]
                border-[#111111] bg-[#c6ff00]
                text-black sm:h-7 sm:w-7
              "
            >
              <FaCheck className="text-[7px] sm:text-[8px]" />
            </div>
          </div>

          {/* NAME */}
          <h2
            className="
              mt-4 max-w-[700px] break-words px-3
              text-[27px] font-bold leading-tight
              tracking-tight
              sm:mt-5 sm:text-[32px]
              lg:mt-4 lg:text-[36px]
            "
          >
            {member.name}
          </h2>

          {/* CONTACT BUTTONS */}
          <div
            className="
              mt-5 flex w-full max-w-[380px]
              gap-2.5 px-1
              sm:mt-5 sm:max-w-[400px] sm:gap-3
            "
          >
            <a
              href={`tel:${member.phone}`}
              className="
                flex h-11 flex-1 items-center
                justify-center gap-2 rounded-full
                border border-[#363636] px-4
                text-sm font-semibold transition-all
                hover:border-[#c6ff00]
                hover:text-[#c6ff00]
                active:scale-[0.97]
                sm:h-12 sm:text-base
              "
            >
              <FaPhone className="text-xs sm:text-sm" />
              <span>{memberDetailsT.call}</span>
            </a>

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="
                  flex h-11 flex-1 items-center
                  justify-center gap-2 rounded-full
                  border border-[#363636] px-4
                  text-sm font-semibold transition-all
                  hover:border-[#c6ff00]
                  hover:text-[#c6ff00]
                  active:scale-[0.97]
                  sm:h-12 sm:text-base
                "
              >
                <FaEnvelope className="text-xs sm:text-sm" />
                <span>{memberDetailsT.email}</span>
              </a>
            )}
          </div>
        </section>

        {/* ==========================================
            MEMBER INFORMATION
        ========================================== */}
        <section
          className="
            mx-auto mt-8 w-full max-w-[1000px]
            sm:mt-9 lg:mt-10
          "
        >
          <div
            className="
              rounded-[16px] border border-[#303030]
              bg-[#1b1b1b]
              shadow-[0_15px_40px_rgba(0,0,0,0.18)]
              sm:rounded-[18px]
            "
          >
            <div
              className="
                grid grid-cols-1 divide-y
                divide-[#303030]
                sm:grid-cols-3
                sm:divide-x sm:divide-y-0
              "
            >
              {/* STATUS */}
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-wide text-[#92947f]
                    sm:text-sm
                  "
                >
                  {memberDetailsT.currentStatus}
                </p>

                <div
                  className={`
                    mt-2.5 inline-flex items-center gap-2
                    rounded-full px-3 py-1.5
                    text-sm font-bold
                    ${
                      hasCurrentMonthPayment
                        ? "bg-[#303719] text-[#c6ff00]"
                        : "bg-[#3a2020] text-red-400"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-4 w-4 items-center
                      justify-center rounded-full border
                      ${
                        hasCurrentMonthPayment
                          ? "border-[#c6ff00]"
                          : "border-red-400"
                      }
                    `}
                  >
                    <FaCheck className="text-[6px]" />
                  </span>

                  {currentStatus}
                </div>
              </div>

              {/* MONTHLY FEE */}
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-wide text-[#92947f]
                    sm:text-sm
                  "
                >
                  {memberDetailsT.monthlyFee}
                </p>

                <p
                  className="
                    mt-2 text-[25px] font-bold
                    sm:text-[27px]
                  "
                >
                  ${Number(member.monthlyFee || 0).toFixed(2)}
                </p>
              </div>

              {/* MEMBER SINCE */}
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-wide text-[#92947f]
                    sm:text-sm
                  "
                >
                  {memberDetailsT.memberSince}
                </p>

                <p
                  className="
                    mt-2 text-[22px] font-bold
                    sm:text-[24px]
                  "
                >
                  {member.startDate
                    ? formatDate(member.startDate)
                    : memberDetailsT.notAdded}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            FITNESS INFORMATION
        ========================================== */}
        <section
          className="
            mx-auto mt-6 w-full max-w-[1000px]
            sm:mt-7 lg:mt-8
          "
        >
          <div
            className="
              overflow-hidden rounded-[16px]
              border border-[#303030]
              bg-[#1b1b1b]
              shadow-[0_15px_40px_rgba(0,0,0,0.18)]
              sm:rounded-[18px]
            "
          >
            {/* HEADER */}
            <div
              className="
                border-b border-[#303030]
                px-5 py-5 sm:px-6 sm:py-6
              "
            >
              <h2 className="text-[20px] font-bold sm:text-[22px]">
                {memberDetailsT.fitnessInformation}
              </h2>

              <p
                className="
                  mt-1 text-xs text-[#85877a]
                  sm:text-sm
                "
              >
                {memberDetailsT.physicalFitnessInformation}
              </p>
            </div>

            {/* INFORMATION GRID */}
            <div
              className="
                grid grid-cols-2 divide-x divide-y
                divide-[#303030]
                sm:grid-cols-4
              "
            >
              {/* AGE */}
              <div className="px-4 py-5 sm:px-6 sm:py-6">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-wide text-[#92947f]
                  "
                >
                  {memberDetailsT.age}
                </p>

                <p
                  className="
                    mt-2 text-[20px] font-bold
                    sm:text-[23px]
                  "
                >
                  {member.age
                    ? `${member.age} ${memberDetailsT.years}`
                    : memberDetailsT.notAdded}
                </p>
              </div>

              {/* HEIGHT */}
              <div className="px-4 py-5 sm:px-6 sm:py-6">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-wide text-[#92947f]
                  "
                >
                  {memberDetailsT.height}
                </p>

                <p
                  className="
                    mt-2 text-[20px] font-bold
                    sm:text-[23px]
                  "
                >
                  {member.height
                    ? `${member.height} cm`
                    : memberDetailsT.notAdded}
                </p>
              </div>

              {/* WEIGHT */}
              <div className="px-4 py-5 sm:px-6 sm:py-6">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-wide text-[#92947f]
                  "
                >
                  {memberDetailsT.weight}
                </p>

                <p
                  className="
                    mt-2 text-[20px] font-bold
                    sm:text-[23px]
                  "
                >
                  {member.weight
                    ? `${member.weight} kg`
                    : memberDetailsT.notAdded}
                </p>
              </div>

              {/* EXERCISE */}
              <div className="px-4 py-5 sm:px-6 sm:py-6">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-wide text-[#92947f]
                  "
                >
                  {memberDetailsT.exercise}
                </p>

                <p
                  className="
                    mt-2 text-[18px] font-bold
                    sm:text-[20px]
                  "
                >
                  {getExerciseTypeLabel(member.exerciseType)}
                </p>
              </div>
            </div>

            {/* DIET */}
            <div
              className="
                border-t border-[#303030]
                px-5 py-5 sm:px-6 sm:py-6
              "
            >
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-wide text-[#92947f]
                "
              >
                {memberDetailsT.dietNutrition}
              </p>

              <p
                className="
                  mt-2 whitespace-pre-wrap
                  text-[15px] leading-[1.6]
                  text-[#d5d6cd] sm:text-[16px]
                "
              >
                {member.diet || memberDetailsT.noDietInformation}
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            INTERNAL NOTES
        ========================================== */}
        <section
          className="
            mx-auto mt-6 w-full max-w-[1000px]
            sm:mt-7 lg:mt-8
          "
        >
          <div
            className="
              overflow-hidden rounded-[16px]
              border border-[#303030]
              bg-[#1b1b1b]
              shadow-[0_15px_40px_rgba(0,0,0,0.18)]
              sm:rounded-[18px]
            "
          >
            <div
              className="
                border-b border-[#303030]
                px-5 py-5 sm:px-6 sm:py-6
              "
            >
              <h2 className="text-[20px] font-bold sm:text-[22px]">
                {memberDetailsT.internalNotes}
              </h2>
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <p
                className="
                  whitespace-pre-wrap
                  text-[15px] leading-[1.7]
                  text-[#d5d6cd] sm:text-[16px]
                "
              >
                {member.internalNotes || memberDetailsT.noInternalNotes}
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            PAYMENT HISTORY HEADER
        ========================================== */}
        <section
          className="
            mx-auto mt-9 w-full max-w-[1000px]
            sm:mt-10
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9 items-center
                justify-center rounded-full
                bg-[#252b16] text-[#c6ff00]
              "
            >
              <FaHistory className="text-sm" />
            </div>

            <div>
              <h2
                className="
                  text-[21px] font-bold
                  sm:text-[23px]
                "
              >
                {memberDetailsT.paymentHistory}
              </h2>

              <p
                className="
                  mt-0.5 text-xs text-[#85877a]
                  sm:text-sm
                "
              >
                {memberDetailsT.previousMembershipPayments}
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            PAYMENT HISTORY
        ========================================== */}
        <section
          className="
            mx-auto mt-4 w-full max-w-[1000px]
            sm:mt-5
          "
        >
          <div
            className="
              overflow-hidden rounded-[16px]
              border border-[#303030]
              bg-[#1b1b1b]
              sm:rounded-[18px]
            "
          >
            {/* DESKTOP */}
            <div className="hidden sm:block">
              <div
                className="
                  grid grid-cols-[1.5fr_1fr_1fr_0.7fr]
                  border-b border-[#303030]
                  px-6 py-4 text-xs
                  font-semibold uppercase
                  tracking-wide text-[#85877a]
                  lg:px-7
                "
              >
                <span>{memberDetailsT.month}</span>
                <span>{memberDetailsT.date}</span>
                <span>{memberDetailsT.amount}</span>
                <span>{memberDetailsT.status}</span>
              </div>

              {paymentsLoading && (
                <div
                  className="
                    px-5 py-9 text-center
                    text-sm text-[#9b9d8a]
                  "
                >
                  {memberDetailsT.loadingPayments}
                </div>
              )}

              {!paymentsLoading && paymentsError && (
                <div
                  className="
                    px-5 py-9 text-center
                    text-sm text-red-400
                  "
                >
                  {paymentsError}
                </div>
              )}

              {!paymentsLoading && !paymentsError && payments.length === 0 && (
                <div
                  className="
                      px-5 py-9 text-center
                      text-sm text-[#9b9d8a]
                    "
                >
                  {memberDetailsT.noPayments}
                </div>
              )}

              {!paymentsLoading &&
                !paymentsError &&
                payments.map((payment) => (
                  <div
                    key={payment.id || payment._id}
                    className="
                      grid grid-cols-[1.5fr_1fr_1fr_0.7fr]
                      items-center border-b
                      border-[#303030]
                      px-6 py-5 transition-all
                      last:border-b-0
                      hover:bg-[#222222]
                      lg:px-7
                    "
                  >
                    <span className="text-sm font-medium lg:text-base">
                      {formatMonth(payment.paymentMonth)}
                    </span>

                    <span
                      className="
                        text-sm font-medium
                        text-[#b7b9a5] lg:text-base
                      "
                    >
                      {formatDate(payment.createdAt)}
                    </span>

                    <span className="text-sm font-bold lg:text-base">
                      ${Number(payment.amount || 0).toFixed(2)}
                    </span>

                    <span
                      className="
                        justify-self-start rounded-md
                        bg-[#303719] px-2.5 py-1.5
                        text-[10px] font-bold
                        tracking-wide text-[#c6ff00]
                        lg:text-xs
                      "
                    >
                      {memberDetailsT.paidStatus}
                    </span>
                  </div>
                ))}
            </div>

            {/* MOBILE */}
            <div className="sm:hidden">
              {paymentsLoading && (
                <div
                  className="
                    px-5 py-9 text-center
                    text-sm text-[#9b9d8a]
                  "
                >
                  {memberDetailsT.loadingPayments}
                </div>
              )}

              {!paymentsLoading && paymentsError && (
                <div
                  className="
                    px-5 py-9 text-center
                    text-sm text-red-400
                  "
                >
                  {paymentsError}
                </div>
              )}

              {!paymentsLoading && !paymentsError && payments.length === 0 && (
                <div
                  className="
                      px-5 py-9 text-center
                      text-sm text-[#9b9d8a]
                    "
                >
                  {memberDetailsT.noPayments}
                </div>
              )}

              {!paymentsLoading &&
                !paymentsError &&
                payments.map((payment) => (
                  <div
                    key={payment.id || payment._id}
                    className="
                      border-b border-[#303030]
                      p-4 last:border-b-0
                    "
                  >
                    <div
                      className="
                        flex items-center
                        justify-between gap-3
                      "
                    >
                      <div>
                        <p className="text-sm font-bold">
                          {formatMonth(payment.paymentMonth)}
                        </p>

                        <p
                          className="
                            mt-1 text-xs
                            text-[#85877a]
                          "
                        >
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>

                      <span
                        className="
                          rounded-md bg-[#303719]
                          px-2.5 py-1.5
                          text-[10px] font-bold
                          tracking-wide
                          text-[#c6ff00]
                        "
                      >
                        {memberDetailsT.paidStatus}
                      </span>
                    </div>

                    <div
                      className="
                        mt-3 flex items-end
                        justify-between
                        border-t border-[#303030]
                        pt-3
                      "
                    >
                      <span
                        className="
                          text-xs text-[#77796e]
                        "
                      >
                        {memberDetailsT.amount}
                      </span>

                      <span className="text-lg font-bold">
                        ${Number(payment.amount || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================
          RECORD PAYMENT BAR
      ========================================== */}
      <div
        className="
          fixed bottom-[72px] left-0 right-0 z-50
          border-t border-[#303030]
          bg-[#181818]/95 px-3 py-3
          backdrop-blur-xl
          sm:bottom-[76px] sm:px-5 sm:py-3.5
          lg:bottom-0 lg:left-64
          lg:px-6 lg:py-3
        "
      >
        <div className="mx-auto w-full max-w-[1000px]">
          <button
            onClick={() => {
              navigate(`/layout/recordpayment?member=${member.id}`);
            }}
            className="
              flex h-[54px] w-full items-center
              justify-center gap-2.5 rounded-[13px]
              bg-[#c6ff00] px-4
              text-[16px] font-bold text-black
              shadow-[0_5px_25px_rgba(198,255,0,0.10)]
              transition-all
              hover:bg-[#d4ff33]
              hover:shadow-[0_5px_30px_rgba(198,255,0,0.20)]
              active:scale-[0.98]
              sm:h-[58px] sm:text-[17px]
              lg:h-[58px] lg:rounded-[14px]
              lg:text-[17px]
            "
          >
            <FaPlus className="text-sm sm:text-base" />
            <span>{memberDetailsT.recordNewPayment}</span>
          </button>
        </div>
      </div>

      {/* ==========================================
          ANIMATIONS
      ========================================== */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MemberDetails;
