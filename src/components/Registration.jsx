import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaMobileAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function UserDetailsForm() {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    dob: "",
    mobile: "",
    email: "",
  });
const navigate = useNavigate();

const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  // Name validation
  if (!formData.name.trim()) {
    setError("Please enter your name.");
    return;
  }

  // Aadhaar validation
  const aadhaar = formData.aadhaar.replace(/\s/g, "");

  if (!/^\d{12}$/.test(aadhaar)) {
    setError("Please enter a valid 12-digit Aadhaar number.");
    return;
  }

  // DOB validation
  if (!formData.dob) {
    setError("Please select your date of birth.");
    return;
  }

  // Mobile validation
  if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
    setError("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    setError("Please enter a valid email address.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "https://cllnew.onrender.com/api/users/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          aadhaar,
          dob: formData.dob,
          mobile: formData.mobile,
          email: formData.email.trim().toLowerCase(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(
        data.message ||
          "Registration failed. Please try again."
      );

      return;
    }

    if (data.success) {

      setSuccess(
        `Registration successful. Your Registration Number is ${data.registrationNumber}. Login details have been sent to your email.`
      );

      // Redirect after 2.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }

  } catch (error) {

    console.error(
      "Registration error:",
      error
    );

    setError(
      "Unable to connect to server. Please try again."
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto max-w-[600px]">

        {/* Header */}
        <div className="rounded-t-2xl bg-[#ab183d] px-6 py-5 text-white">
          <h1 className="text-xl font-bold">
            Registration Details
          </h1> 

          <p className="mt-1 text-sm text-white/80">
            Please enter your details
          </p>
        </div>

        {/* Form */}
        <div className="rounded-b-2xl bg-white p-6 shadow-lg">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20"
                />
              </div>
            </div>

            {/* Aadhaar */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Aadhaar Number
              </label>

              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 12);

                    setFormData((prev) => ({
                      ...prev,
                      aadhaar: value,
                    }));

                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Enter 12-digit Aadhaar number"
                  inputMode="numeric"
                  maxLength={12}
                  autoComplete="off"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm font-mono outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Date of Birth
              </label>

              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Mobile Number
              </label>

              <div className="relative">
                <FaMobileAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                    setFormData((prev) => ({
                      ...prev,
                      mobile: value,
                    }));

                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Enter 10-digit mobile number"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Submit */}
           <button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-[#ab183d] py-3 font-semibold text-white transition hover:bg-[#921532] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Creating Registration..." : "Submit Details"}
</button>
            <div className="text-center">
  <p className="text-sm text-gray-500">
    Already have an account?{" "}
    <Link
      to="/login"
      className="font-semibold text-[#ab183d] hover:underline"
    >
      Login
    </Link>
  </p>
</div>

          </form>

        </div>
      </div>

    </div>
  );
}