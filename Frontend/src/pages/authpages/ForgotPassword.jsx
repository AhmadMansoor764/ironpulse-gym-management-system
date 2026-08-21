import { useState } from "react";
import { FaEnvelope, FaArrowLeft, FaArrowRight, FaBolt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError(t.emailRequired);
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t.invalidEmail);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateEmail()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(data.message || t.resetCodeSent);

      // Go to OTP verification page
      navigate("/trainer/verify-otp", {
        state: { email },
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(error.message || t.forgotPasswordError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center px-5 py-8 sm:px-8">
      <div className="w-full max-w-xl">
        {/* CARD */}
        <div
          className="
            rounded-3xl
            border
            border-[#343434]
            bg-[#1b1b1b]
            shadow-[0_25px_80px_rgba(0,0,0,0.45)]
            px-6
            py-8
            sm:px-10
            sm:py-10
            lg:px-12
            lg:py-11
          "
        >
          {/* BRAND */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaBolt
                className="
                  text-[#c6ff00]
                  text-5xl
                  sm:text-6xl
                  drop-shadow-[0_0_18px_rgba(198,255,0,0.35)]
                "
              />
            </div>

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-extrabold
                tracking-tight
              "
            >
              IronPulse
            </h1>

            <p
              className="
                mt-3
                text-base
                sm:text-lg
                text-[#b9bd9e]
                font-medium
              "
            >
              {t.forgotPasswordTitle}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t.forgotPasswordHeading}
            </h2>

            <p
              className="
                mt-3
                text-sm
                sm:text-base
                leading-6
                text-[#999999]
                max-w-md
                mx-auto
              "
            >
              {t.forgotPasswordDescription}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <label
                htmlFor="email"
                className="
                  block
                  text-base
                  sm:text-lg
                  font-bold
                  text-white
                  mb-3
                "
              >
                {t.emailAddress}
              </label>

              <div
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  bg-[#292929]
                  px-5
                  sm:px-6
                  transition-all

                  ${
                    error
                      ? "border-red-500"
                      : "border-[#343434] focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]"
                  }
                `}
              >
                <FaEnvelope
                  className="
                    flex-shrink-0
                    text-[#c6ff00]
                    text-lg
                    sm:text-xl
                  "
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  autoComplete="email"
                  disabled={loading}
                  className="
                    flex-1
                    min-w-0
                    bg-transparent
                    outline-none
                    py-4
                    sm:py-5
                    text-base
                    sm:text-lg
                    text-white
                    placeholder:text-[#777]
                    disabled:opacity-60
                  "
                />
              </div>

              {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>

            {/* SUCCESS */}
            {success && (
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-[#536600]
                  bg-[#202900]
                  px-4
                  py-3
                "
              >
                <p className="text-sm text-[#c6ff00] leading-5">{success}</p>
              </div>
            )}

            {/* SEND CODE BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                group
                w-full
                mt-7
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-[#c6ff00]
                hover:bg-[#d4ff33]
                active:scale-[0.99]
                py-4
                sm:py-5
                text-base
                sm:text-lg
                font-extrabold
                text-black
                transition-all
                shadow-[0_0_25px_rgba(198,255,0,0.12)]
                hover:shadow-[0_0_35px_rgba(198,255,0,0.25)]
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:bg-[#c6ff00]
              "
            >
              {loading ? (
                <>
                  <span
                    className="
                      w-5
                      h-5
                      border-2
                      border-black/30
                      border-t-black
                      rounded-full
                      animate-spin
                    "
                  />

                  {t.sending}
                </>
              ) : (
                <>
                  <span>{t.sendResetCode}</span>

                  <FaArrowRight
                    className="
                      text-lg
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </>
              )}
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <div className="mt-8 text-center">
            <Link
              to="/trainer/login"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                sm:text-base
                font-semibold
                text-[#b9bd9e]
                hover:text-[#c6ff00]
                transition-colors
              "
            >
              <FaArrowLeft className="text-xs" />

              {t.backToTrainerLogin}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
