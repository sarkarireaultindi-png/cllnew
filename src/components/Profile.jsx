import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaLock,
  FaSignOutAlt,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // --------------------------------------------------
  // USER DETAILS
  // --------------------------------------------------

  const [userDetails, setUserDetails] = useState({
    name: "",
    dob: "",
  });

  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState("");

  // --------------------------------------------------
  // PASSWORD STATES
  // --------------------------------------------------

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------------------------
  // FETCH USER DETAILS
  // --------------------------------------------------

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        setLoadingUser(false);
        return;
      }

      try {
        setLoadingUser(true);
        setUserError("");

        const response = await fetch(
          `https://cllnew.onrender.com/api/personal-details/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch user details."
          );
        }

        /*
        |--------------------------------------------------------------------------
        | HANDLE DIFFERENT API RESPONSE STRUCTURES
        |--------------------------------------------------------------------------
        */

        const personalDetails =
          data.personalDetails ||
          data.personal ||
          data.user ||
          data.data ||
          data;

        setUserDetails({
          name:
            personalDetails?.name ||
            personalDetails?.fullName ||
            "",

          dob:
            personalDetails?.dob ||
            personalDetails?.dateOfBirth ||
            "",
        });
      } catch (err) {
        console.error(
          "Fetch user details error:",
          err
        );

        setUserError(
          err.message ||
            "Unable to load user details."
        );
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // --------------------------------------------------
  // FORMAT DOB
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) {
      return "Not Available";
    }

    try {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return date;
      }

      return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem("userId");

    navigate("/");
  };

  // --------------------------------------------------
  // CHANGE PASSWORD
  // --------------------------------------------------

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!userId) {
      setError(
        "Your login session has expired. Please login again."
      );

      return;
    }

    if (!currentPassword) {
      setError(
        "Please enter your current password."
      );

      return;
    }

    if (!newPassword) {
      setError(
        "Please enter your new password."
      );

      return;
    }

    if (newPassword.length < 8) {
      setError(
        "New password must be at least 8 characters."
      );

      return;
    }

    if (!confirmPassword) {
      setError(
        "Please confirm your new password."
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirm password do not match."
      );

      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );

      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "https://cllnew.onrender.com/api/auth/change-password",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId,
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to change password."
        );
      }

      setSuccess(
        "✓ Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(
        "Change password error:",
        err
      );

      setError(
        err.message ||
          "Unable to change password."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // NO USER
  // --------------------------------------------------

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-[700px] rounded-xl bg-white p-8 text-center shadow-lg">

          <FaUserCircle className="mx-auto mb-4 text-6xl text-gray-400" />

          <h1 className="text-xl font-bold text-gray-800">
            Login Required
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Please login to access your profile.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 rounded-lg bg-[#ab183d] px-7 py-3 font-semibold text-white transition hover:bg-[#921532]"
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto w-full max-w-[900px]">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="rounded-t-2xl bg-[#ab183d] px-6 py-6 text-white">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
              <FaUserCircle className="text-3xl" />
            </div>

            <div>

              <h1 className="text-xl font-bold">
                My Profile
              </h1>

              <p className="mt-1 text-sm text-white/80">
                Manage your account and password
              </p>

            </div>

          </div>

        </div>

        {/* ==================================================
            MAIN
        ================================================== */}

        <div className="rounded-b-2xl bg-white p-6 shadow-lg">

          {/* ==================================================
              ACCOUNT INFORMATION
          ================================================== */}

          <div className="overflow-hidden rounded-xl border border-gray-300">

            <div className="bg-gray-100 px-5 py-4">

              <h2 className="text-lg font-bold text-gray-800">
                Account Information
              </h2>

            </div>

            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">

              {/* USER ID */}

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

                <div className="flex items-center gap-2">

                  <FaIdCard className="text-[#ab183d]" />

                  <p className="text-xs font-semibold uppercase text-gray-500">
                    User ID
                  </p>

                </div>

                <p className="mt-2 break-all text-sm font-semibold text-gray-800">
                  {userId}
                </p>

              </div>

              {/* NAME */}

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

                <div className="flex items-center gap-2">

                  <FaUserCircle className="text-[#ab183d]" />

                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Name
                  </p>

                </div>

                <p className="mt-2 text-sm font-semibold text-gray-800">

                  {loadingUser
                    ? "Loading..."
                    : userDetails.name ||
                      "Not Available"}

                </p>

              </div>

              {/* DATE OF BIRTH */}

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

                <div className="flex items-center gap-2">

                  <FaCalendarAlt className="text-[#ab183d]" />

                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Date of Birth
                  </p>

                </div>

                <p className="mt-2 text-sm font-semibold text-gray-800">

                  {loadingUser
                    ? "Loading..."
                    : formatDate(
                        userDetails.dob
                      )}

                </p>

              </div>

            </div>

            {/* USER FETCH ERROR */}

            {userError && (
              <div className="mx-5 mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                ✕ {userError}
              </div>
            )}

          </div>

          {/* ==================================================
              CHANGE PASSWORD
          ================================================== */}

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-300">

            <div className="bg-gray-100 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ab183d]/10 text-[#ab183d]">
                  <FaLock />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-gray-800">
                    Change Password
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Update your account password
                  </p>

                </div>

              </div>

            </div>

            <form
              onSubmit={handleChangePassword}
              className="space-y-5 p-5"
            >

              {/* ERROR */}

              {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  ✕ {error}
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  ✓ {success}
                </div>
              )}

              {/* CURRENT PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Current Password
                  <span className="ml-1 text-red-600">
                    *
                  </span>
                </label>

                <div className="relative">

                  <input
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter current password"
                    autoComplete="current-password"
                    disabled={saving}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        !showCurrentPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ab183d]"
                  >
                    {showCurrentPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              {/* NEW PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  New Password
                  <span className="ml-1 text-red-600">
                    *
                  </span>
                </label>

                <div className="relative">

                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    disabled={saving}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        !showNewPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ab183d]"
                  >
                    {showNewPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Password must contain at least 8 characters.
                </p>

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm New Password
                  <span className="ml-1 text-red-600">
                    *
                  </span>
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    disabled={saving}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ab183d]"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              {/* CHANGE PASSWORD BUTTON */}

              <div className="border-t border-gray-200 pt-5">

                <button
                  type="submit"
                  disabled={saving}
                  className={`rounded-lg px-7 py-3 font-semibold text-white transition ${
                    saving
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-[#ab183d] hover:bg-[#921532]"
                  }`}
                >
                  {saving
                    ? "Changing Password..."
                    : "Change Password"}
                </button>

              </div>

            </form>

          </div>

          {/* ==================================================
              LOGOUT
          ================================================== */}

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="font-bold text-red-700">
                  Logout
                </h2>

                <p className="mt-1 text-sm text-red-600">
                  Logout from your current account.
                </p>

              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}