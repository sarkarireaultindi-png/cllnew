
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaHome,
  FaReceipt,
  FaShieldAlt,
  FaArrowRight,
  FaDownload,
  FaPrint,
} from "react-icons/fa";
import jsPDF from "jspdf";

export default function PaymentSuccess() {
  const merchantOrderNo =
    localStorage.getItem("merchantOrderNo");

  const gatewayOrderNo =
    localStorage.getItem("gatewayOrderNo");

  const paymentAmount =
    localStorage.getItem("paymentAmount");

  /*
  |--------------------------------------------------------------------------
  | DOWNLOAD PAYMENT RECEIPT PDF
  |--------------------------------------------------------------------------
  */

  const downloadPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    /*
    |--------------------------------------------------------------------------
    | HEADER
    |--------------------------------------------------------------------------
    */

    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, pageWidth, 42, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    doc.text(
      "PAYMENT RECEIPT",
      pageWidth / 2,
      18,
      { align: "center" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      "Payment Confirmation",
      pageWidth / 2,
      28,
      { align: "center" }
    );

    /*
    |--------------------------------------------------------------------------
    | SUCCESS
    |--------------------------------------------------------------------------
    */

    doc.setTextColor(22, 163, 74);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);

    doc.text(
      "PAYMENT SUCCESSFUL",
      pageWidth / 2,
      62,
      { align: "center" }
    );

    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      "Your payment has been received successfully.",
      pageWidth / 2,
      71,
      { align: "center" }
    );

    /*
    |--------------------------------------------------------------------------
    | AMOUNT
    |--------------------------------------------------------------------------
    */

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(
      20,
      85,
      pageWidth - 40,
      32,
      4,
      4,
      "F"
    );

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(
      "AMOUNT PAID",
      pageWidth / 2,
      96,
      { align: "center" }
    );

    doc.setTextColor(22, 163, 74);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    doc.text(
      paymentAmount
        ? `INR ${paymentAmount}`
        : "INR 0",
      pageWidth / 2,
      108,
      { align: "center" }
    );

    /*
    |--------------------------------------------------------------------------
    | PAYMENT DETAILS
    |--------------------------------------------------------------------------
    */

    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);

    doc.text(
      "Transaction Details",
      20,
      135
    );

    doc.setDrawColor(220, 220, 220);

    doc.line(
      20,
      140,
      pageWidth - 20,
      140
    );

    const details = [
      [
        "Order Number",
        merchantOrderNo || "Not Available",
      ],
      [
        "Gateway Transaction ID",
        gatewayOrderNo || "Not Available",
      ],
      [
        "Amount",
        paymentAmount
          ? `INR ${paymentAmount}`
          : "Not Available",
      ],
      [
        "Currency",
        "INR",
      ],
      [
        "Payment Status",
        "Payment Successful",
      ],
    ];

    let y = 153;

    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);

      doc.text(label, 20, y);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);

      const maxWidth = pageWidth - 100;

      const valueLines = doc.splitTextToSize(
        String(value),
        maxWidth
      );

      doc.text(
        valueLines,
        pageWidth - 20,
        y,
        { align: "right" }
      );

      y +=
        Math.max(
          10,
          valueLines.length * 5
        ) + 4;

      doc.setDrawColor(235, 235, 235);

      doc.line(
        20,
        y - 4,
        pageWidth - 20,
        y - 4
      );
    });

    /*
    |--------------------------------------------------------------------------
    | SECURITY INFORMATION
    |--------------------------------------------------------------------------
    */

    y += 10;

    doc.setFillColor(248, 250, 252);

    doc.roundedRect(
      20,
      y,
      pageWidth - 40,
      30,
      4,
      4,
      "F"
    );

    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text(
      "Secure Payment",
      28,
      y + 10
    );

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);

    const securityText =
      "Your payment was processed through a secure payment gateway. " +
      "Please retain this receipt for future reference.";

    const securityLines =
      doc.splitTextToSize(
        securityText,
        pageWidth - 60
      );

    doc.text(
      securityLines,
      28,
      y + 18
    );

    /*
    |--------------------------------------------------------------------------
    | FOOTER
    |--------------------------------------------------------------------------
    */

    const footerY =
      doc.internal.pageSize.getHeight() - 20;

    doc.setDrawColor(220, 220, 220);

    doc.line(
      20,
      footerY - 8,
      pageWidth - 20,
      footerY - 8
    );

    doc.setTextColor(130, 130, 130);
    doc.setFontSize(8);

    doc.text(
      "Please keep this receipt for your records.",
      pageWidth / 2,
      footerY,
      { align: "center" }
    );

    /*
    |--------------------------------------------------------------------------
    | SAVE PDF
    |--------------------------------------------------------------------------
    */

    const fileName = merchantOrderNo
      ? `Payment-Receipt-${merchantOrderNo}.pdf`
      : "Payment-Receipt.pdf";

    doc.save(fileName);
  };

  /*
  |--------------------------------------------------------------------------
  | PRINT RECEIPT
  |--------------------------------------------------------------------------
  */

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] px-4 py-8 sm:py-12">

      <div className="mx-auto w-full max-w-[720px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          id="payment-receipt"
          className="overflow-hidden rounded-t-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-8 text-center text-white shadow-sm sm:px-8 sm:py-10"
        >

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">

            <FaCheckCircle className="text-5xl text-green-500" />

          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            Payment Successful
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/90 sm:text-base">
            Your payment has been received successfully.
          </p>

        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="rounded-b-2xl bg-white shadow-xl">

          <div className="p-5 sm:p-8">

            {/* SUCCESS MESSAGE */}

            <div className="rounded-xl border border-green-200 bg-green-50 p-5">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100">

                  <FaCheckCircle className="text-xl text-green-600" />

                </div>

                <div>

                  <h2 className="text-base font-bold text-green-800">
                    Transaction Completed
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-green-700">
                    Your payment transaction has been completed.
                    Please keep your order number for future
                    reference.
                  </p>

                </div>

              </div>

            </div>

            {/* RECEIPT TITLE */}

            <div className="mt-8 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">

                <FaReceipt className="text-green-600" />

              </div>

              <div>

                <h2 className="text-lg font-bold text-gray-900">
                  Payment Receipt
                </h2>

                <p className="text-xs text-gray-500">
                  Transaction details
                </p>

              </div>

            </div>

            {/* PAYMENT DETAILS */}

            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200">

              {/* AMOUNT */}

              <div className="border-b border-gray-200 bg-gray-50 px-5 py-5 text-center">

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Amount Paid
                </p>

                <p className="mt-2 text-3xl font-extrabold text-green-600 sm:text-4xl">

                  {paymentAmount
                    ? `₹${paymentAmount}`
                    : "₹0"}

                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-700">

                  <FaCheckCircle />

                  PAID

                </div>

              </div>

              {/* DETAILS */}

              <div className="divide-y divide-gray-200">

                <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                  <span className="text-sm text-gray-500">
                    Order Number
                  </span>

                  <span className="break-all text-sm font-semibold text-gray-900 sm:text-right">
                    {merchantOrderNo || "Not Available"}
                  </span>

                </div>

                <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                  <span className="text-sm text-gray-500">
                    Gateway Transaction ID
                  </span>

                  <span className="break-all text-sm font-semibold text-gray-900 sm:text-right">
                    {gatewayOrderNo || "Not Available"}
                  </span>

                </div>

                <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                  <span className="text-sm text-gray-500">
                    Amount
                  </span>

                  <span className="text-sm font-bold text-gray-900">
                    {paymentAmount
                      ? `₹${paymentAmount}`
                      : "Not Available"}
                  </span>

                </div>

                <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                  <span className="text-sm text-gray-500">
                    Currency
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    INR
                  </span>

                </div>

                <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                  <span className="text-sm text-gray-500">
                    Payment Status
                  </span>

                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">

                    <FaCheckCircle />

                    Payment Successful

                  </span>

                </div>

              </div>

            </div>

            {/* SECURITY */}

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">

              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">

                <FaShieldAlt className="text-green-600" />

              </div>

              <div>

                <h3 className="text-sm font-bold text-gray-800">
                  Secure Payment
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Your payment was processed through a secure
                  payment gateway. Please retain your transaction
                  details for future reference.
                </p>

              </div>

            </div>

            {/* IMPORTANT NOTE */}

            <div className="mt-5 rounded-xl bg-blue-50 px-4 py-4">

              <p className="text-center text-xs leading-5 text-blue-700 sm:text-sm">

                Please save your Order Number and Gateway
                Transaction ID for future reference.

              </p>

            </div>

            {/* =================================================
                DOWNLOAD / PRINT OPTIONS
            ================================================== */}

            <div className="mt-7">

              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                Receipt Options
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* DOWNLOAD PDF */}

                <button
                  type="button"
                  onClick={downloadPDF}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg active:scale-[0.98]"
                >

                  <FaDownload />

                  Download PDF

                </button>

                {/* PRINT */}

                <button
                  type="button"
                  onClick={printReceipt}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                >

                  <FaPrint />

                  Print Receipt

                </button>

              </div>

            </div>

            {/* HOME BUTTON */}

            <div className="mt-5 flex justify-center">

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >

                <FaHome />

                Go to Home

              </Link>

            </div>

          </div>

          {/* FOOTER */}

          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 text-center">

            <p className="text-xs text-gray-400">
              Payment confirmation • Please keep this receipt
              for your records.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          PRINT STYLES
      ====================================================== */}

      <style>
        {`
          @media print {

            body {
              background: white !important;
            }

            body * {
              visibility: hidden;
            }

            #payment-receipt,
            #payment-receipt * {
              visibility: visible;
            }

            #payment-receipt {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              box-shadow: none !important;
            }

            button,
            a {
              display: none !important;
            }

          }
        `}
      </style>

    </div>
  );
}
