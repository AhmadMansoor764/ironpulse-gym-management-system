import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiBell,
  FiUser,
  FiPhone,
  FiMail,
  FiSave,
} from "react-icons/fi";

import { useLanguage } from "../context/LanguageContext";

function AddMember() {
  const navigate = useNavigate();

  const { t } = useLanguage();

  // -----------------------------------------
  // FORM STATE
  // -----------------------------------------

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    fee: "99.99",
    startDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // -----------------------------------------
  // INPUT CHANGE
  // -----------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------------------
  // SAVE MEMBER
  // -----------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsSaving(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/member/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            monthlyFee: Number(formData.fee),
            startDate: formData.startDate,
            internalNotes: formData.notes || null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.addMemberError);
      }

      console.log("Member created:", data);

      navigate("/layout/members");
    } catch (error) {
      console.error("Add member error:", error);

      setErrorMessage(error.message);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // -----------------------------------------
  // CANCEL
  // -----------------------------------------

  const handleCancel = () => {
    navigate("/layout/members");
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#111111] text-white">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          w-full
          border-b
          border-[#30302f]
          bg-[#111111]/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[68px]
            w-full
            max-w-[1120px]
            items-center
            px-4
            sm:h-[76px]
            sm:px-6
            lg:px-8
          "
        >
          {/* BACK / CANCEL */}

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleCancel}
            className="
              flex
              shrink-0
              items-center
              gap-2
              text-[#c8c9b2]
              transition
              hover:text-white
            "
          >
            <FiArrowLeft
              className="h-[25px] w-[25px] sm:h-[28px] sm:w-[28px]"
              strokeWidth={1.8}
            />

            <span
              className="
                hidden
                text-[15px]
                font-semibold
                tracking-[0.5px]
                sm:block
              "
            >
              {t.cancel}
            </span>
          </motion.button>

          {/* LOGO */}

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1
              className="
                whitespace-nowrap
                text-[24px]
                font-bold
                tracking-[-1.2px]
                sm:text-[29px]
              "
            >
              IronPulse
            </h1>
          </div>

          {/* NOTIFICATION */}

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="
              relative
              ml-auto
              rounded-full
              p-2
              text-[#d1d2bc]
              transition
              hover:bg-[#222222]
            "
          >
            <FiBell
              className="h-[22px] w-[22px] sm:h-[24px] sm:w-[24px]"
              strokeWidth={1.8}
            />

            <span
              className="
                absolute
                right-[5px]
                top-[5px]
                block
                h-[5px]
                w-[5px]
                rounded-full
                bg-[#d6ff00]
              "
            />
          </motion.button>
        </div>
      </header>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main
        className="
          mx-auto
          w-full
          max-w-[960px]
          px-4
          pb-12
          pt-6
          sm:px-6
          sm:pb-16
          sm:pt-9
          lg:px-8
          lg:pt-12
        "
      >
        {/* ==================================================
            PAGE INTRO
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
            duration: 0.4,
          }}
          className="mb-6 sm:mb-8"
        >
          <h2
            className="
              text-[28px]
              font-bold
              tracking-[-0.8px]
              sm:text-[34px]
              lg:text-[38px]
            "
          >
            {t.addMember}
          </h2>

          <p
            className="
              mt-2
              max-w-[650px]
              text-[15px]
              leading-[1.5]
              text-[#aeb09f]
              sm:mt-3
              sm:text-[17px]
            "
          >
            {t.addMemberDescription}
          </p>
        </motion.div>

        {/* ==================================================
            FORM CARD
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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
            rounded-[18px]
            border
            border-[#30302f]
            bg-[#1b1b1b]
            p-5
            shadow-[0_25px_70px_rgba(0,0,0,0.28)]
            sm:rounded-[20px]
            sm:p-7
            lg:p-9
          "
        >
          <form onSubmit={handleSubmit}>
            {/* ==================================================
                BASIC INFORMATION
            ================================================== */}

            <div className="mb-7">
              <div className="mb-5">
                <h3 className="text-[18px] font-bold text-[#f0f0eb]">
                  {t.basicInformation}
                </h3>

                <p className="mt-1 text-[13px] text-[#85867d]">
                  {t.basicInformationDescription}
                </p>
              </div>

              {/* NAME + PHONE */}

              <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                {/* FULL NAME */}

                <FormField label={t.fullName} icon={FiUser} delay={0.05}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.fullNamePlaceholder}
                    className="input-field pl-[54px]"
                  />
                </FormField>

                {/* PHONE */}

                <FormField label={t.phoneNumber} icon={FiPhone} delay={0.1}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder={t.phoneNumberPlaceholder}
                    className="input-field pl-[54px]"
                  />
                </FormField>

                {/* EMAIL */}

                <FormField label={t.emailAddress} icon={FiMail} delay={0.15}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className="input-field pl-[54px]"
                  />
                </FormField>

                {/* MONTHLY FEE */}

                <FormField label={t.monthlyFee} icon={null} delay={0.2}>
                  <div className="relative">
                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-5
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-[20px]
                        font-semibold
                        text-[#c8cbb4]
                      "
                    >
                      $
                    </span>

                    <input
                      type="number"
                      name="fee"
                      value={formData.fee}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder={t.monthlyFeePlaceholder}
                      className="
                        input-field
                        pl-[48px]
                        pr-5
                      "
                    />
                  </div>
                </FormField>
              </div>
            </div>

            {/* DIVIDER */}

            <div className="mb-7 h-px w-full bg-[#30302f]" />

            {/* ==================================================
                MEMBERSHIP DETAILS
            ================================================== */}

            <div className="mb-7">
              <div className="mb-5">
                <h3 className="text-[18px] font-bold text-[#f0f0eb]">
                  {t.membershipDetails}
                </h3>

                <p className="mt-1 text-[13px] text-[#85867d]">
                  {t.membershipDetailsDescription}
                </p>
              </div>

              {/* START DATE */}

              <FormField label={t.startDate} icon={null} delay={0.25}>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="
                    input-field
                    px-5
                  "
                />
              </FormField>
            </div>

            {/* DIVIDER */}

            <div className="mb-7 h-px w-full bg-[#30302f]" />

            {/* ==================================================
                NOTES
            ================================================== */}

            <div className="mb-7">
              <div className="mb-5">
                <h3 className="text-[18px] font-bold text-[#f0f0eb]">
                  {t.additionalInformation}
                </h3>

                <p className="mt-1 text-[13px] text-[#85867d]">
                  {t.additionalInformationDescription}
                </p>
              </div>

              <FormField label={t.internalNotes} icon={null} delay={0.3}>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t.internalNotesPlaceholder}
                  className="
                    min-h-[125px]
                    w-full
                    resize-y
                    rounded-[12px]
                    border
                    border-transparent
                    bg-[#2c2c2c]
                    px-5
                    py-4
                    text-[16px]
                    leading-[1.5]
                    text-[#e8e8e4]
                    outline-none
                    transition
                    placeholder:text-[#77786f]
                    hover:bg-[#303030]
                    focus:border-[#bddd00]
                    focus:ring-1
                    focus:ring-[#bddd00]
                    sm:min-h-[135px]
                    sm:text-[17px]
                  "
                />
              </FormField>
            </div>

            {/* ERROR */}

            {errorMessage && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mb-5
                  rounded-[12px]
                  border
                  border-red-500/30
                  bg-red-500/10
                  px-4
                  py-3.5
                  text-[14px]
                  leading-[1.5]
                  text-red-300
                  sm:px-5
                  sm:py-4
                  sm:text-[15px]
                "
              >
                {errorMessage}
              </motion.div>
            )}

            {/* ==================================================
                ACTIONS
            ================================================== */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-end
              "
            >
              {/* CANCEL */}

              <motion.button
                type="button"
                whileTap={{
                  scale: 0.95,
                }}
                onClick={handleCancel}
                className="
                  flex
                  h-[56px]
                  w-full
                  items-center
                  justify-center
                  rounded-[12px]
                  border
                  border-[#3a3a39]
                  px-6
                  text-[15px]
                  font-semibold
                  text-[#d4d5cc]
                  transition
                  hover:border-[#55554f]
                  hover:bg-[#252525]
                  hover:text-white
                  sm:w-auto
                "
              >
                {t.cancel}
              </motion.button>

              {/* SAVE */}

              <motion.button
                type="submit"
                disabled={isSaving}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 0 30px rgba(205,255,0,0.18)",
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="
                  flex
                  h-[56px]
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  rounded-[12px]
                  bg-[#caff00]
                  px-7
                  text-[16px]
                  font-bold
                  text-[#111111]
                  transition
                  hover:bg-[#d5ff32]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  sm:w-auto
                "
              >
                {isSaving ? (
                  <>
                    <span
                      className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-[#111]
                        border-t-transparent
                      "
                    />
                    {t.saving}
                  </>
                ) : (
                  <>
                    <FiSave size={21} strokeWidth={2} />
                    {t.saveMember}
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* ==================================================
          GLOBAL INPUT STYLES
      ================================================== */}

      <style>{`
        .input-field {
          height: 64px;
          width: 100%;
          border-radius: 12px;
          border: 1px solid transparent;
          background: #2c2c2c;
          color: #e8e8e4;
          font-size: 16px;
          outline: none;
          transition: all 0.2s ease;
        }

        .input-field::placeholder {
          color: #7f8077;
        }

        .input-field:hover {
          background: #303030;
        }

        .input-field:focus {
          border-color: #bddd00;
          box-shadow: 0 0 0 1px #bddd00;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 1;
          cursor: pointer;
          filter: invert(90%);
          width: 20px;
          height: 20px;
        }

        input[type="date"] {
          color-scheme: dark;
        }

        select {
          color-scheme: dark;
        }

        @media (max-width: 640px) {
          .input-field {
            height: 60px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}

/* ========================================================
   FORM FIELD COMPONENT
======================================================== */

function FormField({ label, icon: Icon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay,
      }}
      className="w-full"
    >
      <label
        className="
          mb-2
          block
          text-[14px]
          font-bold
          tracking-[0.3px]
          text-[#dedfd9]
          sm:text-[15px]
        "
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              z-10
              -translate-y-1/2
              text-[#b8baaa]
              sm:left-5
            "
            size={23}
            strokeWidth={1.8}
          />
        )}

        {children}
      </div>
    </motion.div>
  );
}

export default AddMember;
