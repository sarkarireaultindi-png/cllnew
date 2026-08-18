import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaSyncAlt,
  FaEnvelope,
  FaShieldAlt,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const API_URL = "https://cllnew.onrender.com/api/auth";

  const messageRef = useRef(null);

  /* ============================================================
     LOGIN FORM
  ============================================================ */

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    captcha: "",
  });

  /* ============================================================
     CAPTCHA
  ============================================================ */

  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  /* ============================================================
     LOGIN OTP
  ============================================================ */

  const [otp, setOtp] = useState("");
  const [otpUserId, setOtpUserId] = useState("");

  /* ============================================================
     UI STATES
  ============================================================ */

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showOtp, setShowOtp] = useState(false);

  /* ============================================================
     SHOW MESSAGE
  ============================================================ */

  useEffect(() => {
    if ((error || success) && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error, success]);

  /* ============================================================
     CLEAR MESSAGES
  ============================================================ */

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  /* ============================================================
     ERROR MESSAGE
  ============================================================ */

  const getErrorMessage = (
    response,
    data,
    defaultMessage
  ) => {
    if (data?.message) {
      return data.message;
    }

    switch (response?.status) {
      case 400:
        return "Invalid request. Please check the information you entered.";

      case 401:
        return "Invalid login credentials. Please check your Registration Number/Mobile Number and password.";

      case 403:
        return "Access denied. Please try again.";

      case 404:
        return "Login service was not found. Please try again later.";

      case 409:
        return "This request could not be completed because the information already exists.";

      case 429:
        return "Too many attempts. Please wait a few minutes and try again.";

      case 500:
        return "Server error. Please try again later.";

      case 502:
      case 503:
        return "Login service is temporarily unavailable. Please try again later.";

      default:
        return defaultMessage;
    }
  };

  /* ============================================================
     LOAD CAPTCHA
  ============================================================ */

  const loadCaptcha = async (showLoadingError = true) => {
    try {
      if (showLoadingError) {
        clearMessages();
      }

      const response = await fetch(
        `${API_URL}/captcha`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      let captchaData = {};

      try {
        captchaData = await response.json();
      } catch {
        captchaData = {};
      }

      if (
        !response.ok ||
        !captchaData.success
      ) {
        throw new Error(
          captchaData.message ||
            "Unable to load CAPTCHA."
        );
      }

      setCaptchaCode(
        captchaData.captchaCode || ""
      );

      setCaptchaToken(
        captchaData.captchaToken || ""
      );

      setFormData((prev) => ({
        ...prev,
        captcha: "",
      }));

    } catch (error) {
      console.error(
        "CAPTCHA error:",
        error
      );

      setCaptchaCode("");
      setCaptchaToken("");

      setError(
        error.message ||
          "Unable to load CAPTCHA. Please refresh the page."
      );
    }
  };

  /* ============================================================
     LOAD CAPTCHA WHEN PAGE OPENS
  ============================================================ */

  useEffect(() => {
    loadCaptcha(false);
  }, []);

  /* ============================================================
     INPUT CHANGE
  ============================================================ */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        name === "captcha"
          ? value
              .replace(
                /[^a-zA-Z0-9]/g,
                ""
              )
              .toUpperCase()
          : value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  /* ============================================================
     REFRESH CAPTCHA
  ============================================================ */

  const refreshCaptcha = async () => {
    await loadCaptcha(true);
  };

  /* ============================================================
     LOGIN
  ============================================================ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearMessages();

    const cleanUserId =
      formData.userId.trim();

    const cleanCaptcha =
      formData.captcha.trim();

    /* ----------------------------------------------------------
       VALIDATION
    ---------------------------------------------------------- */

    if (!cleanUserId) {
      setError(
        "Please enter your Registration Number or Mobile Number."
      );
      return;
    }

    if (!formData.password) {
      setError(
        "Please enter your password."
      );
      return;
    }

    if (!cleanCaptcha) {
      setError(
        "Please enter the CAPTCHA."
      );
      return;
    }

    if (cleanCaptcha.length !== 6) {
      setError(
        "CAPTCHA must be exactly 6 characters."
      );
      return;
    }

    if (!captchaToken) {
      setError(
        "Your CAPTCHA session has expired. Please refresh the CAPTCHA and try again."
      );
      return;
    }

    /* ----------------------------------------------------------
       LOGIN REQUEST
    ---------------------------------------------------------- */

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            userId: cleanUserId,
            password:
              formData.password,
            captcha: cleanCaptcha,
            captchaToken:
              captchaToken,
          }),
        }
      );

      let loginData = {};

      try {
        loginData =
          await response.json();
      } catch {
        loginData = {};
      }

      /* --------------------------------------------------------
         LOGIN FAILED
      -------------------------------------------------------- */

      if (
        !response.ok ||
        !loginData.success
      ) {
        const message =
          getErrorMessage(
            response,
            loginData,
            "Login failed. Please check your details and try again."
          );

        setError(message);

        await loadCaptcha(false);

        return;
      }

      /* --------------------------------------------------------
         OTP REQUIRED
      -------------------------------------------------------- */

      if (loginData.requiresOtp) {
        setOtpUserId(
          loginData.userId ||
            cleanUserId
        );

        setOtp("");

        setShowOtp(true);

        setSuccess(
          "Password verified successfully. A 6-digit OTP has been sent to your registered email address."
        );

        return;
      }

      /* --------------------------------------------------------
         UNEXPECTED LOGIN RESPONSE
      -------------------------------------------------------- */

      setError(
        "Login could not be completed because the server returned an unexpected response."
      );

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to connect to the server. Please check that the backend is running and try again."
      );

    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     VERIFY LOGIN OTP
     
     IMPORTANT:
     This is NORMAL LOGIN OTP.
     
     It does NOT use:
     - resetToken
     - resetUserId
     - /reset-password
     
     It receives:
     - token
     - user
  ============================================================ */

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    clearMessages();

    const cleanOtp =
      otp.trim();

    /* ----------------------------------------------------------
       OTP VALIDATION
    ---------------------------------------------------------- */

    if (!cleanOtp) {
      setError(
        "Please enter the OTP sent to your registered email."
      );
      return;
    }

    if (!/^\d{6}$/.test(cleanOtp)) {
      setError(
        "OTP must contain exactly 6 digits."
      );
      return;
    }

    if (!otpUserId) {
      setError(
        "Your login session could not be found. Please go back and login again."
      );
      return;
    }

    /* ----------------------------------------------------------
       VERIFY OTP REQUEST
    ---------------------------------------------------------- */

    try {
      setOtpLoading(true);

      const response = await fetch(
        `${API_URL}/verify-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            userId: otpUserId,
            otp: cleanOtp,
          }),
        }
      );

      let otpData = {};

      try {
        otpData =
          await response.json();
      } catch {
        otpData = {};
      }

      console.log(
        "Login OTP response:",
        otpData
      );

      /* --------------------------------------------------------
         OTP FAILED
      -------------------------------------------------------- */

      if (
        !response.ok ||
        !otpData.success
      ) {
        setError(
          otpData.message ||
            "Invalid OTP."
        );

        return;
      }

      /* --------------------------------------------------------
         NORMAL LOGIN TOKEN
         
         IMPORTANT:
         DO NOT CHECK resetToken HERE.
      -------------------------------------------------------- */

      if (!otpData.token) {
        setError(
          "OTP verified successfully, but the authentication token was not received. Please try logging in again."
        );

        return;
      }

      /* --------------------------------------------------------
         SAVE JWT
      -------------------------------------------------------- */

      localStorage.setItem(
        "authToken",
        otpData.token
      );

      /*
       * Also save token under "token"
       * if other parts of your application
       * use that key.
       */
      localStorage.setItem(
        "token",
        otpData.token
      );

      /* --------------------------------------------------------
         SAVE USER
      -------------------------------------------------------- */

      if (otpData.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(
            otpData.user
          )
        );
      }

      /* --------------------------------------------------------
         LOGIN SUCCESS
      -------------------------------------------------------- */

   /* --------------------------------------------------------
   LOGIN SUCCESS
-------------------------------------------------------- */

setSuccess(
  "Login successful. Redirecting to your profile..."
);

setOtp("");

const loggedInUserId =
  otpData.user?._id || otpData.user?.id || otpUserId;

/*
 * Save user ID for the next registration/profile steps.
 */
if (loggedInUserId) {
  localStorage.setItem(
    "userId",
    loggedInUserId
  );
}

/*
 * Save complete user information.
 */
if (otpData.user) {
  localStorage.setItem(
    "user",
    JSON.stringify(otpData.user)
  );
}

setOtpUserId("");

setTimeout(() => {
  navigate("/user-profile", {
    state: {
      userId: loggedInUserId,
    },
  });
}, 2000);

    } catch (error) {
      console.error(
        "OTP verification error:",
        error
      );

      setError(
        "Unable to connect to the server while verifying the OTP. Please try again."
      );

    } finally {
      setOtpLoading(false);
    }
  };

  /* ============================================================
     BACK TO LOGIN
  ============================================================ */

  const backToLogin = () => {
    setShowOtp(false);

    setOtp("");

    setOtpUserId("");

    clearMessages();

    loadCaptcha(false);
  };

  /* ============================================================
     MESSAGE BOX
  ============================================================ */

  const MessageBox = () => {
    if (!error && !success) {
      return null;
    }

    return (
      <div
        ref={messageRef}
        className={`rounded-xl border px-4 py-4 shadow-sm ${
          error
            ? "border-red-300 bg-red-50"
            : "border-green-300 bg-green-50"
        }`}
        role="alert"
      >
        <div className="flex items-start gap-3">

          <div
            className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
              error
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {error ? (
              <FaExclamationCircle />
            ) : (
              <FaCheckCircle />
            )}
          </div>

          <div className="flex-1">

            <p
              className={`text-sm font-bold ${
                error
                  ? "text-red-800"
                  : "text-green-800"
              }`}
            >
              {error
                ? "Login Error"
                : "Success"}
            </p>

            <p
              className={`mt-1 text-sm leading-6 ${
                error
                  ? "text-red-700"
                  : "text-green-700"
              }`}
            >
              {error || success}
            </p>

          </div>

        </div>
      </div>
    );
  };

  /* ============================================================
     JSX
  ============================================================ */

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto w-full max-w-[500px]">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="rounded-t-2xl bg-[#ab183d] px-6 py-5 text-white">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">

              {showOtp ? (
                <FaShieldAlt />
              ) : (
                <FaSignInAlt />
              )}

            </div>

            <div>

              <h1 className="text-xl font-bold">

                {showOtp
                  ? "Email Verification"
                  : "Login"}

              </h1>

              <p className="mt-1 text-sm text-white/80">

                {showOtp
                  ? "Enter the OTP sent to your registered email"
                  : "Login to your account"}

              </p>

            </div>

          </div>

        </div>

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="rounded-b-2xl bg-white p-6 shadow-lg">

          {!showOtp ? (

            /* ==================================================
               LOGIN FORM
            ================================================== */

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* USER ID */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">

                  Registration Number or Mobile Number

                </label>

                <div className="relative">

                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="Enter registration number or mobile number"
                    autoComplete="username"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20 disabled:bg-gray-100"
                  />

                </div>

                <p className="mt-1.5 text-xs text-gray-500">

                  You can use either your registration number or registered mobile number.

                </p>

              </div>

              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">

                  Password

                </label>

                <div className="relative">

                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >

                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}

                  </button>

                </div>

              </div>

              {/* CAPTCHA */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">

                  CAPTCHA

                </label>

                <div className="flex items-center gap-3">

                  <div
                    className="flex h-12 flex-1 select-none items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-4 font-mono text-xl font-bold tracking-[0.3em] text-gray-700"
                    style={{
                      textDecoration:
                        "line-through",
                      textDecorationColor:
                        "#ab183d",
                      textDecorationThickness:
                        "1px",
                    }}
                  >
                    {captchaCode ||
                      "------"}
                  </div>

                  <button
                    type="button"
                    onClick={
                      refreshCaptcha
                    }
                    disabled={loading}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ab183d] text-white transition hover:bg-[#921532] disabled:opacity-50"
                    title="Refresh CAPTCHA"
                  >
                    <FaSyncAlt />
                  </button>

                </div>

                <input
                  type="text"
                  name="captcha"
                  value={
                    formData.captcha
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter CAPTCHA"
                  autoComplete="off"
                  maxLength={6}
                  disabled={loading}
                  className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm uppercase outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20 disabled:bg-gray-100"
                />

              </div>

              {/* FORGOT PASSWORD */}

              <div className="text-right">

                <Link
                  to="/forget-password"
                  className="text-sm font-semibold text-[#ab183d] hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* MESSAGE */}

              <MessageBox />

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ab183d] py-3 font-semibold text-white transition hover:bg-[#921532] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <FaSignInAlt />

                {loading
                  ? "Verifying..."
                  : "Login"}

              </button>

              {/* REGISTER */}

              <div className="border-t border-gray-200 pt-5 text-center">

                <p className="text-sm text-gray-500">

                  Don't have an account?{" "}

                  <Link
                    to="/apply-vacancy"
                    className="font-semibold text-[#ab183d] hover:underline"
                  >
                    Register Now
                  </Link>

                </p>

              </div>

            </form>

          ) : (

            /* ==================================================
               OTP FORM
            ================================================== */

            <form
              onSubmit={handleOtpSubmit}
              className="space-y-5"
            >

              {/* INFORMATION */}

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                <div className="flex gap-3">

                  <FaEnvelope className="mt-1 text-blue-600" />

                  <div>

                    <p className="text-sm font-semibold text-blue-800">

                      Verification code sent

                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">

                      A 6-digit verification code has been sent to your registered email address.

                    </p>

                  </div>

                </div>

              </div>

              {/* OTP */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">

                  Email OTP

                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => {

                    const value =
                      e.target.value
                        .replace(
                          /\D/g,
                          ""
                        )
                        .slice(
                          0,
                          6
                        );

                    setOtp(value);

                    if (error) {
                      setError("");
                    }

                    if (success) {
                      setSuccess("");
                    }

                  }}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  autoComplete="one-time-code"
                  disabled={
                    otpLoading
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-mono text-xl tracking-[0.4em] outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20 disabled:bg-gray-100"
                />

              </div>

              {/* MESSAGE */}

              <MessageBox />

              {/* VERIFY */}

              <button
                type="submit"
                disabled={
                  otpLoading ||
                  otp.length !== 6
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ab183d] py-3 font-semibold text-white transition hover:bg-[#921532] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <FaShieldAlt />

                {otpLoading
                  ? "Verifying OTP..."
                  : "Verify OTP & Login"}

              </button>

              {/* BACK */}

              <button
                type="button"
                onClick={
                  backToLogin
                }
                disabled={
                  otpLoading
                }
                className="w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
              >
                ← Back to Login
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}