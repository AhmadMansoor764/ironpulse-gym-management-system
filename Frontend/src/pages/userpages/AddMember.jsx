import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiBell,
  FiUser,
  FiPhone,
  FiMail,
  FiSave,
  FiActivity,
  FiHeart,
} from "react-icons/fi";

import { useLanguage } from "../context/LanguageContext";

function AddMember() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    fee: "400",
    startDate: new Date().toISOString().split("T")[0],

    age: "",
    height: "",
    weight: "",
    diet: "",
    exerciseType: "",
    notes: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional frontend validation
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB.");
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsSaving(true);

    try {
      const formDataToSend = new FormData();

      // Basic information
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email || "");

      // Membership
      formDataToSend.append("monthlyFee", formData.fee);

      formDataToSend.append("startDate", formData.startDate);

      // Fitness information
      formDataToSend.append("age", formData.age || "");

      formDataToSend.append("height", formData.height || "");

      formDataToSend.append("weight", formData.weight || "");

      formDataToSend.append("diet", formData.diet || "");

      formDataToSend.append("exerciseType", formData.exerciseType || "");

      // Internal notes
      formDataToSend.append("internalNotes", formData.notes || "");

      // Profile image
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      console.log("Sending member with image:", selectedImage);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/member/add`,
        {
          method: "POST",
          credentials: "include",
          body: formDataToSend,
        },
      );

      const data = await response.json();

      console.log("📡 Backend response:", data);

      if (!response.ok) {
        console.error("❌ Backend error:", data);

        throw new Error(
          data.error
            ? `${data.message}: ${data.error}`
            : data.message || t.addMemberError,
        );
      }

      console.log("Member created:", data);

      navigate("/layout/members");
    } catch (error) {
      console.error("Add member error:", error);

      setErrorMessage(error.message || t.addMemberError);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/layout/members");
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#111111] text-white">
      {/* HEADER */}
      <header
        className="
          sticky top-0 z-50 w-full
          border-b border-[#30302f]
          bg-[#111111]/95 backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto flex h-[68px] w-full max-w-[1120px]
            items-center px-4
            sm:h-[76px] sm:px-6 lg:px-8
          "
        >
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleCancel}
            className="
              flex shrink-0 items-center gap-2
              text-[#c8c9b2] transition hover:text-white
            "
          >
            <FiArrowLeft
              className="h-[25px] w-[25px] sm:h-[28px] sm:w-[28px]"
              strokeWidth={1.8}
            />

            <span
              className="
                hidden text-[15px] font-semibold
                tracking-[0.5px] sm:block
              "
            >
              {t.cancel}
            </span>
          </motion.button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1
              className="
                whitespace-nowrap text-[24px] font-bold
                tracking-[-1.2px] sm:text-[29px]
              "
            >
              IronPulse
            </h1>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="
              relative ml-auto rounded-full p-2
              text-[#d1d2bc] transition hover:bg-[#222222]
            "
          >
            <FiBell
              className="h-[22px] w-[22px] sm:h-[24px] sm:w-[24px]"
              strokeWidth={1.8}
            />

            <span
              className="
                absolute right-[5px] top-[5px] block
                h-[5px] w-[5px] rounded-full bg-[#d6ff00]
              "
            />
          </motion.button>
        </div>
      </header>

      {/* MAIN */}
      <main
        className="
          mx-auto w-full max-w-[960px]
          px-4 pb-12 pt-6
          sm:px-6 sm:pb-16 sm:pt-9
          lg:px-8 lg:pt-12
        "
      >
        {/* PAGE INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <h2
            className="
              text-[28px] font-bold tracking-[-0.8px]
              sm:text-[34px] lg:text-[38px]
            "
          >
            {t.addMember}
          </h2>

          <p
            className="
              mt-2 max-w-[650px] text-[15px]
              leading-[1.5] text-[#aeb09f]
              sm:mt-3 sm:text-[17px]
            "
          >
            {t.addMemberDescription}
          </p>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className="
            rounded-[18px] border border-[#30302f]
            bg-[#1b1b1b]
            p-5
            shadow-[0_25px_70px_rgba(0,0,0,0.28)]
            sm:rounded-[20px] sm:p-7 lg:p-9
          "
        >
          <form onSubmit={handleSubmit}>
            {/* BASIC INFORMATION */}
            <div className="mb-7">
              <div className="mb-5">
                <h3 className="text-[18px] font-bold text-[#f0f0eb]">
                  {t.basicInformation}
                </h3>

                <p className="mt-1 text-[13px] text-[#85867d]">
                  {t.basicInformationDescription}
                </p>
              </div>

              {/* MEMBER PROFILE IMAGE */}
              <div className="mb-7 flex flex-col items-center">
                <div
                  className="
      relative
      h-[130px]
      w-[130px]
      overflow-hidden
      rounded-full
      border
      border-[#42423f]
      bg-[#292929]
      shadow-[0_10px_35px_rgba(0,0,0,0.3)]
    "
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Member preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="
          flex
          h-full
          w-full
          items-center
          justify-center
          text-[#77786f]
        "
                    >
                      <FiUser size={50} strokeWidth={1.4} />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="
      mt-4
      rounded-[10px]
      border
      border-[#3a3a39]
      bg-[#272727]
      px-5
      py-2.5
      text-[14px]
      font-semibold
      text-[#e0e1d9]
      transition
      hover:border-[#d6ff00]
      hover:text-[#d6ff00]
    "
                >
                  {imagePreview ? "Change Photo" : "Add Photo"}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <p className="mt-2 text-[12px] text-[#77786f]">
                  JPG, PNG or WEBP • Maximum 5MB
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
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

                <FormField label={t.monthlyFee} icon={null} delay={0.2}>
                  <div className="relative">
                    <span
                      className="
                        pointer-events-none absolute left-5 top-1/2
                        z-10 -translate-y-1/2 text-[20px]
                        font-semibold text-[#c8cbb4]
                      "
                    ></span>

                    <input
                      type="number"
                      name="fee"
                      value={formData.fee}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder={t.monthlyFeePlaceholder}
                      className="input-field pl-[48px] pr-5"
                    />
                  </div>
                </FormField>
              </div>
            </div>

            <div className="mb-7 h-px w-full bg-[#30302f]" />

            {/* MEMBERSHIP DETAILS */}
            <div className="mb-7">
              <div className="mb-5">
                <h3 className="text-[18px] font-bold text-[#f0f0eb]">
                  {t.membershipDetails}
                </h3>

                <p className="mt-1 text-[13px] text-[#85867d]">
                  {t.membershipDetailsDescription}
                </p>
              </div>

              <FormField label={t.startDate} icon={null} delay={0.25}>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="input-field px-5"
                />
              </FormField>
            </div>

            <div className="mb-7 h-px w-full bg-[#30302f]" />

            {/* FITNESS INFORMATION */}
            <div className="mb-7">
              <div className="mb-5">
                <h3 className="text-[18px] font-bold text-[#f0f0eb]">
                  {t.fitnessInformation}
                </h3>

                <p className="mt-1 text-[13px] text-[#85867d]">
                  {t.fitnessInformationDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                {/* AGE */}
                <FormField label={t.age} icon={FiUser} delay={0.3}>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    placeholder={t.agePlaceholder}
                    className="input-field pl-[54px]"
                  />
                </FormField>

                {/* HEIGHT */}
                <FormField label={t.height} icon={FiActivity} delay={0.35}>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    min="1"
                    step="0.1"
                    placeholder={t.heightPlaceholder}
                    className="input-field pl-[54px]"
                  />
                </FormField>

                {/* WEIGHT */}
                <FormField label={t.weight} icon={FiActivity} delay={0.4}>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    min="1"
                    step="0.1"
                    placeholder={t.weightPlaceholder}
                    className="input-field pl-[54px]"
                  />
                </FormField>

                {/* EXERCISE TYPE */}
                <FormField
                  label={t.exerciseType}
                  icon={FiActivity}
                  delay={0.45}
                >
                  <select
                    name="exerciseType"
                    value={formData.exerciseType}
                    onChange={handleChange}
                    className="input-field px-5"
                  >
                    <option value="">{t.selectExerciseType}</option>

                    <option value="Gym">{t.exerciseTypes.gym}</option>

                    <option value="Fitness">{t.exerciseTypes.fitness}</option>

                    <option value="Personal Training">
                      {t.exerciseTypes.personalTraining}
                    </option>

                    <option value="Strength Training">
                      {t.exerciseTypes.strengthTraining}
                    </option>

                    <option value="Cardio">{t.exerciseTypes.cardio}</option>

                    <option value="Weight Loss">
                      {t.exerciseTypes.weightLoss}
                    </option>

                    <option value="Bodybuilding">
                      {t.exerciseTypes.bodybuilding}
                    </option>

                    <option value="Other">{t.exerciseTypes.other}</option>
                  </select>
                </FormField>

                {/* DIET */}
                <div className="md:col-span-2">
                  <FormField label={t.dietNutrition} icon={FiHeart} delay={0.5}>
                    <textarea
                      name="diet"
                      value={formData.diet}
                      onChange={handleChange}
                      rows={3}
                      placeholder={t.dietPlaceholder}
                      className="
                        min-h-[110px] w-full resize-y
                        rounded-[12px] border border-transparent
                        bg-[#2c2c2c] px-5 py-4 pl-[54px]
                        text-[16px] leading-[1.5] text-[#e8e8e4]
                        outline-none transition
                        placeholder:text-[#77786f]
                        hover:bg-[#303030]
                        focus:border-[#bddd00]
                        focus:ring-1 focus:ring-[#bddd00]
                      "
                    />
                  </FormField>
                </div>
              </div>
            </div>

            <div className="mb-7 h-px w-full bg-[#30302f]" />

            {/* INTERNAL NOTES */}
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
                    min-h-[125px] w-full resize-y
                    rounded-[12px] border border-transparent
                    bg-[#2c2c2c] px-5 py-4
                    text-[16px] leading-[1.5] text-[#e8e8e4]
                    outline-none transition
                    placeholder:text-[#77786f]
                    hover:bg-[#303030]
                    focus:border-[#bddd00]
                    focus:ring-1 focus:ring-[#bddd00]
                    sm:min-h-[135px] sm:text-[17px]
                  "
                />
              </FormField>
            </div>

            {/* ERROR */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  mb-5 rounded-[12px]
                  border border-red-500/30
                  bg-red-500/10 px-4 py-3.5
                  text-[14px] leading-[1.5] text-red-300
                  sm:px-5 sm:py-4 sm:text-[15px]
                "
              >
                {errorMessage}
              </motion.div>
            )}

            {/* ACTIONS */}
            <div
              className="
                flex flex-col-reverse gap-3
                sm:flex-row sm:items-center sm:justify-end
              "
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="
                  flex h-[56px] w-full items-center
                  justify-center rounded-[12px]
                  border border-[#3a3a39] px-6
                  text-[15px] font-semibold text-[#d4d5cc]
                  transition hover:border-[#55554f]
                  hover:bg-[#252525] hover:text-white
                  sm:w-auto
                "
              >
                {t.cancel}
              </motion.button>

              <motion.button
                type="submit"
                disabled={isSaving}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 0 30px rgba(205,255,0,0.18)",
                }}
                whileTap={{ scale: 0.985 }}
                className="
                  flex h-[56px] w-full items-center
                  justify-center gap-2.5 rounded-[12px]
                  bg-[#caff00] px-7
                  text-[16px] font-bold text-[#111111]
                  transition hover:bg-[#d5ff32]
                  disabled:cursor-not-allowed
                  disabled:opacity-70 sm:w-auto
                "
              >
                {isSaving ? (
                  <>
                    <span
                      className="
                        h-5 w-5 animate-spin rounded-full
                        border-2 border-[#111]
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

      {/* GLOBAL INPUT STYLES */}
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

function FormField({ label, icon: Icon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay,
      }}
      className="w-full"
    >
      <label
        className="
          mb-2 block text-[14px] font-bold
          tracking-[0.3px] text-[#dedfd9]
          sm:text-[15px]
        "
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            className="
              pointer-events-none absolute left-4
              top-1/2 z-10 -translate-y-1/2
              text-[#b8baaa] sm:left-5
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
