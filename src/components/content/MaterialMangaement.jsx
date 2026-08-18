
import React from "react";
import { Link } from "react-router-dom";

export default function NonMovingItems() {
  const regionalStores = [
    ["1", "RAJRAPPA", "R/STORE, RAJRAPPA"],
    ["2", "BARKA-SAYAL", "R/STORE, SAUNDA"],
    ["3", "ARGADA", "R/STORE, GIDDI A"],
    ["4", "NORTH KARANPURA", "R/STORE, DAKRA"],
    ["5", "HAZARIBAGH", "R/STORE, DAKRA"],
    ["6", "PIPARWAR", "R/STORE, PIPARWAR"],
    ["7", "KUJU", "R/STORE, KUJU"],
    ["8", "CHARHI", "R/STORE, PAREJ"],
    ["9", "B & K", "R/STORE, KARGALI"],
    ["10", "DHORI", "R/STORE, DHORI"],
    ["11", "CRS, BARKAKANA", "C/STORES, BARKAKANA"],
    ["12", "CENTRAL STORE", "C/STORES, BARKAKANA"],
    ["13", "KATHARA", "R/STORE, KATHARA"],
  ];

  const obsoleteItems = [
    ["1", "HEMM"],
    ["2", "UGMM / E&M"],
    ["3", "WASHERY"],
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
              to="/business"
              className="transition hover:underline"
            >
              Business
            </Link>

            <span>/</span>

            <Link
              to="/business/marketing-sales"
              className="transition hover:underline"
            >
              Marketing & Sales
            </Link>

            <span>/</span>

            <span>
              Non-Moving Items
            </span>
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Non-Moving Items
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/90 sm:text-base">
            List of non-moving and obsolete items available at
            regional stores and central stores of CCL.
          </p>

        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">


          {/* =================================================
              MAIN ARTICLE
          ================================================= */}

          <article className="rounded-xl bg-white p-5 shadow-sm sm:p-8">

            {/* =================================================
                NON-MOVING ITEMS
            ================================================= */}

            <section>

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-xl font-bold leading-7 text-gray-800 sm:text-2xl">
                List of Non-Moving Items at All Regional Stores
                and Central Stores (Barkakana)
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                List of non-moving items available at all regional
                stores and central stores (Barkakana) for the last
                five years as on 01-09-2024.
              </p>


              {/* Desktop / Mobile Responsive Table */}

              <div className="mt-7 overflow-hidden rounded-xl border border-gray-200">

                <div className="overflow-x-auto">

                  <table className="min-w-[650px] w-full border-collapse">

                    <thead>
                      <tr className="bg-[#ab183d] text-left text-sm font-semibold text-white">

                        <th className="border-r border-white/20 px-4 py-4">
                          Sl No
                        </th>

                        <th className="border-r border-white/20 px-4 py-4">
                          Areas
                        </th>

                        <th className="px-4 py-4">
                          Regional Store / Central Store
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {regionalStores.map((item, index) => (

                        <tr
                          key={item[0]}
                          className={
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50"
                          }
                        >

                          <td className="border-t border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700">
                            {item[0]}
                          </td>

                          <td className="border-t border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800">
                            {item[1]}
                          </td>

                          <td className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
                            {item[2]}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </section>


            {/* =================================================
                OBSOLETE ITEMS
            ================================================= */}

            <section className="mt-14">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-xl font-bold leading-7 text-gray-800 sm:text-2xl">
                List of Obsolete Items at All Regional Stores
                and Central Stores, Barkakana
              </h2>


              <div className="mt-7 overflow-hidden rounded-xl border border-gray-200">

                <div className="overflow-x-auto">

                  <table className="min-w-[500px] w-full border-collapse">

                    <thead>
                      <tr className="bg-[#ab183d] text-left text-sm font-semibold text-white">

                        <th className="w-24 border-r border-white/20 px-4 py-4">
                          Sl No
                        </th>

                        <th className="px-4 py-4">
                          Obsolete Items
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {obsoleteItems.map((item, index) => (

                        <tr
                          key={item[0]}
                          className={
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50"
                          }
                        >

                          <td className="border-t border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700">
                            {item[0]}
                          </td>

                          <td className="border-t border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800">
                            {item[1]}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </section>


            {/* =================================================
                INFORMATION BOX
            ================================================= */}

            <section className="mt-10">

              <div className="rounded-xl border border-[#ab183d]/20 bg-[#ab183d]/5 p-5 sm:p-6">

                <h3 className="text-lg font-bold text-[#ab183d]">
                  Materials Management
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-700 sm:text-base">
                  The above information contains details of
                  non-moving and obsolete items maintained at
                  various regional and central stores of
                  Central Coalfields Limited.
                </p>

              </div>

            </section>

          </article>


          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-24 overflow-hidden rounded-xl bg-white shadow-sm">

              <div className="bg-[#ab183d] px-5 py-4 text-white">

                <h3 className="font-bold">
                  Business
                </h3>

              </div>


              <div>

                <Link
                  to="/business/financial"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Financial
                </Link>

                <Link
                  to="/business/marketing-sales"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Marketing & Sales
                </Link>

                <Link
                  to="/business/marketing-sales/linkage-auction"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Linkage Auction
                </Link>

                <Link
                  to="/business/materials-management/non-moving-items"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Non-Moving Items
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}
