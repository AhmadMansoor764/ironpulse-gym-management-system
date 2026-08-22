import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Email passed from ForgotPassword.jsx
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(57);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // If user somehow opens this page directly
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const handleCodeChange = (e) => {
    // Only allow numbers and maximum 6 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    setCode(value);
    setError("");
    setSuccess("");
  };

  // VERIFY OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!code) {
      setError("Please enter the reset code.");
      return;
    }

    if (code.length !== 6) {
      setError("Please enter the 6-digit reset code.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-reset-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired reset code.");
      }

      setSuccess("Code verified successfully!");

      // Go to reset password page
      navigate("/trainer/reset-password", {
        state: {
          email,
          code,
        },
      });
    } catch (error) {
      console.error("Verify reset code error:", error);
      setError(error.message || "Unable to verify the reset code.");
    } finally {
      setLoading(false);
    }
  };

  // RESEND CODE
  const handleResend = async () => {
    if (countdown > 0 || resending) return;

    setError("");
    setSuccess("");

    try {
      setResending(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to resend the code.");
      }

      setSuccess("A new reset code has been sent to your email.");
      setCode("");
      setCountdown(57);
    } catch (error) {
      console.error("Resend reset code error:", error);
      setError(error.message || "Unable to resend the reset code.");
    } finally {
      setResending(false);
    }
  };

  const handleBack = () => {
    navigate("/trainer/forgot-password");
  };

  return (
    <div className="min-h-screen w-full bg-[#111111] text-white flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-xl">
        <div className="rounded-3xl border border-[#343434] bg-[#1d1d1c] shadow-[0_25px_65px_rgba(0,0,0,0.38)] px-6 py-10 sm:px-10 sm:py-12">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">⚡</div>

            <h1 className="text-3xl sm:text-4xl font-extrabold">IronPulse</h1>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4">
            Verify Reset Code
          </h2>

          {/* Description */}
          <p className="text-center text-[#c9c9b7] text-base sm:text-lg leading-7 mb-8">
            We've sent a 6-digit password reset code to
          </p>

          <p className="text-center text-[#c6ff00] font-semibold break-all mb-8">
            {email}
          </p>

          {/* Form */}
          <form onSubmit={handleVerify}>
            {/* OTP input */}
            <label htmlFor="resetCode" className="block text-lg font-bold mb-3">
              Reset Code
            </label>

            <input
              id="resetCode"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={handleCodeChange}
              placeholder="000000"
              disabled={loading}
              className="
                w-full
                rounded-2xl
                border
                border-[#343434]
                bg-[#292929]
                py-5
                px-5
                text-center
                text-3xl
                font-bold
                tracking-[10px]
                text-white
                outline-none
                focus:border-[#c6ff00]
                focus:ring-1
                focus:ring-[#c6ff00]
                placeholder:text-[#666]
                disabled:opacity-60
              "
            />

            {/* Error */}
            {error && (
              <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
            )}

            {/* Success */}
            {success && (
              <div className="mt-4 rounded-xl border border-[#536600] bg-[#202900] px-4 py-3">
                <p className="text-sm text-[#c6ff00] text-center">{success}</p>
              </div>
            )}

            {/* Verify button */}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="
                w-full
                mt-7
                rounded-2xl
                bg-[#c6ff00]
                hover:bg-[#d4ff33]
                py-4
                text-lg
                font-extrabold
                text-black
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>

          {/* Resend */}
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || resending}
            className="
              w-full
              mt-5
              rounded-2xl
              border
              border-[#393938]
              bg-[#292928]
              py-4
              text-base
              font-semibold
              text-[#cacaaf]
              hover:bg-[#323231]
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {resending
              ? "Sending..."
              : countdown > 0
                ? `Resend Code (0:${String(countdown).padStart(2, "0")})`
                : "Resend Code"}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={handleBack}
            className="
              block
              mx-auto
              mt-7
              text-[#b9bd9e]
              hover:text-[#c6ff00]
              font-semibold
              transition-colors
            "
          >
            ← Back to Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
