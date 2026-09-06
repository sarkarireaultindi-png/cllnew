import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

export default function FeeDetails() {
  const location = useLocation();

  /*
  |--------------------------------------------------------------------------
  | USER ID
  |--------------------------------------------------------------------------
  */

  const userId =
    location.state?.userId ||
    localStorage.getItem("userId");

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(null);

  const [paymentStatus, setPaymentStatus] =
    useState("Pending");

  const [loading, setLoading] = useState(true);

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [declaration, setDeclaration] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | FETCH FEE DETAILS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchFeeDetails = async () => {
      /*
      |--------------------------------------------------------------------------
      | USER ID CHECK
      |--------------------------------------------------------------------------
      */

      if (!userId) {
        setError(
          "User registration information not found. Please login again."
        );

        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        /*
        |--------------------------------------------------------------------------
        | API
        |--------------------------------------------------------------------------
        */

        const response = await fetch(
          `https://cllnew.onrender.com/api/fee-details/${userId}`
        );

        let data = {};

        try {
          data = await response.json();
        } catch {
          throw new Error(
            "Invalid response received from server."
          );
        }

        /*
        |--------------------------------------------------------------------------
        | API ERROR
        |--------------------------------------------------------------------------
        */

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch fee details."
          );
        }

        /*
        |--------------------------------------------------------------------------
        | FEE DETAILS
        |--------------------------------------------------------------------------
        */

        const feeDetails = data.feeDetails;

        if (!feeDetails) {
          throw new Error(
            "Fee details were not found."
          );
        }

        /*
        |--------------------------------------------------------------------------
        | CATEGORY
        |--------------------------------------------------------------------------
        */

        const userCategory =
          feeDetails.category || "";

        /*
        |--------------------------------------------------------------------------
        | CALCULATE FEE
        |
        | UR / EWS / OBC = ₹400
        | SC / ST       = ₹250
        |--------------------------------------------------------------------------
        */

        let calculatedAmount = null;

        if (
          userCategory === "UR" ||
          userCategory === "EWS" ||
          userCategory === "OBC"
        ) {
          calculatedAmount = 400;
        } else if (
          userCategory === "SC" ||
          userCategory === "ST"
        ) {
          calculatedAmount = 250;
        }

        /*
        |--------------------------------------------------------------------------
        | SET DATA
        |--------------------------------------------------------------------------
        */

        setCategory(userCategory);

        setAmount(calculatedAmount);

        setPaymentStatus(
          feeDetails.paymentStatus ||
            "Pending"
        );

        /*
        |--------------------------------------------------------------------------
        | SAVE USER ID
        |--------------------------------------------------------------------------
        */

        localStorage.setItem(
          "userId",
          userId
        );
      } catch (error) {
        console.error(
          "Fee details error:",
          error
        );

        setError(
          error.message ||
            "Unable to load fee details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeeDetails();
  }, [userId]);

  /*
  |--------------------------------------------------------------------------
  | PROCEED TO PAYMENT
  |--------------------------------------------------------------------------
  */

  const handlePayment = async () => {
    /*
    |--------------------------------------------------------------------------
    | DECLARATION CHECK
    |--------------------------------------------------------------------------
    */

    if (!declaration) {
      setError(
        "Please accept the declaration before proceeding to payment."
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | USER ID CHECK
    |--------------------------------------------------------------------------
    */

    if (!userId) {
      setError(
        "User registration information not found."
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | FEE CHECK
    |--------------------------------------------------------------------------
    */

    if (!category || amount === null) {
      setError(
        "Fee details are not available."
      );

      return;
    }

    try {
      setPaymentLoading(true);
      setError("");
      setPaymentStatus(
        "Creating Payment..."
      );

      /*
      |--------------------------------------------------------------------------
      | UNIQUE ORDER NUMBER
      |--------------------------------------------------------------------------
      */

      const merchantOrderNo =
        `ORD-${Date.now()}`;

      /*
      |--------------------------------------------------------------------------
      | CREATE PAYMENT
      |--------------------------------------------------------------------------
      */

      const response = await fetch(
        "https://cllnew.onrender.com/api/payment/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId,
            merchantOrderNo,

            /*
             * Amount is calculated from
             * applicant category.
             */
            amount: Number(amount),
          }),
        }
      );

      /*
      |--------------------------------------------------------------------------
      | RESPONSE
      |--------------------------------------------------------------------------
      */

      let data = {};

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Invalid response received from payment server."
        );
      }

      console.log(
        "Payment API Response:",
        data
      );

      /*
      |--------------------------------------------------------------------------
      | HTTP ERROR
      |--------------------------------------------------------------------------
      */

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.msg ||
            "Unable to create payment."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | BLADEPAY RESPONSE CHECK
      |--------------------------------------------------------------------------
      */

      if (
        data.code !== 0 ||
        !data.data?.cashierUrl
      ) {
        throw new Error(
          data.msg ||
            "Payment URL was not returned."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | PAYMENT DATA
      |--------------------------------------------------------------------------
      */

      const paymentData = data.data;

      /*
      |--------------------------------------------------------------------------
      | SAVE ORDER INFORMATION
      |--------------------------------------------------------------------------
      */

      localStorage.setItem(
        "merchantOrderNo",
        paymentData.merchantOrderNo
      );

      localStorage.setItem(
        "gatewayOrderNo",
        paymentData.gatewayOrderNo
      );

      localStorage.setItem(
        "paymentAmount",
        String(paymentData.amount)
      );

      /*
      |--------------------------------------------------------------------------
      | REDIRECT
      |--------------------------------------------------------------------------
      */

      setPaymentStatus(
        "Redirecting to Payment..."
      );

      window.location.href =
        paymentData.cashierUrl;
    } catch (error) {
      console.error(
        "Payment creation error:",
        error
      );

      setPaymentStatus("Pending");

      setError(
        error.message ||
          "Unable to create payment. Please try again."
      );

      setPaymentLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="mx-auto w-full max-w-[900px]">
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <div className="text-lg font-semibold text-gray-700">
              Loading fee details...
            </div>

            <div className="mt-3 text-sm text-gray-500">
              Please wait while we calculate your
              application fee.
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto w-full max-w-[900px]">

        {/* Header */}

        <div className="rounded-t-2xl bg-[#ab183d] px-6 py-5 text-white">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <FaMoneyBillWave />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Fee Details
              </h1>

              <p className="mt-1 text-sm text-white/80">
                Application fee details
              </p>
            </div>

          </div>
        </div>

        {/* Main Content */}

        <div className="rounded-b-2xl bg-white p-6 shadow-lg">

          {/* Application Steps */}

          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">

            {/* Step 1 */}

            <Link
              to="/user-profile"
              state={{ userId }}
              className="rounded-lg bg-green-600 px-3 py-3 text-center text-white shadow-sm transition hover:bg-green-700"
            >
              <div className="text-sm font-bold">
                Step 1
              </div>

              <div className="mt-1 text-xs">
                Personal
              </div>
            </Link>

            {/* Step 2 */}

            <Link
              to="/qualification-details"
              state={{ userId }}
              className="rounded-lg bg-green-600 px-3 py-3 text-center text-white shadow-sm transition hover:bg-green-700"
            >
              <div className="text-sm font-bold">
                Step 2
              </div>

              <div className="mt-1 text-xs">
                Qualification
              </div>
            </Link>

            {/* Step 3 */}

            <Link
              to="/documents-upload"
              state={{ userId }}
              className="rounded-lg bg-green-600 px-3 py-3 text-center text-white shadow-sm transition hover:bg-green-700"
            >
              <div className="text-sm font-bold">
                Step 3
              </div>

              <div className="mt-1 text-xs">
                Documents
              </div>
            </Link>

            {/* Step 4 */}

            <div className="rounded-lg bg-[#ab183d] px-3 py-3 text-center text-white shadow-sm">
              <div className="text-sm font-bold">
                Step 4
              </div>

              <div className="mt-1 text-xs">
                Fee Details
              </div>
            </div>

          </div>

          {/* Error */}

          {error && (
            <div className="mb-6 rounded-lg border-2 border-red-300 bg-red-50 px-4 py-4 text-sm font-semibold text-red-700">
              <div className="flex items-start gap-3">

                <span className="text-lg font-bold">
                  ✕
                </span>

                <span>
                  {error}
                </span>

              </div>
            </div>
          )}

          {/* Fee Details */}

          <div className="overflow-hidden rounded-xl border border-gray-300">

            {/* Section Header */}

            <div className="bg-gray-100 px-5 py-4">
              <h2 className="text-lg font-bold text-gray-800">
                Application Fee
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Your fee has been calculated according
                to your category.
              </p>
            </div>

            {/* Category & Amount */}

            <div className="border-b border-gray-200 bg-white px-5 py-5">

              <div className="grid gap-4 sm:grid-cols-2">

                {/* Category */}

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

                  <div className="text-xs font-semibold uppercase text-gray-500">
                    Your Category
                  </div>

                  <div className="mt-1 text-xl font-bold text-[#ab183d]">
                    {category === "UR" ||
                    category === "EWS" ||
                    category === "OBC"
                      ? "UR / EWS / OBC"
                      : category === "SC" ||
                        category === "ST"
                      ? "SC / ST"
                      : category || "Not Available"}
                  </div>

                </div>

                {/* Payable Amount */}

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

                  <div className="text-xs font-semibold uppercase text-gray-500">
                    Payable Amount
                  </div>

                  <div className="mt-1 text-xl font-bold text-[#ab183d]">
                    {amount !== null
                      ? `₹${amount}`
                      : "₹0"}
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Fee Calculated Successfully */}

          {category && amount !== null && (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FaCheckCircle />
                </div>

                <div>

                  <h3 className="font-bold text-green-800">
                    Fee Calculated Successfully
                  </h3>

                  <p className="mt-1 text-sm text-green-700">
                    Your category is{" "}
                    <strong>{category}</strong>{" "}
                    and your application fee is{" "}
                    <strong>₹{amount}</strong>.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* Declaration */}

          <div className="mt-6 rounded-xl border border-gray-300 bg-gray-50 p-5">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaCheckCircle />
              </div>

              <h2 className="text-lg font-bold text-gray-800">
                Declaration
              </h2>

            </div>

            <label className="flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                checked={declaration}
                onChange={(e) => {
                  setDeclaration(
                    e.target.checked
                  );

                  if (e.target.checked) {
                    setError("");
                  }
                }}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-[#ab183d] focus:ring-[#ab183d]"
              />

              <span className="text-sm leading-6 text-gray-700">
                I hereby declare that all the statements
                and information furnished by me in this
                application form are true, complete, and
                correct to the best of my knowledge and
                belief. I understand that if any information
                or statement furnished by me is found to be
                false, incorrect, incomplete, or misleading
                at any stage, my candidature may be cancelled
                and I may be liable for such action as per
                the applicable rules. I further declare that
                I have read and understood all the instructions
                and eligibility conditions and agree to abide
                by them.
              </span>

            </label>

            {!declaration && (
              <p className="mt-3 text-sm font-medium text-red-600">
                Please accept the declaration before
                proceeding to payment.
              </p>
            )}

          </div>

          {/* Navigation */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">

            {/* Back */}

            <Link
              to="/documents-upload"
              state={{ userId }}
              className="rounded-lg border border-gray-300 bg-white px-7 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              ← Back
            </Link>

            {/* Payment */}

            <button
              type="button"
              disabled={
                paymentLoading ||
                !declaration ||
                !category ||
                amount === null
              }
              onClick={handlePayment}
              className={`flex items-center justify-center gap-2 rounded-lg px-7 py-3 text-center font-semibold text-white transition ${
                paymentLoading ||
                !declaration ||
                !category ||
                amount === null
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#ab183d] hover:bg-[#921532]"
              }`}
            >
              {paymentLoading
                ? "Creating Payment..."
                : "Proceed to Payment →"}
            </button>

          </div>

          {/* Payment Status */}

          <div className="mt-4 text-center text-xs text-gray-500">
            Payment Status:{" "}
            <span className="font-semibold">
              {paymentStatus}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}