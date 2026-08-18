import React from "react";
import { Link } from "react-router-dom";

export default function HEMMStatus() {
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
        {/* Light dark overlay for text readability */}
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
              to="/business"
              className="transition hover:text-white hover:underline"
            >
              Business
            </Link>

            <span>/</span>

            <span className="text-white">
              HEMM Status
            </span>

          </div>

          <h1 className="text-3xl font-bold drop-shadow sm:text-4xl lg:text-5xl">
            HEMM Status
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white drop-shadow sm:text-base">
            Details of Heavy Earth Moving Machinery (HEMM) status
            under Central Coalfields Limited.
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
                HEMM Status
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-gray-600 sm:text-base">
                Heavy Earth Moving Machinery status of Central
                Coalfields Limited.
              </p>

            </div>


            {/* =================================================
                TABLE
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
                        HEMM Status
                      </th>

                      <th className="whitespace-nowrap px-4 py-4 text-center sm:px-6">
                        Action
                      </th>

                    </tr>
                  </thead>


                  {/* Table Body */}
                  <tbody>

                    <tr className="border-t border-gray-200 bg-white transition hover:bg-gray-50">

                      <td className="px-4 py-5 text-sm font-semibold text-gray-700 sm:px-6">
                        1
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-700 sm:px-6">
                        HEMM Population as on 01.08.2026
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
                  Business
                </h3>

              </div>


              {/* Sidebar Links */}
              <div>

                <Link
                  to="/business/linkage-auction"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Linkage Auction
                </Link>


                <Link
                  to="/business/non-moving-items"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Non-Moving Items
                </Link>


                <Link
                  to="/business/work-orders"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Work Orders
                </Link>


                <Link
                  to="/business/quality-management"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Quality Management
                </Link>


                <Link
                  to="/business/hemm-status"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  HEMM Status
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}