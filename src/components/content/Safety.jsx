import React from "react";
import { Link } from "react-router-dom";

export default function Safety() {
  const safetyItems = [
    "Mines Safety",
    "Mines Act-1952",
    "Central Electricity Authority (Measures relating to Safety and Electricity Supply) Regulations, 2010",
    "Coal Mine Regulation 2017",
    "Mine Rescue Rule 1985",
    "Safety Policy of CCL",
    "Functions of Internal Safety",
    "Safety Monitoring Mechanism",
    "Safety Measures",
    "On-going R&D Activities",
    "Years wise Fatal & Serious Accidents Chart",
    "DGMS approved Safety Items",
    "Decentralize Safety Items",
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
        {/* Light overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/90">

            <Link
              to="/"
              className="transition hover:text-white hover:underline"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/sustainability"
              className="transition hover:text-white hover:underline"
            >
              Sustainability
            </Link>

            <span>/</span>

            <span className="text-white">
              Safety
            </span>

          </div>

          <h1 className="text-3xl font-bold drop-shadow sm:text-4xl lg:text-5xl">
            Safety
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white drop-shadow sm:text-base">
            Safety policies, regulations, monitoring mechanisms and
            safety measures of Central Coalfields Limited.
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

            {/* Page Heading */}
            <div className="mb-8">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Safety
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-gray-600 sm:text-base">
                Safety-related information, regulations, policies and
                activities of Central Coalfields Limited.
              </p>

            </div>


            {/* =================================================
                SAFETY TABLE
            ================================================= */}
            <div className="overflow-hidden rounded-xl border border-gray-200">

              <div className="overflow-x-auto">

                <table className="min-w-full border-collapse">

                  {/* Table Header */}
                  <thead>
                    <tr className="bg-[#ab183d] text-left text-sm font-semibold text-white">

                      <th className="whitespace-nowrap px-4 py-4 sm:px-6">
                        Sl No
                      </th>

                      <th className="px-4 py-4 sm:px-6">
                        Safety
                      </th>

                      <th className="whitespace-nowrap px-4 py-4 text-center sm:px-6">
                        Action
                      </th>

                    </tr>
                  </thead>


                  {/* Table Body */}
                  <tbody>

                    {safetyItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 bg-white transition hover:bg-gray-50"
                      >

                        <td className="px-4 py-5 text-sm font-semibold text-gray-700 sm:px-6">
                          {index + 1}
                        </td>

                        <td className="px-4 py-5 text-sm leading-6 text-gray-700 sm:px-6">
                          {item}
                        </td>

                        <td className="px-4 py-5 text-center sm:px-6">

                          <a
                            href="#"
                            className="inline-flex items-center rounded-md bg-[#ab183d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8f1233]"
                          >
                            View
                          </a>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </article>


          {/* =================================================
              SIDEBAR
          ================================================= */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 overflow-hidden rounded-xl bg-white shadow-sm">

              {/* Sidebar Header */}
              <div className="bg-[#ab183d] px-5 py-4 text-white">

                <h3 className="font-bold">
                  Sustainability
                </h3>

              </div>


              {/* Sidebar Links */}
              <div>

                <Link
                  to="/sustainability/safety"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Safety
                </Link>

                <Link
                  to="/sustainability/environment"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Environment
                </Link>

                <Link
                  to="/sustainability/csr"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  CSR
                </Link>

                <Link
                  to="/sustainability/sustainable-development"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Sustainable Development
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}