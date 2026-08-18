import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiBell,
  FiCamera,
  FiSave,
  FiLock,
  FiLogOut,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit3,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function TrainerProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // =====================================================
  // TRAINER DATA
  // =====================================================

  const [formData, setFormData] = useState({
    name: "Alex Morgan",
    phone: "+1 555 123 4567",
    email: "alex@ironpulse.com",
    gymName: "IronPulse",
    address: "Kabul, Afghanistan",
    bio: "Fitness trainer and gym manager.",
  });

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  // =====================================================
  // UI STATES
  // =====================================================

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
  // PASSWORD CHANGE
  // =====================================================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((previous) => ({
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

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setProfileImage(previewUrl);
  };

  const uploadProfileImage = async () => {
    if (!selectedImage) return null;

    setIsUploadingImage(true);

    try {
      const formData = new FormData();

      formData.append("image", selectedImage);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/profile/image`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to upload image");
      }

      return data.data.image;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    } finally {
      setIsUploadingImage(false);
    }
  };
  // load current user

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load profile");
        }

        console.log("Profile:", data);

        setFormData({
          name: data.data.name || "",
          phone: data.data.phone || "",
          email: data.data.email || "",
          gymName: data.data.gymName || "",
          address: data.data.gymAddress || "",
          bio: data.data.about || "",
        });

        setProfileImage(data.data.image || "");
      } catch (error) {
        console.error("Profile loading error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    setProfileMessage("");
    setProfileError("");

    try {
      // 1. Update normal profile information
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            about: formData.bio,
            phone: formData.phone,
            gymName: formData.gymName,
            gymAddress: formData.address,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update profile");
      }

      // 2. Upload image if a new image was selected
      if (selectedImage) {
        const imageUrl = await uploadProfileImage();

        setProfileImage(imageUrl);
        setSelectedImage(null);
      }

      // 3. Show success message
      setProfileMessage("Profile updated successfully.");
      setTimeout(() => {
        setProfileMessage("");
      }, 3000);

      // 4. Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);

      // Show error to the user
      setProfileError(
        error.message || "Something went wrong while updating your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // =====================================================
  // PASSWORD SUBMIT
  // =====================================================

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password should contain at least 6 characters.");
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/profile/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update password");
      }

      setPasswordMessage(data.message || "Password changed successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordForm(false);
    } catch (error) {
      console.error("Password change error:", error);
      setPasswordError(error.message);
    } finally {
      setIsChangingPassword(false);
    }
  };
  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to logout");
      }

      console.log("Logout successful");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full text-white">
      <main
        className="
          mx-auto
          w-full
          max-w-[1000px]
          px-4
          pb-10
          pt-6
          sm:px-6
          sm:pt-8
          lg:px-10
          lg:pb-12
          lg:pt-10
        "
      >
        {/* =================================================
            PAGE TITLE
        ================================================= */}

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
            duration: 0.35,
          }}
          className="mb-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1
                className="
                  text-[27px]
                  font-bold
                  tracking-[-0.7px]
                  sm:text-[31px]
                "
              >
                Trainer Profile
              </h1>

              <p className="mt-1.5 text-[14px] text-[#85877c] sm:text-[15px]">
                Manage your account and gym information
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              className="
                relative
                flex
                h-[44px]
                w-[44px]
                items-center
                justify-center
                rounded-full
                text-[#c7c9b4]
                transition
                hover:bg-[#222222]
              "
            >
              <FiBell size={22} />

              <span
                className="
                  absolute
                  right-[9px]
                  top-[7px]
                  h-[5px]
                  w-[5px]
                  rounded-full
                  bg-[#d6ff00]
                "
              />
            </motion.button>
          </div>
        </motion.div>

        {/* =================================================
            PROFILE HERO
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
            lg:p-9
          "
        >
          {/* subtle glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-[250px]
              w-[250px]
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
              gap-6
              sm:flex-row
              sm:items-center
            "
          >
            {/* PROFILE IMAGE */}

            <div className="relative mx-auto sm:mx-0">
              <div
                className="
                  h-[115px]
                  w-[115px]
                  overflow-hidden
                  rounded-full
                  border
                  border-[#42423f]
                  bg-[#292929]
                  shadow-[0_10px_35px_rgba(0,0,0,0.3)]
                  sm:h-[130px]
                  sm:w-[130px]
                "
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Trainer"
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
                      bg-[#292929]
                      text-[40px]
                      font-bold
                      text-[#d6ff00]
                    "
                  >
                    {formData.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              {/* CAMERA BUTTON */}

              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => {
                  if (isEditing) {
                    fileInputRef.current?.click();
                  }
                }}
                className="
                  absolute
                  bottom-1
                  right-1
                  flex
                  h-[38px]
                  w-[38px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#111111]
                  bg-[#d6ff00]
                  text-[#111111]
                  shadow-lg
                "
              >
                <FiCamera size={18} />
              </motion.button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* TRAINER INFO */}

            <div className="flex-1 text-center sm:text-left">
              <p
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[2px]
                  text-[#92947f]
                "
              >
                Gym Trainer
              </p>

              <h2
                className="
                  mt-2
                  text-[29px]
                  font-bold
                  tracking-[-0.8px]
                  sm:text-[34px]
                "
              >
                {formData.name}
              </h2>

              <p
                className="
                  mt-2
                  text-[15px]
                  text-[#aeb0a2]
                  sm:text-[16px]
                "
              >
                {formData.gymName}
              </p>
            </div>

            {/* EDIT BUTTON */}

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="
                flex
                h-[48px]
                items-center
                justify-center
                gap-2
                rounded-[11px]
                border
                border-[#3b3b39]
                bg-[#272727]
                px-5
                text-[15px]
                font-semibold
                text-[#e6e6df]
                transition
                hover:border-[#d6ff00]
                hover:text-[#d6ff00]
              "
            >
              <FiEdit3 size={18} />

              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </motion.button>
          </div>
        </motion.section>

        {/* =================================================
            PROFILE FORM
        ================================================= */}

        <form onSubmit={handleSave}>
          {/* =================================================
              PERSONAL INFORMATION
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
              delay: 0.08,
            }}
            className="
              mt-5
              rounded-[20px]
              border
              border-[#30302f]
              bg-[#1b1b1b]
              p-5
              sm:p-7
              lg:p-9
            "
          >
            <SectionHeading
              title="Personal Information"
              description="Your personal contact information."
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
              <ProfileInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={FiUser}
                disabled={!isEditing}
              />

              <ProfileInput
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                icon={FiPhone}
                disabled={!isEditing}
              />

              <ProfileInput
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={FiMail}
                type="email"
                disabled={!isEditing}
              />
            </div>

            {/* BIO */}

            <div className="mt-5">
              <label
                className="
                  mb-2.5
                  block
                  text-[15px]
                  font-semibold
                  text-[#dfe0d8]
                "
              >
                About
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell members a little about yourself..."
                className="
                  w-full
                  resize-none
                  rounded-[13px]
                  border
                  border-[#30302f]
                  bg-[#272727]
                  px-5
                  py-4
                  text-[16px]
                  leading-[1.5]
                  text-[#e8e8e4]
                  outline-none
                  transition
                  placeholder:text-[#77786e]
                  focus:border-[#d6ff00]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              />
            </div>
          </motion.section>
          {/* =================================================
              GYM INFORMATION
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
              delay: 0.16,
            }}
            className="
              mt-5
              rounded-[20px]
              border
              border-[#30302f]
              bg-[#1b1b1b]
              p-5
              sm:p-7
              lg:p-9
            "
          >
            <SectionHeading
              title="Gym Information"
              description="Information about your gym."
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
              <ProfileInput
                label="Gym Name"
                name="gymName"
                value={formData.gymName}
                onChange={handleChange}
                icon={FiUser}
                disabled={!isEditing}
              />

              <ProfileInput
                label="Gym Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                icon={FiMapPin}
                disabled={!isEditing}
              />
            </div>
          </motion.section>

          {profileMessage && (
            <div className="mt-4 rounded-[11px] border border-[#344500] bg-[#202900] px-4 py-3 text-sm text-[#d6ff00]">
              {profileMessage}
            </div>
          )}
          {profileError && (
            <div className="mt-4 rounded-[11px] border border-[#542d2d] bg-[#2a1d1d] px-4 py-3 text-sm text-[#ff9c91]">
              {profileError}
            </div>
          )}
          {/* =================================================
              SAVE BUTTON
          ================================================= */}
          {isEditing && (
            <motion.button
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={isSaving}
              className="
                mt-5
                flex
                h-[58px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-[12px]
                bg-[#d6ff00]
                text-[16px]
                font-bold
                text-[#111111]
                transition
                hover:bg-[#ddff35]
                disabled:cursor-not-allowed
                disabled:opacity-70
                sm:w-auto
                sm:px-8
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
                      border-[#111111]
                      border-t-transparent
                    "
                  />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave size={20} />
                  Save Changes
                </>
              )}
            </motion.button>
          )}
        </form>

        {/* =================================================
            SECURITY
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
            delay: 0.24,
          }}
          className="
            mt-5
            rounded-[20px]
            border
            border-[#30302f]
            bg-[#1b1b1b]
            p-5
            sm:p-7
            lg:p-9
          "
        >
          <SectionHeading
            title="Security"
            description="Manage your account security."
          />

          {!showPasswordForm ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setShowPasswordForm(true)}
              className="
                mt-6
                flex
                w-full
                items-center
                justify-between
                rounded-[13px]
                border
                border-[#30302f]
                bg-[#272727]
                p-5
                text-left
                transition
                hover:border-[#454541]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-[45px]
                    w-[45px]
                    items-center
                    justify-center
                    rounded-[11px]
                    bg-[#303030]
                    text-[#d6ff00]
                  "
                >
                  <FiLock size={21} />
                </div>

                <div>
                  <p className="font-semibold text-white">Change Password</p>

                  <p className="mt-1 text-[13px] text-[#8e9085]">
                    Update your account password
                  </p>
                </div>
              </div>

              <span className="text-[#8f9185]">→</span>
            </motion.button>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="mt-6">
              {passwordError && (
                <div className="mb-5 rounded-[11px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {passwordError}
                </div>
              )}

              {passwordMessage && (
                <div className="mb-5 rounded-[11px] border border-[#d6ff00]/20 bg-[#d6ff00]/10 px-4 py-3 text-sm text-[#d6ff00]">
                  {passwordMessage}
                </div>
              )}
              <PasswordInput
                label="Current Password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                show={showCurrentPassword}
                setShow={setShowCurrentPassword}
              />

              <PasswordInput
                label="New Password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                show={showNewPassword}
                setShow={setShowNewPassword}
              />

              <PasswordInput
                label="Confirm New Password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                show={showConfirmPassword}
                setShow={setShowConfirmPassword}
              />

              <div
                className="
                  mt-6
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                "
              >
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  disabled={isChangingPassword}
                  className="
    flex
    h-[54px]
    min-w-[170px]
    items-center
    justify-center
    gap-2
    rounded-[11px]
    bg-[#d6ff00]
    px-7
    font-bold
    text-[#111111]
    transition
    disabled:cursor-not-allowed
    disabled:opacity-70
  "
                >
                  {isChangingPassword ? (
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
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiLock size={18} />
                      Update Password
                    </>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="
                    h-[54px]
                    rounded-[11px]
                    border
                    border-[#3a3a38]
                    px-7
                    font-semibold
                    text-[#ddddda]
                  "
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </motion.section>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <motion.button
          whileTap={{
            scale: 0.98,
          }}
          type="button"
          onClick={handleLogout}
          className="
            mt-5
            flex
            h-[62px]
            w-full
            items-center
            justify-center
            gap-3
            rounded-[15px]
            border
            border-[#4b302d]
            bg-[#241b1a]
            text-[16px]
            font-semibold
            text-[#ff9c91]
            transition
            hover:border-[#70433e]
            hover:bg-[#2b201f]
          "
        >
          <FiLogOut size={21} />
          Log Out
        </motion.button>
      </main>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ title, description }) {
  return (
    <div>
      <h3
        className="
          text-[21px]
          font-bold
          tracking-[-0.4px]
          sm:text-[23px]
        "
      >
        {title}
      </h3>

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
   PROFILE INPUT
========================================================= */

function ProfileInput({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  type = "text",
  disabled = false,
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
        {Icon && (
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
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-[62px]
            w-full
            rounded-[12px]
            border
            border-[#30302f]
            bg-[#272727]
            text-[16px]
            text-[#eeeeea]
            outline-none
            transition
            placeholder:text-[#77786e]
            focus:border-[#d6ff00]
            focus:ring-1
            focus:ring-[#d6ff00]
            disabled:cursor-not-allowed
            disabled:opacity-65
            ${Icon ? "pl-[54px]" : "px-5"}
            pr-5
          `}
        />
      </div>
    </div>
  );
}

/* =========================================================
   PASSWORD INPUT
========================================================= */

function PasswordInput({ label, name, value, onChange, show, setShow }) {
  return (
    <div className="mb-5">
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
        <FiLock
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
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="
            h-[62px]
            w-full
            rounded-[12px]
            border
            border-[#30302f]
            bg-[#272727]
            pl-[54px]
            pr-[55px]
            text-[16px]
            text-[#eeeeea]
            outline-none
            transition
            focus:border-[#d6ff00]
            focus:ring-1
            focus:ring-[#d6ff00]
          "
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            rounded-full
            p-2
            text-[#97998c]
            transition
            hover:bg-[#333333]
            hover:text-white
          "
        >
          {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
    </div>
  );
}

export default TrainerProfile;
