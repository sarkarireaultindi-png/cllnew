import React from "react";
import { Link } from "react-router-dom";

export default function RtiInfrastructure() {
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
        {/* Image only — no background overlay */}

        <div className="relative mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white">

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
              RTI Act / Infrastructure
            </span>

          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            RTI Act / Infrastructure
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 sm:text-base">
            Right to Information and related information resources
            of Central Coalfields Limited.
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

            <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
              Right to Information Act
            </h2>

            <p className="mt-5 text-[15px] leading-7 text-gray-700 sm:text-base">
              Central Coalfields Limited provides information and
              resources relating to the Right to Information Act,
              2005, to facilitate access to information in accordance
              with the applicable provisions.
            </p>


            {/* =================================================
                RTI LINKS
            ================================================= */}
            <div className="mt-8 space-y-4">

              {/* RTI Act 2005 */}
              <a
                href="https://www.centralcoalfields.in/cmpny/rti_05.php"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#ab183d] hover:bg-[#ab183d]/5"
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ab183d] text-white">
                    📄
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-[#ab183d]">
                      RTI Act 2005
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Information regarding the Right to Information Act, 2005.
                    </p>
                  </div>

                </div>

                <span className="ml-4 text-xl text-[#ab183d]">
                  →
                </span>

              </a>


              {/* Section 4(b) */}
              <a
                href="https://www.centralcoalfields.in/cmpny/sec_4b_rti.php"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#ab183d] hover:bg-[#ab183d]/5"
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ab183d] text-white">
                    📋
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-[#ab183d]">
                      Section 4(b) of the RTI Act 2005
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Information published under Section 4(b) of the RTI Act.
                    </p>
                  </div>

                </div>

                <span className="ml-4 text-xl text-[#ab183d]">
                  →
                </span>

              </a>


              {/* Application Form */}
              <a
                href="https://www.centralcoalfields.in/cmpny/pdf/rtiact/RTI_Applform.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#ab183d] hover:bg-[#ab183d]/5"
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ab183d] text-white">
                    📥
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-[#ab183d]">
                      Application Form Under Right to Information Act, 2005
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Download the RTI application form.
                    </p>
                  </div>

                </div>

                <span className="ml-4 text-xl text-[#ab183d]">
                  ↗
                </span>

              </a>


              {/* Quarterly Return */}
              <a
                href="https://www.centralcoalfields.in/cmpny/qtr_rtrn.php"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#ab183d] hover:bg-[#ab183d]/5"
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ab183d] text-white">
                    📊
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-[#ab183d]">
                      RTI Quarterly Return
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      View quarterly returns related to RTI.
                    </p>
                  </div>

                </div>

                <span className="ml-4 text-xl text-[#ab183d]">
                  →
                </span>

              </a>


              {/* Central Information Commission */}
              <a
                href="http://rti.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#ab183d] hover:bg-[#ab183d]/5"
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ab183d] text-white">
                    🌐
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-[#ab183d]">
                      Central Information Commission Online
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Visit the Central Information Commission website.
                    </p>
                  </div>

                </div>

                <span className="ml-4 text-xl text-[#ab183d]">
                  ↗
                </span>

              </a>

            </div>


            {/* =================================================
                INFORMATION NOTE
            ================================================= */}
            <section className="mt-10 rounded-xl border border-[#ab183d]/20 bg-[#ab183d]/5 p-5 sm:p-6">

              <h3 className="text-xl font-bold text-[#ab183d]">
                Right to Information
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-gray-700">
                The resources provided above contain information
                relating to the Right to Information Act, Section
                4(b) disclosures, application forms and quarterly
                returns. Users can access the respective resources
                through the links provided.
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
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  RTI Act / Infrastructure
                </Link>

                <Link
                  to="/about-us/iso-ohsas-certification"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
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