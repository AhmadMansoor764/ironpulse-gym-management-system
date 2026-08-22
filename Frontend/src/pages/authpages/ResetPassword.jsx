import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const code = location.state?.code || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !code) {
      setError(
        "Your reset session is missing. Please request a new reset code.",
      );
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
            newPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset your password.");
      }

      setSuccess(
        "Your password has been reset successfully. Redirecting to login...",
      );

      // Give the user a moment to see the success message
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);

      setError(error.message || "Unable to reset your password.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen w-full bg-[#111111] text-white flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-xl">
        <div
          className="
            rounded-3xl
            border
            border-[#343434]
            bg-[#1d1d1c]
            shadow-[0_25px_65px_rgba(0,0,0,0.38)]
            px-6
            py-10
            sm:px-10
            sm:py-12
          "
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">⚡</div>

            <h1 className="text-3xl sm:text-4xl font-extrabold">IronPulse</h1>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4">
            Reset Your Password
          </h2>

          {/* Description */}
          <p className="text-center text-[#c9c9b7] text-base sm:text-lg leading-7 mb-8">
            Create a new password for your IronPulse account.
          </p>

          {/* Email */}
          <div className="mb-7">
            <p className="text-sm text-[#999] mb-2">Account</p>

            <div
              className="
                rounded-xl
                border
                border-[#343434]
                bg-[#292929]
                px-4
                py-4
                text-[#c6ff00]
                font-semibold
                break-all
              "
            >
              {email}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-lg font-bold mb-3"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your new password"
                  disabled={loading}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#343434]
                    bg-[#292929]
                    py-4
                    px-5
                    pr-16
                    text-white
                    outline-none
                    focus:border-[#c6ff00]
                    focus:ring-1
                    focus:ring-[#c6ff00]
                    placeholder:text-[#666]
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#999]
                    hover:text-white
                  "
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-2 text-sm text-[#888]">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-bold mb-3"
              >
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Confirm your new password"
                  disabled={loading}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#343434]
                    bg-[#292929]
                    py-4
                    px-5
                    pr-16
                    text-white
                    outline-none
                    focus:border-[#c6ff00]
                    focus:ring-1
                    focus:ring-[#c6ff00]
                    placeholder:text-[#666]
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#999]
                    hover:text-white
                  "
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="
                  mb-5
                  rounded-xl
                  border
                  border-red-900
                  bg-red-950/30
                  px-4
                  py-3
                "
              >
                <p className="text-sm text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                className="
                  mb-5
                  rounded-xl
                  border
                  border-[#536600]
                  bg-[#202900]
                  px-4
                  py-3
                "
              >
                <p className="text-sm text-[#c6ff00] text-center">{success}</p>
              </div>
            )}

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
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
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          {/* Back */}
          <button
            type="button"
            onClick={handleBack}
            disabled={loading}
            className="
              block
              mx-auto
              mt-7
              text-[#b9bd9e]
              hover:text-[#c6ff00]
              font-semibold
              transition-colors
              disabled:opacity-50
            "
          >
            ← Back to Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
