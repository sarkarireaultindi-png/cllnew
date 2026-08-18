import React from "react";
import { Link } from "react-router-dom";

export default function VigilanceSOP() {
  const sops = [
    {
      title: "Email & ECFD Approved_SOP for Inventory Management",
      url: "https://centralcoalfields.in/vglnc/pdf/2026/09_04_2026_EMAIL_EMF.pdf",
    },
    {
      title: "Revised SOP of Civil Dept.",
      url: "https://centralcoalfields.in/vglnc/pdf/2026/09_04_2026_SOP_CIVIL.pdf",
    },
    {
      title: "Modifications/Amendments in Road Sale Guidelines, 2023.",
      url: "https://centralcoalfields.in/vglnc/pdf/2026/09_04_2026_ROAD_SALE.pdf",
    },
    {
      title: "SOP for ICCC",
      url: "https://centralcoalfields.in/vglnc/pdf/2026/SOP_ICCC.pdf",
    },
    {
      title: "SOP for CONTRACTUAL WORKS EXCAVATION",
      url: "https://centralcoalfields.in/vglnc/pdf/2026/SOP_EXCV.pdf",
    },
    {
      title: "SOP for CONTRACTUAL WORKS E&M",
      url: "https://centralcoalfields.in/vglnc/pdf/2026/SOP%20E%26M.pdf",
    },
    {
      title:
        "Implementation of SOP in respect of Operation and Maintenance of Road and Rail Weighbridges in CCL command area",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/20_05_2025_command.pdf",
    },
    {
      title:
        "Implementation of SOP for both End Weighment and Coal Transport Truck in CCL",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/20_05_2025_end_weighment.pdf",
    },
    {
      title: "SOP for VTS_RFID Based Survelliance System of CCL",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/20_05_2025_survelliance.pdf",
    },
    {
      title:
        "SOP for Acceptance/Processing/Passing/Payment of bills of Contractors/Suppliers/Service Providers",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/26_09_2020_acceptance_processing_passing_of_bill.pdf",
    },
    {
      title: "SOP for IT initiative",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/26_09_2020_IT_initiative.pdf",
    },
    {
      title: "SOP for Transportation of coal by Contractual tippers",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/26_09_2020_transportation_coal_contractual_tippers.pdf",
    },
    {
      title: "SOP for Operation and Maintenance of Rail and Road Weighbridges",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/26_09_2020_operation_maintenance_rail_road.pdf",
    },
    {
      title: "SOP for Vigilance Department",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/26_09_2020_Vigilance.pdf",
    },
    {
      title: "SOP for dependent employment & monetary compensation",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/sop_dependent_employment.pdf",
    },
    {
      title: "SOP for processing of CMPF & CMPS claims",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/sop_cmpfo_cmps.pdf",
    },
    {
      title: "SOP of Civil Engineering Activities",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/sop_civil_enginerring.pdf",
    },
    {
      title: "SOP for Condition Survey & Quality Control",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/sop_survey_quality.pdf",
    },
    {
      title: "Uniform Policy for Scrap Disposal",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/uniform_policy_scrap.pdf",
    },
    {
      title:
        "SOP for Management of Dispensation / Issue of High Speed Diesel (HSD) for TFM (Total Fuel Management) Arrangements",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/sop_TFM.pdf",
    },
    {
      title:
        "SOP for Management of Receipt, Storage & Reconciliation of Stock and Dispensation / Issue of High-Speed Diesel (HSD) and Motor Spirit (Petrol), wherever applicable, for Non-TFM (Total Fuel Management) Arrangements",
      url: "https://centralcoalfields.in/vglnc/pdf/2020/sop_non_tfm.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HERO / PAGE HEADER
      ===================================================== */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: "url('/assets/project.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#ab183d]/85"></div>

        <div className="relative mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/80">

            <Link
              to="/"
              className="transition hover:text-white hover:underline"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/vigilance"
              className="transition hover:text-white hover:underline"
            >
              Vigilance
            </Link>

            <span>/</span>

            <span className="text-white">
              Standard Operating Procedure
            </span>

          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Standard Operating Procedure
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/90 sm:text-base">
            Standard Operating Procedures and guidelines issued by
            Central Coalfields Limited Vigilance Department.
          </p>

        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">

          {/* =================================================
              CONTENT
          ================================================= */}
          <article className="rounded-xl bg-white p-5 shadow-sm sm:p-8">

            {/* Page Title */}
            <div className="mb-8">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Standard Operating Procedure
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-gray-600 sm:text-base">
                View and download the Standard Operating Procedures
                issued by the Vigilance Department of CCL.
              </p>

            </div>

            {/* =================================================
                SOP LIST
            ================================================= */}
            <div className="overflow-hidden rounded-xl border border-gray-200">

              <div className="bg-[#ab183d] px-5 py-4 text-sm font-semibold text-white">
                Available SOP Documents
              </div>

              <div className="divide-y divide-gray-200">

                {sops.map((sop, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 px-5 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                  >

                    {/* Number + Title */}
                    <div className="flex min-w-0 items-start gap-4">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ab183d]/10 text-sm font-bold text-[#ab183d]">
                        {index + 1}
                      </span>

                      <p className="text-sm font-medium leading-6 text-gray-700 sm:text-[15px]">
                        {sop.title}
                      </p>

                    </div>

                    {/* Action */}
                    <div className="shrink-0 sm:ml-4">

                      <a
                        href={sop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-[#ab183d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8f1233]"
                      >
                        View PDF
                      </a>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </article>

          {/* =================================================
              SIDEBAR
          ================================================= */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 overflow-hidden rounded-xl bg-white shadow-sm">

              <div className="bg-[#ab183d] px-5 py-4 text-white">
                <h3 className="font-bold">
                  Vigilance
                </h3>
              </div>

              <div>

                <Link
                  to="/vigilance/complaint"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  General Instructions for Complaints
                </Link>

                <Link
                  to="/vigilance/integrity-pact"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Integrity Pact Programme
                </Link>

                <Link
                  to="/vigilance/awareness-campaign"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Vigilance Awareness Campaign
                </Link>

                <Link
                  to="/vigilance/sop"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Standard Operating Procedure
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}