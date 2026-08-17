import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaPaperPlane,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function ForgotPassword() {
  const API_URL = "https://www.ccl.ac/api/auth";

  /*
  |--------------------------------------------------------------------------
  | FORM STATES
  |--------------------------------------------------------------------------
  */

  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /*
  |--------------------------------------------------------------------------
  | RESET TOKEN
  |--------------------------------------------------------------------------
  */

  const [resetToken, setResetToken] = useState("");

  /*
  |--------------------------------------------------------------------------
  | UI STATES
  |--------------------------------------------------------------------------
  */

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | CLEAR MESSAGES
  |--------------------------------------------------------------------------
  */

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE API ERROR
  |--------------------------------------------------------------------------
  */

  const getApiErrorMessage = (data, fallback) => {
    if (data?.message) {
      return data.message;
    }

    return fallback;
  };

  /*
  |--------------------------------------------------------------------------
  | STEP 1
  | FIND ACCOUNT + SEND OTP
  |--------------------------------------------------------------------------
  */

  const handleSendOtp = async (e) => {
    e.preventDefault();

    clearMessages();

    const cleanUserId = userId.trim();

    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

    if (!cleanUserId) {
      setError(
        "Please enter your Registration Number or Mobile Number."
      );
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | MOBILE VALIDATION
    |--------------------------------------------------------------------------
    */

    if (/^\d+$/.test(cleanUserId)) {
      if (!/^\d{10}$/.test(cleanUserId)) {
        setError(
          "Please enter a valid 10-digit mobile number."
        );
        return;
      }
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/forgot-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            userId: cleanUserId,
          }),
        }
      );

      const data = await response.json();

      console.log("Forgot password response:", data);

      /*
      |--------------------------------------------------------------------------
      | ERROR
      |--------------------------------------------------------------------------
      */

      if (!response.ok || !data.success) {
        setError(
          getApiErrorMessage(
            data,
            "Unable to process password reset request."
          )
        );

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | OTP SENT
      |--------------------------------------------------------------------------
      */

      setSuccess(
        data.message ||
          "OTP has been sent to your registered email address."
      );

      /*
      |--------------------------------------------------------------------------
      | KEEP CLEAN USER ID
      |--------------------------------------------------------------------------
      */

      setUserId(cleanUserId);

      /*
      |--------------------------------------------------------------------------
      | MOVE TO OTP
      |--------------------------------------------------------------------------
      */

      setOtp("");

      setStep(2);
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      setError(
        "Unable to connect to the server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | STEP 2
  | VERIFY OTP
  |--------------------------------------------------------------------------
  */

  const handleVerifyOtp = async (e) => {
  e.preventDefault();

  clearMessages();

  const cleanUserId = userId.trim();
  const cleanOtp = otp.trim();

  if (!cleanUserId) {
    setError("Password reset session not found. Please start again.");
    return;
  }

  if (!/^\d{6}$/.test(cleanOtp)) {
    setError("OTP must be 6 digits.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      `${API_URL}/verify-forgot-password-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          userId: cleanUserId,
          otp: cleanOtp,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(
        data.message || "Invalid or expired OTP."
      );
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | IMPORTANT
    |--------------------------------------------------------------------------
    | Backend must return resetToken.
    */

    if (
      !data.resetToken ||
      typeof data.resetToken !== "string"
    ) {
      console.error(
        "Forgot password OTP response missing resetToken:",
        data
      );

      setError(
        "OTP verified, but reset token was not received. Please start again."
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Save reset token
    |--------------------------------------------------------------------------
    */

    setResetToken(data.resetToken);

    /*
    |--------------------------------------------------------------------------
    | Keep userId
    |--------------------------------------------------------------------------
    */

    setUserId(cleanUserId);

    /*
    |--------------------------------------------------------------------------
    | Move to password reset
    |--------------------------------------------------------------------------
    */

    setSuccess(
      "OTP verified successfully. You can now create a new password."
    );

    setStep(3);

  } catch (error) {
    console.error(
      "Forgot password OTP error:",
      error
    );

    setError(
      "Unable to verify OTP. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  /*
  |--------------------------------------------------------------------------
  | STEP 3
  | RESET PASSWORD
  |--------------------------------------------------------------------------
  */
const handleResetPassword = async (e) => {
  e.preventDefault();

  clearMessages();

  const cleanUserId = userId.trim();

  // Validate User ID
  if (!cleanUserId) {
    setError(
      "Password reset session not found. Please start again."
    );
    return;
  }

  // Validate password
  if (!newPassword) {
    setError("Please enter your new password.");
    return;
  }

  if (newPassword.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  // Validate confirm password
  if (!confirmPassword) {
    setError("Please confirm your new password.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError(
      "New password and confirm password do not match."
    );
    return;
  }

  // Validate reset token
  if (!resetToken) {
    setError(
      "Password reset session has expired. Please start again."
    );
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      `${API_URL}/reset-password`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          userId: cleanUserId,
          resetToken: resetToken,
          newPassword: newPassword,
        }),
      }
    );

    const data = await response.json();

    console.log("Reset password response:", data);

    if (!response.ok || !data.success) {
      setError(
        data.message ||
          "Unable to reset password."
      );

      return;
    }

    setSuccess(
      data.message ||
        "Password reset successfully. You can now login with your new password."
    );

    // Clear sensitive reset information
    setResetToken("");
    setNewPassword("");
    setConfirmPassword("");
    setOtp("");

    // Redirect to login
    setTimeout(() => {
      window.location.href = "/login";
    }, 1800);

  } catch (error) {
    console.error(
      "Reset password error:",
      error
    );

    setError(
      "Unable to connect to server. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  /*
  |--------------------------------------------------------------------------
  | BACK BUTTON
  |--------------------------------------------------------------------------
  */

  const handleBack = () => {
    clearMessages();

    if (step === 2) {
      setOtp("");
      setStep(1);
      return;
    }

    if (step === 3) {
      setNewPassword("");
      setConfirmPassword("");
      setStep(2);
      return;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | STEP TITLE
  |--------------------------------------------------------------------------
  */

  const getTitle = () => {
    if (step === 1) {
      return "Forgot Password";
    }

    if (step === 2) {
      return "Verify OTP";
    }

    return "Reset Password";
  };

  /*
  |--------------------------------------------------------------------------
  | STEP DESCRIPTION
  |--------------------------------------------------------------------------
  */

  const getDescription = () => {
    if (step === 1) {
      return "Find your account";
    }

    if (step === 2) {
      return "Enter the verification code";
    }

    return "Create a new password";
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER MESSAGE
  |--------------------------------------------------------------------------
  */

  const MessageBox = () => {
    if (error) {
      return (
        <div className="rounded-lg border-2 border-red-300 bg-red-50 px-4 py-4 text-red-700 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              !
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold">
                Error
              </p>

              <p className="mt-1 break-words text-sm leading-5">
                {error}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (success) {
      return (
        <div className="rounded-lg border-2 border-green-300 bg-green-50 px-4 py-4 text-green-700 shadow-sm">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="mt-0.5 flex-shrink-0 text-green-600" />

            <div>
              <p className="text-sm font-bold">
                Success
              </p>

              <p className="mt-1 text-sm leading-5">
                {success}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  /*
  |--------------------------------------------------------------------------
  | JSX
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto w-full max-w-[500px]">

        {/* Header */}

        <div className="rounded-t-2xl bg-[#ab183d] px-6 py-5 text-white">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">

              {step === 1 && <FaLock />}

              {step === 2 && <FaShieldAlt />}

              {step === 3 && <FaCheckCircle />}

            </div>

            <div>
              <h1 className="text-xl font-bold">
                {getTitle()}
              </h1>

              <p className="mt-1 text-sm text-white/80">
                {getDescription()}
              </p>
            </div>

          </div>
        </div>

        {/* Content */}

        <div className="rounded-b-2xl bg-white p-6 shadow-lg">

          {/* =========================================================
              STEP 1
          ========================================================= */}

          {step === 1 && (
            <form
              onSubmit={handleSendOtp}
              className="space-y-5"
            >

              <div className="rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                Enter your registered mobile number
                or registration number. We will send
                a verification OTP to your registered
                email address.
              </div>

              {/* User ID */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Registration Number or Mobile Number
                </label>

                <div className="relative">

                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      clearMessages();
                    }}
                    placeholder="Enter registration number or mobile number"
                    autoComplete="username"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20 disabled:bg-gray-100"
                  />

                </div>

                <p className="mt-1.5 text-xs text-gray-500">
                  You can use either your registration
                  number or registered mobile number.
                </p>
              </div>

              <MessageBox />

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ab183d] py-3 font-semibold text-white transition hover:bg-[#921532] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaPaperPlane />

                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}
              </button>

              <div className="border-t border-gray-200 pt-5 text-center">

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#ab183d] hover:underline"
                >
                  <FaArrowLeft />
                  Back to Login
                </Link>

              </div>

            </form>
          )}

          {/* =========================================================
              STEP 2
          ========================================================= */}

          {step === 2 && (
            <form
              onSubmit={handleVerifyOtp}
              className="space-y-5"
            >

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">

                <div className="flex gap-3">

                  <FaShieldAlt className="mt-1 text-blue-600" />

                  <div>

                    <p className="text-sm font-semibold text-blue-800">
                      Verification code sent
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      A 6-digit OTP has been sent
                      to the registered email address
                      associated with this account.
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">

                Account:

                <span className="ml-1 font-semibold text-gray-800">
                  {userId}
                </span>

              </div>

              {/* OTP */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Verification OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => {

                    const value =
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                    setOtp(value);

                    clearMessages();

                  }}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  autoComplete="one-time-code"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-mono text-xl tracking-[0.4em] outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20 disabled:bg-gray-100"
                />

              </div>

              <MessageBox />

              <button
                type="submit"
                disabled={
                  loading ||
                  otp.length !== 6
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ab183d] py-3 font-semibold text-white transition hover:bg-[#921532] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <FaShieldAlt />

                {loading
                  ? "Verifying OTP..."
                  : "Verify OTP"}

              </button>

              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
              >
                ← Back
              </button>

            </form>
          )}

          {/* =========================================================
              STEP 3
          ========================================================= */}

          {step === 3 && (
            <form
              onSubmit={handleResetPassword}
              className="space-y-5"
            >

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">

                <div className="flex gap-3">

                  <FaCheckCircle className="mt-1 text-green-600" />

                  <div>

                    <p className="text-sm font-semibold text-green-800">
                      OTP verified
                    </p>

                    <p className="mt-1 text-xs leading-5 text-green-700">
                      Create a new password for
                      your account.
                    </p>

                  </div>

                </div>

              </div>

              {/* New Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  New Password
                </label>

                <div className="relative">

                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(
                        e.target.value
                      );
                      clearMessages();
                    }}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20 disabled:bg-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </button>

                </div>

                <p className="mt-1.5 text-xs text-gray-500">
                  Password must contain at least
                  8 characters.
                </p>

              </div>

              {/* Confirm Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm New Password
                </label>

                <div className="relative">

                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(
                        e.target.value
                      );
                      clearMessages();
                    }}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20 disabled:bg-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </button>

                </div>

              </div>

              <MessageBox />

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ab183d] py-3 font-semibold text-white transition hover:bg-[#921532] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <FaCheckCircle />

                {loading
                  ? "Resetting Password..."
                  : "Reset Password"}

              </button>

              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
              >
                ← Back
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}