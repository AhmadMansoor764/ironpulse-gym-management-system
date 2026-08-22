import { useState } from "react";
import {
  FaDumbbell,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      submit: "",
    }));
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.validEmail;
    }

    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setSubmitting(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed");
      }

      console.log("Google login successful");

      navigate("/layout/dashboard");
    } catch (error) {
      console.error("Google login error:", error);

      setErrors({
        submit: error.message || "Unable to login with Google",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    setErrors({
      submit: "Google login failed. Please try again.",
    });
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      // ======================================
      // CONNECT YOUR BACKEND HERE
      // ======================================

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.loginFailed);
      }

      console.log("Trainer login successful");

      navigate("/layout/dashboard");
    } catch (error) {
      console.error("Trainer login error:", error);

      setErrors({
        submit: error.message || t.unableToLogin,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
        h-dvh
        min-h-dvh
        w-full
        overflow-hidden
        bg-[#101010]
        text-white
        flex
        items-center
        justify-center
        px-4
        sm:px-6
      "
    >
      {/* ==========================================
          LOGIN CARD
      ========================================== */}

      <div
        className="
          w-full
          max-w-[520px]

          max-h-[calc(100dvh-24px)]

          overflow-hidden

          rounded-2xl
          sm:rounded-[24px]

          border
          border-[#353535]

          bg-[#1b1b1b]

          shadow-[0_25px_80px_rgba(0,0,0,0.45)]

          px-5
          py-5

          sm:px-8
          sm:py-6

          lg:px-10
          lg:py-7
        "
      >
        {/* ==========================================
            BRAND
        ========================================== */}

        <div className="text-center">
          {/* Dumbbell */}

          <div className="flex justify-center">
            <FaDumbbell
              className="
                text-[#c6ff00]

                text-3xl
                sm:text-4xl

                rotate-[-45deg]

                drop-shadow-[0_0_18px_rgba(198,255,0,0.25)]
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

              text-white
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

              text-[#c2c5a8]
            "
          >
            {t.trainerAccessPortal}
          </p>
        </div>

        <div className="mt-5 sm:mt-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="filled_black"
            size="large"
            width="100%"
            text="continue_with"
            shape="rectangular"
          />
        </div>

        {/* OR divider */}
        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#353535]" />

          <span className="text-xs font-medium text-[#858579]">OR</span>

          <div className="h-px flex-1 bg-[#353535]" />
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
              EMAIL
          ========================================== */}

          <div>
            <label
              htmlFor="email"
              className="
                block
                mb-2

                text-sm
                sm:text-base

                font-bold
                text-white
              "
            >
              {t.emailAddress}
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
                    : "border-[#414414] focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/40"
                }
              `}
            >
              <FaEnvelope
                className="
                  absolute
                  left-4

                  text-[#d0d2b7]

                  text-base

                  pointer-events-none
                "
              />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.trainerEmailPlaceholder}
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

                  placeholder:text-[#858579]
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
            {/* Password label + Forgot */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-2
              "
            >
              <label
                htmlFor="password"
                className="
                  text-sm
                  sm:text-base

                  font-bold
                  text-white
                "
              >
                {t.password}
              </label>

              <Link
                to="/forgot-password"
                className="
                  text-xs
                  sm:text-sm

                  font-bold

                  text-[#c6ff00]

                  hover:text-[#ddff66]

                  transition-colors
                "
              >
                {t.forgotPassword}
              </Link>
            </div>

            {/* Password input */}

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
                    : "border-[#414414] focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/40"
                }
              `}
            >
              <FaLock
                className="
                  absolute
                  left-4

                  text-[#d0d2b7]

                  text-base

                  pointer-events-none
                "
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                className="
                  w-full

                  bg-transparent
                  outline-none

                  py-3

                  pl-11
                  pr-12

                  text-sm
                  sm:text-base

                  text-white

                  placeholder:text-[#858579]
                "
              />

              {/* Show / Hide */}

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? t.hidePassword : t.showPassword}
                className="
                  absolute
                  right-4

                  text-[#c8cbb1]

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
              REMEMBER DEVICE
          ========================================== */}

          <div className="mt-4">
            <label
              htmlFor="remember"
              className="
                inline-flex
                items-center
                gap-3

                cursor-pointer
                select-none
              "
            >
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="
                  appearance-none

                  w-4
                  h-4

                  rounded

                  border
                  border-[#53582a]

                  bg-[#292929]

                  checked:bg-[#c6ff00]
                  checked:border-[#c6ff00]

                  cursor-pointer

                  relative

                  transition-all

                  checked:after:content-['✓']
                  checked:after:absolute
                  checked:after:text-black
                  checked:after:font-bold
                  checked:after:text-[10px]
                  checked:after:left-1/2
                  checked:after:top-1/2
                  checked:after:-translate-x-1/2
                  checked:after:-translate-y-1/2
                "
              />

              <span
                className="
                  text-xs
                  sm:text-sm

                  text-[#c5c8ac]
                "
              >
                {t.rememberDevice}
              </span>
            </label>
          </div>

          {/* ==========================================
              SUBMIT ERROR
          ========================================== */}

          {errors.submit && (
            <div
              className="
                mt-3

                rounded-lg

                border
                border-red-500/30

                bg-red-500/10

                px-3
                py-2
              "
            >
              <p className="text-xs text-red-400">{errors.submit}</p>
            </div>
          )}

          {/* ==========================================
              LOGIN BUTTON
          ========================================== */}

          <button
            type="submit"
            disabled={submitting}
            className="
              w-full

              mt-5

              rounded-xl

              bg-[#c6ff00]

              hover:bg-[#d5ff33]

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
            {submitting ? t.signingIn : t.secureLogin}
          </button>
        </form>

        {/* ==========================================
            REQUEST ACCESS
        ========================================== */}

        <div className="mt-4 text-center">
          <p
            className="
              text-xs
              sm:text-sm

              font-medium

              text-[#c5c8ac]
            "
          >
            {t.newTrainer}{" "}
            <Link
              to="/signup"
              className="
                ml-1

                font-bold

                text-[#c6ff00]

                hover:text-[#ddff66]

                transition-colors
              "
            >
              {t.requestAccess}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
