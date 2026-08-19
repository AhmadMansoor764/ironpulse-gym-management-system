import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaBolt,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.signupNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.signupEmailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.signupEmailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.signupPasswordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.signupPasswordMinLength;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.signupConfirmPasswordRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.signupPasswordsDoNotMatch;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || t.signupUnableToCreateAccount);
      }

      navigate("/layout/dashboard");
    } catch (error) {
      console.error("Registration error:", error);

      setErrors({
        submit: error.message || t.signupUnableToCreateAccount,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        lg:h-screen
        lg:overflow-hidden

        bg-[#101010]
        text-white

        flex
        items-center
        justify-center

        px-4
        py-5

        sm:px-6
        sm:py-6
      "
    >
      {/* ==========================================
          MAIN CARD
      ========================================== */}

      <div
        className="
          w-full
          max-w-[500px]

          rounded-[24px]

          border
          border-[#353535]

          bg-[#1b1b1b]

          shadow-[0_25px_80px_rgba(0,0,0,0.45)]

          px-5
          py-5

          sm:px-8
          sm:py-6
        "
      >
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="text-center">
          {/* Logo Icon */}

          <div className="flex justify-center">
            <FaBolt
              className="
                text-[#c6ff00]

                text-3xl
                sm:text-4xl

                drop-shadow-[0_0_18px_rgba(198,255,0,0.30)]
              "
            />
          </div>

          {/* Logo */}

          <h1
            className="
              mt-2

              text-2xl
              sm:text-3xl

              font-extrabold
              tracking-tight
            "
          >
            IronPulse
          </h1>

          {/* Subtitle */}

          <p
            className="
              mt-1

              text-sm
              sm:text-base

              font-medium

              text-[#b9bd9e]
            "
          >
            {t.signupPageTitle}
          </p>
        </div>

        {/* ==========================================
            FORM
        ========================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            mt-5
            sm:mt-6
          "
        >
          {/* ==========================================
              FULL NAME
          ========================================== */}

          <div>
            <label
              htmlFor="name"
              className="
                block

                mb-1.5

                text-sm
                sm:text-base

                font-bold

                text-white
              "
            >
              {t.signupFullName}
            </label>

            <div
              className={`
                relative
                flex
                items-center

                rounded-xl

                border

                bg-[#292929]

                transition-all

                ${
                  errors.name
                    ? "border-red-500"
                    : "border-[#343434] focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/30"
                }
              `}
            >
              <FaUser
                className="
                  absolute
                  left-4

                  text-[#c6ff00]

                  text-sm

                  pointer-events-none
                "
              />

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.signupNamePlaceholder}
                autoComplete="name"
                className="
                  w-full

                  bg-transparent
                  outline-none

                  py-3

                  pl-11
                  pr-4

                  text-sm
                  sm:text-base

                  text-white

                  placeholder:text-[#777]
                "
              />
            </div>

            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* ==========================================
              EMAIL
          ========================================== */}

          <div className="mt-4">
            <label
              htmlFor="email"
              className="
                block

                mb-1.5

                text-sm
                sm:text-base

                font-bold

                text-white
              "
            >
              {t.signupEmailAddress}
            </label>

            <div
              className={`
                relative
                flex
                items-center

                rounded-xl

                border

                bg-[#292929]

                transition-all

                ${
                  errors.email
                    ? "border-red-500"
                    : "border-[#343434] focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/30"
                }
              `}
            >
              <FaEnvelope
                className="
                  absolute
                  left-4

                  text-[#c6ff00]

                  text-sm

                  pointer-events-none
                "
              />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.signupEmailPlaceholder}
                autoComplete="email"
                className="
                  w-full

                  bg-transparent
                  outline-none

                  py-3

                  pl-11
                  pr-4

                  text-sm
                  sm:text-base

                  text-white

                  placeholder:text-[#777]
                "
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* ==========================================
              PASSWORD
          ========================================== */}

          <div className="mt-4">
            <label
              htmlFor="password"
              className="
                block

                mb-1.5

                text-sm
                sm:text-base

                font-bold

                text-white
              "
            >
              {t.signupPassword}
            </label>

            <div
              className={`
                relative
                flex
                items-center

                rounded-xl

                border

                bg-[#292929]

                transition-all

                ${
                  errors.password
                    ? "border-red-500"
                    : "border-[#343434] focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/30"
                }
              `}
            >
              <FaLock
                className="
                  absolute
                  left-4

                  text-[#c6ff00]

                  text-sm

                  pointer-events-none
                "
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder={t.signupPasswordPlaceholder}
                autoComplete="new-password"
                className="
                  w-full

                  bg-transparent
                  outline-none

                  py-3

                  pl-11
                  pr-11

                  text-sm
                  sm:text-base

                  text-white

                  placeholder:text-[#777]
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword ? t.signupHidePassword : t.signupShowPassword
                }
                className="
                  absolute
                  right-4

                  text-[#777]

                  hover:text-[#c6ff00]

                  transition-colors
                "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* ==========================================
              CONFIRM PASSWORD
          ========================================== */}

          <div className="mt-4">
            <label
              htmlFor="confirmPassword"
              className="
                block

                mb-1.5

                text-sm
                sm:text-base

                font-bold

                text-white
              "
            >
              {t.signupConfirmPassword}
            </label>

            <div
              className={`
                relative
                flex
                items-center

                rounded-xl

                border

                bg-[#292929]

                transition-all

                ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-[#343434] focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/30"
                }
              `}
            >
              <FaLock
                className="
                  absolute
                  left-4

                  text-[#c6ff00]

                  text-sm

                  pointer-events-none
                "
              />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t.signupPasswordPlaceholder}
                autoComplete="new-password"
                className="
                  w-full

                  bg-transparent
                  outline-none

                  py-3

                  pl-11
                  pr-11

                  text-sm
                  sm:text-base

                  text-white

                  placeholder:text-[#777]
                "
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((previous) => !previous)}
                aria-label={
                  showConfirmPassword
                    ? t.signupHideConfirmPassword
                    : t.signupShowConfirmPassword
                }
                className="
                  absolute
                  right-4

                  text-[#777]

                  hover:text-[#c6ff00]

                  transition-colors
                "
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* ==========================================
              SUBMIT ERROR
          ========================================== */}

          {errors.submit && (
            <div
              className="
                mt-4

                rounded-xl

                border
                border-red-500/30

                bg-red-500/10

                px-3
                py-2.5
              "
            >
              <p className="text-xs text-red-400">{errors.submit}</p>
            </div>
          )}

          {/* ==========================================
              CREATE ACCOUNT
          ========================================== */}

          <button
            type="submit"
            disabled={submitting}
            className="
              group

              w-full

              mt-5

              flex
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-[#c6ff00]

              hover:bg-[#d4ff33]

              active:scale-[0.99]

              disabled:opacity-60
              disabled:cursor-not-allowed

              py-3

              text-sm
              sm:text-base

              font-extrabold

              text-black

              transition-all

              shadow-[0_0_25px_rgba(198,255,0,0.10)]

              hover:shadow-[0_0_35px_rgba(198,255,0,0.22)]
            "
          >
            <span>
              {submitting ? t.signupCreatingAccount : t.signupCreateAccount}
            </span>

            {!submitting && (
              <FaArrowRight
                className="
                  text-xs

                  transition-transform

                  group-hover:translate-x-1
                "
              />
            )}
          </button>
        </form>

        {/* ==========================================
            LOGIN LINK
        ========================================== */}

        <div className="mt-4 text-center">
          <p
            className="
              text-xs
              sm:text-sm

              text-[#b9bd9e]
            "
          >
            {t.signupAlreadyHaveAccount}{" "}
            <Link
              to="/login"
              className="
                ml-1

                font-bold

                text-[#c6ff00]

                hover:text-[#d8ff55]

                transition-colors
              "
            >
              {t.signupLoginHere}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
