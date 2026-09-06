
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaFileContract,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
} from "react-icons/fa";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] px-4 py-8 sm:py-12">

      {/* FULL WIDTH PAGE - NO SIDEBAR */}

      <main className="mx-auto w-full max-w-[900px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="overflow-hidden rounded-t-2xl bg-gradient-to-r from-[#ab183d] to-[#c41f4b] px-5 py-8 text-white shadow-sm sm:px-8">

          <div className="flex flex-col items-center text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
              <FaFileContract className="text-3xl text-[#ab183d]" />
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              Refund & Cancellation Policy
            </h1>

            <p className="mt-2 text-sm text-white/90 sm:text-base">
              Central Coalfields Limited
            </p>

            <p className="mt-1 text-xs text-white/80 sm:text-sm">
              A Government of India Enterprise
            </p>

          </div>

        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="rounded-b-2xl bg-white shadow-xl">

          <div className="p-5 sm:p-8">

            {/* IMPORTANT NOTICE */}

            <div className="rounded-xl border border-red-200 bg-red-50 p-5">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <FaExclamationTriangle className="text-xl text-red-600" />
                </div>

                <div>

                  <h2 className="text-base font-bold text-red-800">
                    Important Notice
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-red-700">
                    The application/examination fee paid for an online
                    examination or application form is{" "}
                    <strong>strictly non-refundable</strong> once the
                    payment has been successfully completed.
                  </p>

                </div>

              </div>

            </div>

            {/* SECTION 1 */}

            <section className="mt-8">

              <h2 className="text-lg font-bold text-gray-900">
                1. Non-Refundable Application Fee
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                The application/examination fee paid for submission of an
                online application form for Central Coalfields Limited
                (CCL) is strictly non-refundable.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Once the payment has been successfully completed and the
                application fee has been received by CCL, the amount will
                not be refunded under normal circumstances.
              </p>

            </section>

            {/* SECTION 2 */}

            <section className="mt-8">

              <h2 className="text-lg font-bold text-gray-900">
                2. No Cancellation of Application Fee
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Applicants are advised to carefully verify all information
                entered in the application form before making payment.
              </p>

              <div className="mt-4 space-y-3">

                {[
                  "The application fee cannot be cancelled after successful payment.",
                  "The application fee cannot be transferred to another applicant or application.",
                  "The application fee cannot be adjusted against any future examination, recruitment, or application.",
                  "No refund will be provided if the applicant subsequently decides not to appear for the examination.",
                  "No refund will be provided if the applicant is found ineligible after submission of the application.",
                  "No refund will be provided due to incorrect, incomplete, or inaccurate information submitted by the applicant.",
                  "No refund will be provided if the application is rejected, cancelled, or not considered due to the applicant's failure to satisfy the prescribed eligibility criteria or application requirements.",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg bg-gray-50 p-3"
                  >

                    <FaCheckCircle className="mt-1 shrink-0 text-[#ab183d]" />

                    <p className="text-sm leading-6 text-gray-600">
                      {item}
                    </p>

                  </div>
                ))}

              </div>

            </section>

            {/* SECTION 3 */}

            <section className="mt-8">

              <h2 className="text-lg font-bold text-gray-900">
                3. Duplicate or Failed Transactions
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                In case an amount is debited more than once for the same
                application due to a technical or payment gateway issue,
                the duplicate transaction may be reviewed and refunded
                after verification of the transaction records.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                If the applicant's bank account is debited but the payment
                status remains unsuccessful or the payment is not received
                by CCL, the transaction may be verified with the payment
                gateway and appropriate action may be taken after
                reconciliation.
              </p>

            </section>

            {/* SECTION 4 */}

            <section className="mt-8">

              <h2 className="text-lg font-bold text-gray-900">
                4. Payment Gateway Charges
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Any charges, fees, or deductions levied by the applicant's
                bank, card issuer, payment service provider, or payment
                gateway, where applicable, shall not be the responsibility
                of Central Coalfields Limited unless otherwise required
                under applicable law.
              </p>

            </section>

            {/* SECTION 5 */}

            <section className="mt-8">

              <h2 className="text-lg font-bold text-gray-900">
                5. Applicant's Responsibility
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Applicants are advised to carefully verify their
                application details before making payment.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                {[
                  "Check eligibility before submitting the application.",
                  "Verify all application details before payment.",
                  "Ensure that the correct application fee is being paid.",
                  "Avoid making multiple payments for the same application.",
                  "Keep the payment receipt and transaction details safely.",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >

                    <div className="flex items-start gap-3">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ab183d]/10 text-xs font-bold text-[#ab183d]">
                        {index + 1}
                      </span>

                      <p className="text-sm leading-6 text-gray-600">
                        {item}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </section>

            {/* SECTION 6 */}

            <section className="mt-8">

              <h2 className="text-lg font-bold text-gray-900">
                6. Acceptance of Policy
              </h2>

              <div className="mt-4 rounded-xl border border-[#ab183d]/20 bg-[#ab183d]/5 p-5">

                <p className="text-sm leading-7 text-gray-700">
                  By proceeding with the payment, the applicant confirms
                  that they have read, understood, and accepted this{" "}
                  <strong>Refund & Cancellation Policy</strong> and
                  acknowledge that the application/examination fee is{" "}
                  <strong>non-refundable</strong>, subject to the
                  exceptions stated in this policy.
                </p>

              </div>

            </section>

            {/* SECTION 7 */}

            <section className="mt-8">

              <h2 className="text-lg font-bold text-gray-900">
                7. Payment-Related Issues
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                For payment-related discrepancies, applicants should keep
                their payment receipt, order number, and gateway
                transaction ID safely and contact the designated CCL
                support/helpdesk through the official communication
                channels provided on the recruitment/application portal.
              </p>

            </section>

            {/* FINAL NOTICE */}

            <div className="mt-8 flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <FaShieldAlt className="text-xl text-[#ab183d]" />
              </div>

              <div>

                <h3 className="text-sm font-bold text-gray-800">
                  Important
                </h3>

                <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm">
                  Payment of the application fee does not by itself
                  guarantee acceptance of the application or eligibility
                  for the examination/recruitment process. Eligibility
                  and acceptance of the application shall be subject to
                  the applicable CCL recruitment/examination rules.
                </p>

              </div>

            </div>

            {/* BACK BUTTON */}

            <div className="mt-8 flex justify-center">

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ab183d] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#8f1233]"
              >
                <FaArrowLeft />
                Back to Home
              </Link>

            </div>

          </div>

          {/* FOOTER */}

          <div className="border-t border-gray-100 bg-gray-50 px-5 py-5 text-center">

            <p className="text-xs font-semibold text-gray-500">
              Central Coalfields Limited
            </p>

            <p className="mt-1 text-xs text-gray-400">
              A Government of India Enterprise
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}
