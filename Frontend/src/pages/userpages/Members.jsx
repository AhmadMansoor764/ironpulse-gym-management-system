import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { FiSearch, FiUserPlus, FiUser } from "react-icons/fi";

import { FaThLarge, FaUserFriends, FaWallet, FaReceipt } from "react-icons/fa";

import MemberCard from "./MemberCard";

import { useLanguage } from "../context/LanguageContext";

/* =========================================================
   MEMBERS PAGE
========================================================= */

function Members() {
  const navigate = useNavigate();

  const { t } = useLanguage();

  const membersT = t.membersPage;

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navigation = [
    {
      name: membersT.dashboard,
      icon: FaThLarge,
      path: "/layout/dashboard",
      key: "dashboard",
    },
    {
      name: membersT.members,
      icon: FaUserFriends,
      path: "/layout/members",
      key: "members",
    },
    {
      name: membersT.profile,
      icon: FaWallet,
      path: "/layout/profile",
      key: "profile",
    },
    {
      name: membersT.expenses,
      icon: FaReceipt,
      path: "/layout/expenses",
      key: "expenses",
    },
  ];

  /* =========================================================
     FILTERS
  ========================================================= */

  const filters = [
    {
      key: "all",
      value: "All Members",
      label: membersT.allMembers,
    },
    {
      key: "paid",
      value: "Paid",
      label: membersT.paid,
    },
    {
      key: "unpaid",
      value: "Unpaid",
      label: membersT.unpaid,
    },
  ];

  /* =========================================================
     STATE
  ========================================================= */

  const [members, setMembers] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All Members");

  const [search, setSearch] = useState("");

  const [activeNav, setActiveNav] = useState("Members");

  /* =========================================================
     DELETE MEMBER
  ========================================================= */

  const handleDeleteMember = async (memberId) => {
    const confirmed = window.confirm(membersT.removeMemberConfirm);

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/member/${memberId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || membersT.unableToRemoveMember);
      }

      // Remove member from frontend immediately
      setMembers((previousMembers) =>
        previousMembers.filter((member) => member.id !== memberId),
      );

      console.log(membersT.memberRemoved);
    } catch (error) {
      console.error("Delete member error:", error);

      alert(error.message || membersT.unableToRemoveMember);
    }
  };

  /* =========================================================
     GET ALL MEMBERS
  ========================================================= */

  useEffect(() => {
    const getAllMembers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/member/all`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || membersT.unableToGetMembers);
        }

        const membersFromBackend = data.members || [];

        /* ===================================================
           GET PAYMENT STATUS FOR EVERY MEMBER
        =================================================== */

        const membersWithStatus = await Promise.all(
          membersFromBackend.map(async (member) => {
            try {
              const paymentResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/payment/member/${member.id}`,
                {
                  method: "GET",
                  credentials: "include",
                },
              );

              const paymentData = await paymentResponse.json();

              if (!paymentResponse.ok) {
                return {
                  ...member,
                  status: "unpaid",
                  lastPaymentLabel: membersT.dueDate,
                  lastPaymentValue: membersT.paymentDue,
                };
              }

              const payments = paymentData.payments || [];

              /* =============================================
                 CURRENT MONTH
              ============================================= */

              const now = new Date();

              const currentMonth = now.getMonth();

              const currentYear = now.getFullYear();

              /* =============================================
                 FIND CURRENT MONTH PAYMENT
              ============================================= */

              const currentMonthPayment = payments.find((payment) => {
                const paymentDate = new Date(payment.paymentMonth);

                return (
                  paymentDate.getMonth() === currentMonth &&
                  paymentDate.getFullYear() === currentYear
                );
              });

              /* =============================================
                 FIND LATEST PAYMENT
              ============================================= */

              const sortedPayments = [...payments].sort(
                (a, b) => new Date(b.paymentMonth) - new Date(a.paymentMonth),
              );

              const latestPayment = sortedPayments[0];

              /* =============================================
                 STATUS
              ============================================= */

              const status = currentMonthPayment ? "paid" : "unpaid";

              /* =============================================
                 CARD BOTTOM INFORMATION
              ============================================= */

              let lastPaymentLabel = membersT.dueDate;

              let lastPaymentValue = membersT.paymentDue;

              if (latestPayment) {
                lastPaymentLabel = membersT.lastPayment;

                lastPaymentValue = new Date(
                  latestPayment.createdAt || latestPayment.paymentMonth,
                ).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
              }

              return {
                ...member,

                status,

                lastPaymentLabel,

                lastPaymentValue,
              };
            } catch (error) {
              console.error(
                `Payment status error for member ${member.id}:`,
                error,
              );

              return {
                ...member,
                status: "unpaid",
                lastPaymentLabel: membersT.dueDate,
                lastPaymentValue: membersT.paymentDue,
              };
            }
          }),
        );

        setMembers(membersWithStatus);
      } catch (error) {
        console.error("Get members error:", error);
      }
    };

    getAllMembers();
  }, [membersT]);

  /* =========================================================
     FILTER MEMBERS
  ========================================================= */

  const filteredMembers = useMemo(() => {
    let result = [...members];

    /* =======================================================
       STATUS FILTER
    ======================================================= */

    if (activeFilter !== "All Members") {
      const statusMap = {
        Paid: "paid",
        Unpaid: "unpaid",
      };

      result = result.filter(
        (member) => member.status === statusMap[activeFilter],
      );
    }

    /* =======================================================
       SEARCH
    ======================================================= */

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((member) => {
        return (
          member.name?.toLowerCase().includes(query) ||
          member.phone?.toLowerCase().includes(query) ||
          member.email?.toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [members, activeFilter, search]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const goToPage = (item) => {
    setActiveNav(item.key);

    navigate(item.path);
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#111111]
        text-white
      "
    >
      {/* ===================================================
          MAIN CONTENT
      ==================================================== */}

      <main
        className="
          mx-auto
          w-full
          max-w-[1100px]
          px-4
          pb-[145px]
          pt-6

          sm:px-6
          sm:pt-8

          lg:px-8
          lg:pb-32
        "
      >
        {/* =================================================
            TITLE
        ================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
        >
          <h2
            className="
              text-[28px]
              font-bold
              tracking-[-0.8px]

              sm:text-[32px]
            "
          >
            {membersT.memberDirectory}
          </h2>

          <p
            className="
              mt-2
              max-w-[650px]
              text-[16px]
              leading-[1.45]
              text-[#c2c2b1]

              sm:text-[18px]
            "
          >
            {membersT.manageMembers}
          </p>
        </motion.section>

        {/* =================================================
            SEARCH
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="relative mt-6"
        >
          <FiSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#62642e]
            "
            size={23}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={membersT.searchPlaceholder}
            className="
              h-[58px]
              w-full
              rounded-[14px]
              border
              border-[#393a31]
              bg-[#292929]
              pl-[49px]
              pr-4
              text-[16px]
              text-white
              outline-none
              placeholder:text-[#bdbdbd]
              transition

              focus:border-[#788900]
              focus:ring-1
              focus:ring-[#788900]

              sm:h-[62px]
              sm:text-[18px]
            "
          />
        </motion.div>

        {/* =================================================
            FILTERS
        ================================================== */}

        <section className="mt-7">
          <div
            className="
              flex
              w-full
              gap-2
              overflow-x-auto
              overscroll-x-contain
              pb-4
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {filters.map((filter) => {
              const active = activeFilter === filter.value;

              return (
                <motion.button
                  key={filter.key}
                  whileTap={{
                    scale: 0.94,
                  }}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`
                    shrink-0
                    rounded-full
                    px-5
                    py-2.5
                    text-[15px]
                    font-bold
                    transition

                    sm:px-7
                    sm:text-[17px]

                    ${
                      active
                        ? "border border-[#d6ff00] bg-transparent text-[#d6ff00]"
                        : "border border-transparent bg-[#1d1d1d] text-[#bdbdae] hover:bg-[#242424]"
                    }
                  `}
                >
                  {filter.label}
                </motion.button>
              );
            })}
          </div>

          <div className="h-px w-full bg-[#353534]" />
        </section>

        {/* =================================================
            MEMBERS
        ================================================== */}

        <section className="mt-5">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                layout
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.04,
                }}
                className="mb-5 w-full"
              >
                <MemberCard
                  member={member}
                  index={index}
                  onDelete={handleDeleteMember}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* =================================================
              EMPTY STATE
          ================================================== */}

          {filteredMembers.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                rounded-[18px]
                border
                border-[#2c2c2c]
                bg-[#1e1e1e]
                px-5
                py-16
                text-center
              "
            >
              <FiUser size={35} className="mx-auto text-[#555]" />

              <p className="mt-4 text-[16px] text-[#777]">
                {membersT.noMembersFound}
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="
                    mt-4
                    text-[14px]
                    font-semibold
                    text-[#caff00]
                  "
                >
                  {membersT.clearSearch}
                </button>
              )}
            </motion.div>
          )}
        </section>
      </main>

      {/* ===================================================
          ADD MEMBER FAB
      ==================================================== */}

      <motion.button
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
          type: "spring",
          stiffness: 260,
        }}
        whileHover={{
          scale: 1.07,
        }}
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => navigate("/layout/addmember")}
        aria-label={membersT.addNewMember}
        title={membersT.addNewMember}
        className="
          fixed
          bottom-[91px]
          right-4
          z-40
          flex
          h-[62px]
          w-[62px]
          items-center
          justify-center
          rounded-full
          bg-[#d7ff00]
          text-[#171717]
          shadow-[0_8px_30px_rgba(0,0,0,0.45)]

          sm:right-7
          sm:h-[68px]
          sm:w-[68px]

          lg:bottom-8
          lg:right-8
        "
      >
        <FiUserPlus size={28} className="sm:h-[31px] sm:w-[31px]" />
      </motion.button>

      {/* ===================================================
          BOTTOM NAVIGATION
      ==================================================== */}

      <nav
        className="
          fixed
          inset-x-0
          bottom-0
          z-50
          w-full
          border-t
          border-[#393939]
          bg-[#171717]/95
          backdrop-blur-xl
          lg:hidden
        "
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div
          className="
            mx-auto
            flex
            h-[72px]
            w-full
            max-w-[600px]
            items-center
          "
        >
          {navigation.map((item) => {
            const Icon = item.icon;

            const active = activeNav === item.key;

            return (
              <button
                key={item.key}
                onClick={() => goToPage(item)}
                className="
                  relative
                  flex
                  h-full
                  min-w-0
                  flex-1
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  overflow-hidden
                "
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                    scale: active ? 1 : 0.8,
                  }}
                  className="
                    absolute
                    left-1/2
                    top-[7px]
                    h-[40px]
                    w-[64px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#c6ff00]
                  "
                />

                <Icon
                  className={`
                    relative
                    z-10
                    text-[19px]
                    transition

                    ${active ? "text-black" : "text-[#d4d6b7]"}
                  `}
                />

                <span
                  className={`
                    relative
                    z-10
                    max-w-full
                    truncate
                    px-1
                    text-[9px]
                    font-medium

                    sm:text-[10px]

                    ${active ? "font-bold text-black" : "text-[#d4d6b7]"}
                  `}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Members;
