import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /*
  |--------------------------------------------------------------------------
  | LOGIN
  |--------------------------------------------------------------------------
  */
const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (!formData.username.trim()) {
    setError("Please enter your username.");
    return;
  }

  if (!formData.password) {
    setError("Please enter your password.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "https://cllnew.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
        }),
      }
    );

    const data = await response.json();



    if (!response.ok || !data.success) {
      setError(
        data.message || "Invalid username or password."
      );
      return;
    }

    // Make absolutely sure the backend returned a token
    if (!data.token) {
      console.error(
        "LOGIN SUCCESS BUT NO TOKEN WAS RETURNED"
      );

      setError(
        "Login succeeded but no authentication token was received."
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | SAVE ADMIN SESSION
    |--------------------------------------------------------------------------
    */

    localStorage.setItem(
      "adminToken",
      data.token
    );

    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );

    if (data.admin?.username) {
      localStorage.setItem(
        "adminUsername",
        data.admin.username
      );
    } else {
      localStorage.setItem(
        "adminUsername",
        formData.username.trim()
      );
    }

    /*
    |--------------------------------------------------------------------------
    | VERIFY TOKEN WAS SAVED
    |--------------------------------------------------------------------------
    */

    const savedToken =
      localStorage.getItem("adminToken");

    console.log(
      "TOKEN SAVED IN LOCALSTORAGE:",
      savedToken
    );

    if (!savedToken) {
      setError(
        "Unable to save admin session."
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    console.log(
      "Redirecting to admin dashboard..."
    );

    navigate("/admin/dashboard", {
      replace: true,
    });

  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    setError(
      error.message ||
        "Unable to login. Please try again."
    );

  } finally {
    setLoading(false);
  }
};

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#ab183d]/10 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#ab183d]/10 blur-3xl" />
      </div>

      {/* Main */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">

        <div className="w-full max-w-[1050px] overflow-hidden rounded-2xl bg-white shadow-2xl">

          <div className="grid md:grid-cols-2">

            {/* =========================================================
                LEFT PANEL
            ========================================================= */}

            <div className="hidden bg-[#ab183d] p-10 text-white md:flex md:flex-col md:justify-between">

              <div>

                {/* Logo */}
                <div className="flex items-center gap-3">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#ab183d] shadow-lg">
                    <FaShieldAlt className="text-2xl" />
                  </div>

                  <div>
                    <h1 className="text-xl font-bold">
                      CCL
                    </h1>

                    <p className="text-sm text-white/80">
                      Administration Portal
                    </p>
                  </div>

                </div>

                {/* Content */}
                <div className="mt-20">

                  <h2 className="text-4xl font-bold leading-tight">
                    Welcome to the
                    <br />
                    CCL Admin Portal
                  </h2>

                  <p className="mt-6 max-w-md text-sm leading-7 text-white/80">
                    Secure administration portal for managing
                    applications, users, documents and
                    other administrative operations.
                  </p>

                </div>

              </div>

              {/* Features */}
              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-300" />

                  <span className="text-sm">
                    Secure administrator access
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-300" />

                  <span className="text-sm">
                    Application management
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-300" />

                  <span className="text-sm">
                    Protected administrative dashboard
                  </span>
                </div>

              </div>

            </div>

            {/* =========================================================
                RIGHT LOGIN PANEL
            ========================================================= */}

            <div className="p-6 sm:p-10 md:p-12">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 md:hidden">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ab183d] text-white">
                  <FaShieldAlt />
                </div>

                <div>
                  <h1 className="font-bold text-gray-900">
                    CCL
                  </h1>

                  <p className="text-xs text-gray-500">
                    Administration Portal
                  </p>
                </div>

              </div>

              {/* Heading */}

              <div className="mb-8">

                <p className="text-sm font-semibold uppercase tracking-wider text-[#ab183d]">
                  Administrator Login
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Sign in to your account
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Enter your administrator credentials
                  to continue.
                </p>

              </div>

              {/* Error */}

              {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">

                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>

                </div>
              )}

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Username */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Username / Email
                  </label>

                  <div className="relative">

                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter username or email"
                      autoComplete="username"
                      className="w-full rounded-lg border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <div className="relative">

                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-lg border border-gray-300 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-800 outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#ab183d]"
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                {/* Remember + Forgot */}

                <div className="flex items-center justify-between">

                  <label className="flex cursor-pointer items-center gap-2">

                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 text-[#ab183d] focus:ring-[#ab183d]"
                    />

                    <span className="text-sm text-gray-600">
                      Remember me
                    </span>

                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-[#ab183d] hover:underline"
                  >
                    Forgot password?
                  </button>

                </div>

                {/* Login Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#ab183d] px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#921532] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In

                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}

                </button>

              </form>

              {/* Security */}

              <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">

                <div className="flex items-start gap-3">

                  <FaShieldAlt className="mt-0.5 text-[#ab183d]" />

                  <div>

                    <p className="text-xs font-bold text-gray-700">
                      Secure Access
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      This portal is restricted to
                      authorized CCL administrators.
                      Unauthorized access is prohibited.
                    </p>

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="mt-8 text-center">

                <p className="text-xs text-gray-400">
                  © {new Date().getFullYear()} CCL.
                  All rights reserved.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;