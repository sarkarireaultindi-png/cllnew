import React from "react";
import { Link } from "react-router-dom";

export default function IsoOhsasCertification() {
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
        <div className="relative mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">

            <Link
              to="/"
              className="transition hover:underline"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/"
              className="transition hover:underline"
            >
              Company
            </Link>

            <span>/</span>

            <span>
              Certification
            </span>

          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Certification
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 sm:text-base">
            Central Coalfields Limited - ISO/OHSAS Certification
          </p>

        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">

          {/* =================================================
              ARTICLE
          ================================================= */}
          <article className="rounded-xl bg-white p-5 shadow-sm sm:p-8">

            {/* Page Heading */}
            <div className="border-l-4 border-[#ab183d] pl-4">

              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                Central Coalfields Limited - ISO/OHSAS Certification
              </h2>

            </div>


            {/* Introduction */}
            <p className="mt-6 text-[15px] leading-7 text-gray-700 sm:text-base">
              CCL bagged the following certifications of International
              Management System Standard for three years.
            </p>


            {/* =================================================
                CERTIFICATIONS
            ================================================= */}
            <div className="mt-8 space-y-5">

              {/* ISO 9001 */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#ab183d]/40 hover:shadow-md sm:p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-lg font-bold text-white">
                    ISO
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-lg font-bold text-[#ab183d] sm:text-xl">
                      ISO 9001:2015
                    </h3>

                    <p className="mt-1 font-semibold text-gray-800">
                      Quality Management System
                    </p>

                    <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-[15px]">
                      For managing customer focus and internal efficiency
                      of the organization.
                    </p>

                  </div>

                </div>

              </div>


              {/* ISO 14001 */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#ab183d]/40 hover:shadow-md sm:p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-lg font-bold text-white">
                    ISO
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-lg font-bold text-[#ab183d] sm:text-xl">
                      ISO 14001:2015
                    </h3>

                    <p className="mt-1 font-semibold text-gray-800">
                      Environmental Management System
                    </p>

                    <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-[15px]">
                      For managing environmental concerns of the
                      organization.
                    </p>

                  </div>

                </div>

              </div>


              {/* OHSAS */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#ab183d]/40 hover:shadow-md sm:p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-sm font-bold text-white">
                    OHS
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-lg font-bold text-[#ab183d] sm:text-xl">
                      OHSAS 18001:2007
                    </h3>

                    <p className="mt-1 font-semibold text-gray-800">
                      Occupational Health and Safety Management System
                    </p>

                    <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-[15px]">
                      For managing Occupational Health & Safety of the
                      organization.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                HIGHLIGHT
            ================================================= */}
            <section className="mt-10 rounded-xl border border-[#ab183d]/20 bg-[#ab183d]/5 p-5 sm:p-6">

              <h3 className="text-xl font-bold text-[#ab183d]">
                International Management System Standards
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-gray-700">
                These certifications demonstrate CCL's commitment to
                quality management, environmental responsibility and
                occupational health and safety management across the
                organization.
              </p>

            </section>

          </article>


          {/* =================================================
              SIDEBAR
          ================================================= */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 overflow-hidden rounded-xl bg-white shadow-sm">

              <div className="bg-[#ab183d] px-5 py-4 text-white">
                <h3 className="font-bold">
                  Company
                </h3>
              </div>

              <div>

                <Link
                  to="/about-us/history"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  History
                </Link>

                <Link
                  to="/about-us/vision-mission"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Vision & Mission
                </Link>

                <Link
                  to="/about-us/company-profile"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Company Profile
                </Link>

                <Link
                  to="/about-us/profile"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Profile
                </Link>

                <Link
                  to="/about-us/rti-infrastructure"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  RTI Act / Infrastructure
                </Link>

                <Link
                  to="/about-us/iso-ohsas-certification"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  ISO/OHSAS Certification
                </Link>

                <Link
                  to="/about-us/corporate-structure"
                  className="block px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Corporate Structure
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}