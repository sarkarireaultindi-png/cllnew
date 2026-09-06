
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaHome,
  FaReceipt,
  FaShieldAlt,
  FaDownload,
  FaPrint,
  FaBuilding,
} from "react-icons/fa";
import jsPDF from "jspdf";

export default function PaymentSuccess() {
  const [payment, setPayment] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  /*
  |--------------------------------------------------------------------------
  | FETCH PAYMENT RECEIPT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchPaymentReceipt = async () => {
      try {
        if (!userId) {
          setError("User ID not found.");
          setLoading(false);
          return;
        }

        console.log(
          "Fetching payment receipt for:",
          userId
        );

        const response = await fetch(
          `https://cllnew.onrender.com/api/payment/receipt/${userId}`
        );

        const data = await response.json();

        console.log(
          "PAYMENT RECEIPT RESPONSE:",
          data
        );

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to fetch payment receipt."
          );
        }

        setPayment(data.payment);
        setApplicant(data.applicant);
      } catch (err) {
        console.error(
          "Payment receipt error:",
          err
        );

        setError(
          err.message ||
            "Unable to load payment receipt."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentReceipt();
  }, [userId]);

  /*
  |--------------------------------------------------------------------------
  | DOWNLOAD PDF
  |--------------------------------------------------------------------------
  */

  const downloadReceipt = () => {
    if (!payment || !applicant) {
      alert(
        "Payment receipt is still loading."
      );
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "CENTRAL COALFIELDS LIMITED",
      105,
      20,
      {
        align: "center",
      }
    );

    doc.setFontSize(14);

    doc.text(
      "Payment Receipt",
      105,
      32,
      {
        align: "center",
      }
    );

    doc.setFontSize(11);

    let y = 50;

    /*
    |--------------------------------------------------------------------------
    | APPLICANT DETAILS
    |--------------------------------------------------------------------------
    */

    doc.text(
      `Applicant Name: ${
        applicant.name || "-"
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Registration Number: ${
        applicant.registrationNumber || "-"
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Mobile: ${
        applicant.mobile || "-"
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Email: ${
        applicant.email || "-"
      }`,
      20,
      y
    );

    y += 12;

    /*
    |--------------------------------------------------------------------------
    | PAYMENT DETAILS
    |--------------------------------------------------------------------------
    */

    doc.text(
      `Payment Amount: Rs. ${
        Number(
          payment.amount || 0
        ).toFixed(2)
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Payment Status: ${
        payment.paymentStatus || "-"
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Merchant Order No: ${
        payment.merchantOrderNo || "-"
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Gateway Order No: ${
        payment.gatewayOrderNo || "-"
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Payment State: ${
        payment.payinState ?? "-"
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Payment Date: ${
        payment.updatedAt
          ? new Date(
              payment.updatedAt
            ).toLocaleString()
          : "-"
      }`,
      20,
      y
    );

    y += 20;

    doc.text(
      "This is a computer generated payment receipt.",
      20,
      y
    );

    doc.save(
      `Payment-Receipt-${
        applicant.registrationNumber ||
        "CCL"
      }.pdf`
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PRINT
  |--------------------------------------------------------------------------
  */

  const printReceipt = () => {
    window.print();
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow text-center">

          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-[#ab183d] mx-auto mb-4"></div>

          <p className="text-gray-600">
            Loading payment receipt...
          </p>

        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

          <div className="text-red-600 text-5xl mb-4">
            ✕
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Unable to Load Payment Receipt
          </h2>

          <p className="text-gray-600 mb-6">
            {error}
          </p>

          <Link
            to="/fee-details"
            className="inline-flex items-center gap-2 bg-[#ab183d] text-white px-6 py-3 rounded-lg hover:bg-[#8f1534]"
          >
            <FaHome />
            Go Home
          </Link>

        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PAYMENT RECEIPT
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <header className="bg-[#ab183d] text-white shadow-lg print:hidden">

        <div className="max-w-[1100px] mx-auto px-4 py-5">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <FaBuilding className="text-3xl" />

              <div>

                <h1 className="text-xl md:text-2xl font-bold">
                  CENTRAL COALFIELDS LIMITED
                </h1>

                <p className="text-sm text-white/80">
                  A Government of India Enterprise
                </p>

              </div>

            </div>

            <FaShieldAlt className="text-2xl" />

          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="max-w-[900px] mx-auto px-4 py-8">

        <div
          id="payment-receipt"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >

          {/* SUCCESS */}

          <div className="bg-green-50 border-b border-green-200 px-6 py-8 text-center">

            <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />

            <h2 className="text-2xl md:text-3xl font-bold text-green-700">
              Payment Successful
            </h2>

            <p className="text-gray-600 mt-2">
              Your payment has been successfully processed.
            </p>

          </div>

          {/* AMOUNT */}

          <div className="text-center py-7 border-b">

            <p className="text-sm text-gray-500 uppercase tracking-wide">
              Amount Paid
            </p>

            <p className="text-4xl font-bold text-[#ab183d] mt-2">
              ₹
              {Number(
                payment?.amount || 0
              ).toFixed(2)}
            </p>

            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              {payment?.paymentStatus || "Success"}
            </span>

          </div>

          {/* DETAILS */}

          <div className="p-6 md:p-8">

            {/* APPLICANT DETAILS */}

            <div className="flex items-center gap-3 mb-5">

              <FaReceipt className="text-[#ab183d] text-xl" />

              <h3 className="text-xl font-bold text-gray-800">
                Applicant Details
              </h3>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Detail
                label="Applicant Name"
                value={applicant?.name}
              />

              <Detail
                label="Registration Number"
                value={
                  applicant?.registrationNumber
                }
              />

              <Detail
                label="Mobile Number"
                value={applicant?.mobile}
              />

              <Detail
                label="Email"
                value={applicant?.email}
              />

            </div>

            {/* TRANSACTION DETAILS */}

            <div className="flex items-center gap-3 mt-8 mb-5">

              <FaReceipt className="text-[#ab183d] text-xl" />

              <h3 className="text-xl font-bold text-gray-800">
                Transaction Details
              </h3>

            </div>

            <div className="border rounded-xl overflow-hidden">

              <DetailRow
                label="Merchant Order Number"
                value={
                  payment?.merchantOrderNo
                }
              />

              <DetailRow
                label="Gateway Order Number"
                value={
                  payment?.gatewayOrderNo
                }
              />

              <DetailRow
                label="Amount"
                value={`₹${Number(
                  payment?.amount || 0
                ).toFixed(2)}`}
              />

              <DetailRow
                label="Payment Status"
                value={
                  payment?.paymentStatus
                }
                success
              />

              <DetailRow
                label="Payment State"
                value={
                  payment?.payinState
                }
              />

              <DetailRow
                label="Payment Date"
                value={
                  payment?.updatedAt
                    ? new Date(
                        payment.updatedAt
                      ).toLocaleString()
                    : "-"
                }
              />

            </div>

            {/* SECURE MESSAGE */}

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">

              <FaShieldAlt className="text-blue-600 text-xl mt-1 flex-shrink-0" />

              <div>

                <p className="font-semibold text-blue-800">
                  Secure Payment
                </p>

                <p className="text-sm text-blue-700 mt-1">
                  Your payment information has been securely
                  recorded in our database.
                </p>

              </div>

            </div>

            {/* IMPORTANT */}

            <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

              <p className="font-semibold text-yellow-800">
                Important
              </p>

              <p className="text-sm text-yellow-700 mt-1">
                Please save this payment receipt for your
                future reference.
              </p>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8 print:hidden">

              <button
                onClick={downloadReceipt}
                className="flex-1 flex items-center justify-center gap-2 bg-[#ab183d] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#8f1534] transition"
              >
                <FaDownload />
                Download PDF
              </button>

              <button
                onClick={printReceipt}
                className="flex-1 flex items-center justify-center gap-2 border border-[#ab183d] text-[#ab183d] px-5 py-3 rounded-lg font-semibold hover:bg-[#ab183d] hover:text-white transition"
              >
                <FaPrint />
                Print Receipt
              </button>

            </div>

            {/* HOME */}

            <div className="mt-4 print:hidden">

              <Link
                to="/"
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
              >
                <FaHome />
                Go Home
              </Link>

            </div>

          </div>

        </div>

      </main>

      {/* PRINT CSS */}

      <style>
        {`
          @media print {

            body {
              background: white !important;
            }

            #payment-receipt {
              box-shadow: none !important;
              border-radius: 0 !important;
            }

            .print\\:hidden {
              display: none !important;
            }

          }
        `}
      </style>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| DETAIL COMPONENT
|--------------------------------------------------------------------------
*/

function Detail({ label, value }) {
  return (
    <div className="bg-gray-50 border rounded-lg p-4">

      <p className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </p>

      <p className="font-semibold text-gray-800 mt-1 break-words">
        {value || "-"}
      </p>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| DETAIL ROW
|--------------------------------------------------------------------------
*/

function DetailRow({
  label,
  value,
  success = false,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 border-b last:border-b-0">

      <span className="text-gray-500 text-sm">
        {label}
      </span>

      <span
        className={`font-semibold text-sm break-all ${
          success
            ? "text-green-600"
            : "text-gray-800"
        }`}
      >
        {value || "-"}
      </span>

    </div>
  );
}
