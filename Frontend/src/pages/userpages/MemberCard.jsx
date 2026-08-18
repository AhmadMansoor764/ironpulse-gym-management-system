import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FiPhone,
  FiMail,
  FiMoreVertical,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiCreditCard,
  FiPauseCircle,
  FiTrash2,
} from "react-icons/fi";

function MemberCard({ member, index, onDelete }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuDirection, setMenuDirection] = useState("down");

  /* =======================================================
     STATUS CONFIG
  ======================================================= */

  const statusConfig = {
    paid: {
      text: "PAID",
      icon: FiCheckCircle,
      className: "border-[#657d00] bg-[#2b310f] text-[#d6ff00]",
      valueColor: "text-[#d0d0c7]",
    },

    unpaid: {
      text: "UNPAID",
      icon: FiXCircle,
      className: "border-[#795b55] bg-[#342522] text-[#ff9b91]",
      valueColor: "text-[#ff9d92]",
    },
  };

  const status = statusConfig[member.status] || statusConfig.unpaid;

  const StatusIcon = status.icon;

  /* =======================================================
     OPEN MEMBER DETAILS
  ======================================================= */

  const openDetails = () => {
    navigate(`/layout/MembersDetails/${member.id}`);
  };

  /* =======================================================
     THREE DOT MENU
  ======================================================= */

  const toggleMenu = (e) => {
    e.stopPropagation();

    if (!menuOpen) {
      const buttonRect = e.currentTarget.getBoundingClientRect();

      // Approximate menu height
      const menuHeight = 230;

      // Bottom navigation is around 72px high
      const bottomNavHeight = 72;

      const spaceBelow =
        window.innerHeight - buttonRect.bottom - bottomNavHeight;

      const spaceAbove = buttonRect.top;

      if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
        setMenuDirection("up");
      } else {
        setMenuDirection("down");
      }
    }

    setMenuOpen((prev) => !prev);
  };

  /* =======================================================
     MENU ACTION
  ======================================================= */

  const handleAction = (action, e) => {
    e.stopPropagation();

    setMenuOpen(false);

    switch (action) {
      case "edit":
        navigate(`/layout/members/${member.id}/edit`);
        break;

      case "payment":
        navigate(`/layout/recordpayment?member=${member.id}`);
        break;

      case "remove":
        onDelete(member.id);
        break;

      default:
        break;
    }
  };

  /* =======================================================
     LAST PAYMENT INFORMATION
  ======================================================= */

  /*
   * The backend should provide this information from
   * the payment records.
   *
   * We intentionally do not keep the old "value" field.
   */

  const paymentLabel = member.lastPaymentLabel || "DUE DATE";

  const paymentValue =
    member.lastPaymentValue ||
    member.lastPaymentDate ||
    (member.status === "unpaid" ? "Payment due" : "No payment yet");

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -15,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.985,
      }}
      onClick={openDetails}
      className={`
  group
  relative
  min-h-[212px]
  cursor-pointer
  overflow-visible
  rounded-[18px]
  border
  border-[#2b2b2a]
  bg-[#1e1e1e]
  p-[29px]
  transition-colors
  duration-300
  hover:border-[#44463b]
  ${menuOpen ? "z-[1000]" : "z-0"}
`}
    >
      {/* SUBTLE HOVER GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-[#d5ff00]/5
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-[#d5ff00]/10
        "
      />

      {/* TOP */}

      <div className="relative flex items-start justify-between">
        <div className="flex min-w-0 items-center gap-5">
          {/* AVATAR */}
          <div
            className="
    flex
    h-[70px]
    w-[70px]
    shrink-0
    items-center
    justify-center
    rounded-full
    bg-[#292929]
    text-[28px]
    font-medium
    text-[#c7c7ad]
    transition
    duration-300
    group-hover:bg-[#343434]
    group-hover:text-[#d7ff00]
  "
            onClick={(e) => {
              e.stopPropagation();
              openDetails();
            }}
          >
            {member.name
              ?.trim()
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase() || "?"}
          </div>

          {/* NAME + CONTACT */}
          <div className="min-w-0">
            <h2
              className="
                truncate
                text-[23px]
                font-bold
                tracking-[-0.5px]
                text-[#f5f5f5]
                transition-colors
                group-hover:text-[#d7ff00]
              "
            >
              {member.name}
            </h2>

            <div
              className="
                mt-2
                flex
                items-center
                gap-2
                text-[17px]
                font-medium
                text-[#c6c6b5]
              "
            >
              {member.type === "phone" ? (
                <FiPhone size={18} />
              ) : (
                <FiMail size={18} />
              )}

              <span className="truncate">{member.phone || member.email}</span>
            </div>
          </div>
        </div>

        {/* THREE DOT BUTTON */}

        <div className="relative ml-2">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={toggleMenu}
            aria-label={`Actions for ${member.name}`}
            className={`
              rounded-full
              p-2
              transition
              ${
                menuOpen
                  ? "bg-[#303030] text-[#d7ff00]"
                  : "text-[#c7c7b5] hover:bg-[#303030] hover:text-white"
              }
            `}
          >
            <FiMoreVertical size={25} />
          </motion.button>

          {/* ACTION MENU */}

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: menuDirection === "up" ? 5 : -5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  y: menuDirection === "up" ? 5 : -5,
                }}
                transition={{
                  duration: 0.15,
                }}
                onClick={(e) => e.stopPropagation()}
                className={`
        absolute
        right-0
        z-[9999]
        w-[205px]
        overflow-hidden
        rounded-[14px]
        border
        border-[#3a3a36]
        bg-[#242424]
        p-1.5
        shadow-[0_15px_40px_rgba(0,0,0,0.45)]
        ${menuDirection === "up" ? "bottom-[48px]" : "top-[48px]"}
      `}
              >
                {/* EDIT */}

                <button
                  onClick={(e) => handleAction("edit", e)}
                  className="
          flex
          w-full
          items-center
          gap-3
          rounded-[10px]
          px-3
          py-3
          text-left
          text-[14px]
          font-medium
          text-[#deded2]
          transition
          hover:bg-[#303030]
          hover:text-white
        "
                >
                  <FiEdit2 size={17} />
                  <span>Edit Member</span>
                </button>

                {/* PAYMENT */}

                <button
                  onClick={(e) => handleAction("payment", e)}
                  className="
          flex
          w-full
          items-center
          gap-3
          rounded-[10px]
          px-3
          py-3
          text-left
          text-[14px]
          font-medium
          text-[#deded2]
          transition
          hover:bg-[#303030]
          hover:text-white
        "
                >
                  <FiCreditCard size={17} />
                  <span>Record Payment</span>
                </button>

                <div className="my-1 border-t border-[#3a3a3a]" />

                {/* REMOVE */}

                <button
                  onClick={(e) => handleAction("remove", e)}
                  className="
          flex
          w-full
          items-center
          gap-3
          rounded-[10px]
          px-3
          py-3
          text-left
          text-[14px]
          font-medium
          text-[#ff8f86]
          transition
          hover:bg-[#352323]
        "
                >
                  <FiTrash2 size={17} />
                  <span>Remove Member</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM INFORMATION */}

      <div
        className="
          absolute
          bottom-[28px]
          left-[29px]
          right-[29px]
          flex
          items-end
          justify-between
        "
      >
        <div>
          <p
            className="
      mb-1
      text-[14px]
      font-medium
      tracking-[1px]
      text-[#5e6148]
    "
          >
            {paymentLabel}
          </p>

          <p
            className={`
      text-[20px]
      font-medium
      ${status.valueColor}
    `}
          >
            {paymentValue}
          </p>
        </div>

        {/* STATUS */}

        <div
          className={`
            flex
            items-center
            gap-1.5
            rounded-[7px]
            border
            px-3
            py-1.5
            text-[14px]
            font-bold
            ${status.className}
          `}
        >
          <StatusIcon size={16} />
          {status.text}
        </div>
      </div>
    </motion.article>
  );
}

export default MemberCard;
