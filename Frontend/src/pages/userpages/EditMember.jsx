import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiSave,
  FiCamera,
} from "react-icons/fi";

import { useLanguage } from "../context/LanguageContext";

function EditMember() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =====================================================
  // LANGUAGE
  // =====================================================

  const { t } = useLanguage();
  const editT = t.editMember;

  // =====================================================
  // STATE
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    monthlyFee: "",
    startDate: "",
  });

  // =====================================================
  // GET MEMBER
  // =====================================================

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/member/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || editT.getMemberError);
        }

        setFormData({
          name: data.member.name || "",
          phone: data.member.phone || "",
          email: data.member.email || "",
          monthlyFee: data.member.monthlyFee || "",
          startDate: data.member.startDate
            ? new Date(data.member.startDate).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Get member error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getUser();
    }
  }, [id, editT.getMemberError]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/member/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || editT.updateMemberError);
      }

      navigate(`/layout/MembersDetails/${id}`);
    } catch (error) {
      console.error("Update member error:", error);

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#111111]
        "
      >
        <div
          className="
            h-9
            w-9
            animate-spin
            rounded-full
            border-2
            border-[#d6ff00]
            border-t-transparent
          "
        />
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

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
      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#2c2c2b]
          bg-[#111111]/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[78px]
            w-full
            max-w-[1000px]
            items-center
            justify-between
            px-5
            sm:h-[86px]
            sm:px-7
            lg:px-10
          "
        >
          {/* BACK */}

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex
              items-center
              gap-2
              rounded-full
              p-2
              text-[#c8c9b6]
              transition
              hover:bg-[#242424]
              hover:text-white
            "
          >
            <FiArrowLeft size={24} />

            <span className="hidden sm:block">{editT.back}</span>
          </motion.button>

          {/* TITLE */}

          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              text-center
            "
          >
            <h1
              className="
                whitespace-nowrap
                text-[21px]
                font-bold
                tracking-[-0.5px]
                sm:text-[25px]
              "
            >
              {editT.title}
            </h1>

            <p
              className="
                mt-1
                hidden
                text-[12px]
                text-[#85877c]
                sm:block
              "
            >
              {editT.subtitle}
            </p>
          </div>

          {/* EMPTY RIGHT SIDE */}

          <div className="w-[40px]" />
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className="
          mx-auto
          w-full
          max-w-[1000px]
          px-4
          pb-10
          pt-6
          sm:px-6
          sm:pt-9
          lg:px-10
          lg:pt-12
        "
      >
        {/* =================================================
            PROFILE PREVIEW
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
          transition={{
            duration: 0.4,
          }}
          className="
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-[#30302f]
            bg-[#1b1b1b]
            p-5
            sm:p-7
            lg:p-8
          "
        >
          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-[240px]
              w-[240px]
              rounded-full
              bg-[#d6ff00]/5
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              items-center
              gap-5
              sm:flex-row
            "
          >
            {/* IMAGE */}

            <div className="relative shrink-0">
              <div
                className="
                  flex
                  h-[105px]
                  w-[105px]
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border
                  border-[#3b3b39]
                  bg-[#292929]
                  sm:h-[120px]
                  sm:w-[120px]
                "
              >
                {image ? (
                  <img
                    src={image}
                    alt={formData.name}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      text-[34px]
                      font-bold
                      text-[#d6ff00]
                    "
                  >
                    {getInitials(formData.name)}
                  </div>
                )}
              </div>

              {/* CAMERA */}

              <label
                className="
                  absolute
                  bottom-0
                  right-0
                  flex
                  h-[36px]
                  w-[36px]
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#111111]
                  bg-[#d6ff00]
                  text-[#111111]
                  shadow-lg
                  transition
                  hover:bg-[#e0ff35]
                "
              >
                <FiCamera size={17} />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* INFO */}

            <div className="text-center sm:text-left">
              <p
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[2px]
                  text-[#85877c]
                "
              >
                {editT.member}
              </p>

              <h2
                className="
                  mt-1
                  text-[26px]
                  font-bold
                  tracking-[-0.6px]
                  sm:text-[30px]
                "
              >
                {formData.name || editT.memberDefault}
              </h2>

              <p
                className="
                  mt-1
                  text-[14px]
                  text-[#92948a]
                "
              >
                {editT.updateInformation}
              </p>
            </div>
          </div>
        </motion.section>

        {/* =================================================
            FORM
        ================================================= */}

        <motion.form
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.08,
          }}
          onSubmit={handleSubmit}
          className="
            mt-5
            rounded-[20px]
            border
            border-[#30302f]
            bg-[#1b1b1b]
            p-5
            sm:p-7
            lg:p-8
          "
        >
          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <SectionHeading
            title={editT.personalInformation}
            description={editT.personalDescription}
          />

          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <InputField
              label={editT.fullName}
              name="name"
              value={formData.name}
              onChange={handleChange}
              icon={FiUser}
              placeholder={editT.fullNamePlaceholder}
              required
            />

            <InputField
              label={editT.phoneNumber}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              icon={FiPhone}
              placeholder={editT.phonePlaceholder}
              required
            />

            <InputField
              label={editT.emailAddress}
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon={FiMail}
              type="email"
              placeholder={editT.emailPlaceholder}
            />
          </div>

          {/* =================================================
              MEMBERSHIP
          ================================================= */}

          <div className="my-9 h-px bg-[#30302f]" />

          <SectionHeading
            title={editT.membershipInformation}
            description={editT.membershipDescription}
          />

          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            {/* MONTHLY FEE */}

            <div>
              <label
                className="
                  mb-2.5
                  block
                  text-[14px]
                  font-semibold
                  text-[#dfe0d8]
                "
              >
                {editT.monthlyFee}
              </label>

              <div className="relative">
                <span
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-[21px]
                    font-semibold
                    text-[#c8cbb4]
                  "
                >
                  $
                </span>

                <input
                  type="number"
                  name="monthlyFee"
                  value={formData.monthlyFee}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  placeholder={editT.monthlyFeePlaceholder}
                  className="
                    h-[64px]
                    w-full
                    rounded-[13px]
                    border
                    border-[#30302f]
                    bg-[#272727]
                    pl-[52px]
                    pr-5
                    text-[17px]
                    font-medium
                    text-[#eeeeea]
                    outline-none
                    transition
                    placeholder:text-[#77786e]
                    focus:border-[#d6ff00]
                    focus:ring-1
                    focus:ring-[#d6ff00]
                  "
                />
              </div>
            </div>

            {/* START DATE */}

            <div>
              <label
                className="
                  mb-2.5
                  block
                  text-[14px]
                  font-semibold
                  text-[#dfe0d8]
                "
              >
                {editT.startDate}
              </label>

              <div className="relative">
                <FiCalendar
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-[#9b9d90]
                  "
                  size={20}
                />

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="
                    h-[64px]
                    w-full
                    rounded-[13px]
                    border
                    border-[#30302f]
                    bg-[#272727]
                    px-5
                    pl-[54px]
                    text-[16px]
                    text-[#eeeeea]
                    outline-none
                    transition
                    focus:border-[#d6ff00]
                    focus:ring-1
                    focus:ring-[#d6ff00]
                  "
                />
              </div>
            </div>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              mt-9
              flex
              flex-col-reverse
              gap-3
              border-t
              border-[#30302f]
              pt-7
              sm:flex-row
              sm:justify-end
            "
          >
            {/* CANCEL */}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate(-1)}
              className="
                h-[58px]
                rounded-[12px]
                border
                border-[#3a3a38]
                px-7
                text-[16px]
                font-semibold
                text-[#d1d2c8]
                transition
                hover:bg-[#292929]
              "
            >
              {editT.cancel}
            </motion.button>

            {/* SAVE */}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={saving}
              className="
                flex
                h-[58px]
                items-center
                justify-center
                gap-3
                rounded-[12px]
                bg-[#d6ff00]
                px-7
                text-[16px]
                font-bold
                text-[#111111]
                transition
                hover:bg-[#e0ff35]
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {saving ? (
                <>
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-[#111111]
                      border-t-transparent
                    "
                  />

                  {editT.saving}
                </>
              ) : (
                <>
                  <FiSave size={20} />

                  {editT.saveChanges}
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  type = "text",
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        className="
          mb-2.5
          block
          text-[14px]
          font-semibold
          text-[#dfe0d8]
        "
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          className="
            pointer-events-none
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-[#9b9d90]
          "
          size={20}
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="
            h-[64px]
            w-full
            rounded-[13px]
            border
            border-[#30302f]
            bg-[#272727]
            pl-[54px]
            pr-5
            text-[16px]
            text-[#eeeeea]
            outline-none
            transition
            placeholder:text-[#77786e]
            focus:border-[#d6ff00]
            focus:ring-1
            focus:ring-[#d6ff00]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ title, description }) {
  return (
    <div>
      <h2
        className="
          text-[21px]
          font-bold
          tracking-[-0.4px]
          sm:text-[23px]
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-1.5
          text-[14px]
          leading-6
          text-[#85877c]
          sm:text-[15px]
        "
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {
  if (!name) return "M";

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default EditMember;
