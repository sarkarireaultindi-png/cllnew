import React from "react";
import { Link } from "react-router-dom";

export default function CompanyProfile() {
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
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">

          {/* Breadcrumb */}

          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white">

            <Link
              to="/"
              className="transition hover:text-yellow-300 hover:underline"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/"
              className="transition hover:text-yellow-300 hover:underline"
            >
              Company
            </Link>

            <span>/</span>

            <span className="font-semibold">
              Company Profile
            </span>

          </div>

          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl lg:text-5xl">
            Company Profile
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white drop-shadow-md sm:text-base">
            An overview of the present operations and infrastructure
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

            {/* =================================================
                TITLE
            ================================================= */}

            <section>

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Presently CCL Has
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-gray-600 sm:text-base">
                Central Coalfields Limited has an extensive mining,
                coal processing and workshop infrastructure spread
                across its operating coalfields.
              </p>

            </section>


            {/* =================================================
                COMPANY INFORMATION
            ================================================= */}

            <section className="mt-8">

              <div className="overflow-hidden rounded-xl border border-gray-200">

                {/* Desktop / Tablet Table */}

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[650px] border-collapse">

                    <thead>

                      <tr className="bg-[#ab183d] text-left text-white">

                        <th className="px-5 py-4 text-sm font-bold sm:text-base">
                          Particulars
                        </th>

                        <th className="px-5 py-4 text-sm font-bold sm:text-base">
                          Details
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {/* Number of Mines */}

                      <tr className="border-b border-gray-200">

                        <td className="w-[30%] bg-gray-50 px-5 py-5 align-top font-bold text-gray-800">
                          Number of Mines
                        </td>

                        <td className="px-5 py-5 text-[15px] leading-7 text-gray-700">
                          <strong>38 Producing Mines</strong>

                          <div className="mt-2">

                            <span className="inline-block rounded-full bg-[#ab183d]/10 px-3 py-1 text-sm font-semibold text-[#ab183d]">
                              3 Underground
                            </span>

                            <span className="ml-2 inline-block rounded-full bg-[#ab183d]/10 px-3 py-1 text-sm font-semibold text-[#ab183d]">
                              35 Opencast
                            </span>

                          </div>

                        </td>

                      </tr>


                      {/* Washeries */}

                      <tr className="border-b border-gray-200">

                        <td className="bg-gray-50 px-5 py-5 align-top font-bold text-gray-800">
                          Washeries
                        </td>

                        <td className="px-5 py-5 text-[15px] leading-7 text-gray-700">

                          <p>
                            <strong>5 Washeries</strong>
                          </p>

                          <ul className="mt-3 space-y-2">

                            <li className="flex gap-2">

                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ab183d]" />

                              <span>
                                <strong>4 Coking Coal Washeries:</strong>{" "}
                                Kathara, Rajrappa, Kedla &amp; Sawang
                              </span>

                            </li>

                            <li className="flex gap-2">

                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ab183d]" />

                              <span>
                                <strong>1 Non-Coking Coal Washery:</strong>{" "}
                                Piparwar
                              </span>

                            </li>

                          </ul>

                        </td>

                      </tr>


                      {/* Repair / Workshops */}

                      <tr className="border-b border-gray-200">

                        <td className="bg-gray-50 px-5 py-5 align-top font-bold text-gray-800">
                          Repair / Workshops
                        </td>

                        <td className="px-5 py-5 text-[15px] leading-7 text-gray-700">

                          <p>
                            <strong>
                              1 Central Workshop
                            </strong>{" "}
                            (ISO 9001) at Barkakana.
                          </p>

                          <p className="mt-3">

                            <strong>
                              5 Regional Repair / Workshops
                            </strong>{" "}
                            with 3 workshops being ISO 9001 certified.
                          </p>

                          <div className="mt-4 rounded-lg bg-gray-50 p-4">

                            <p className="text-sm font-semibold text-gray-800">
                              Regional Repair / Workshops:
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">

                              {[
                                "Jarandih",
                                "Tapin North",
                                "Dakra",
                                "Giridih",
                                "Bhurkunda",
                              ].map((workshop) => (

                                <span
                                  key={workshop}
                                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
                                >
                                  {workshop}
                                </span>

                              ))}

                            </div>

                          </div>

                        </td>

                      </tr>


                      {/* Operating Coalfields */}

                      <tr>

                        <td className="bg-gray-50 px-5 py-5 align-top font-bold text-gray-800">
                          Operating Coalfields
                        </td>

                        <td className="px-5 py-5 text-[15px] leading-7 text-gray-700">

                          <p>
                            <strong>9 Coalfields</strong>
                          </p>

                          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {[
                              "North Karanpura",
                              "South Karanpura",
                              "East Bokaro",
                              "West Bokaro",
                              "Ramgarh",
                              "Daltonganj",
                              "Hutar",
                              "Auranga",
                              "Giridih",
                            ].map((coalfield, index) => (

                              <div
                                key={coalfield}
                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                              >

                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ab183d] text-xs font-bold text-white">
                                  {index + 1}
                                </span>

                                <span className="font-medium text-gray-700">
                                  {coalfield}
                                </span>

                              </div>

                            ))}

                          </div>

                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </section>


            {/* =================================================
                QUICK SUMMARY
            ================================================= */}

            <section className="mt-10">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                At a Glance
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Mines */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                  <div className="text-3xl font-bold text-[#ab183d]">
                    38
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    Producing Mines
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    3 Underground &amp; 35 Opencast
                  </p>

                </div>


                {/* Washeries */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                  <div className="text-3xl font-bold text-[#ab183d]">
                    5
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    Washeries
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Coking &amp; Non-Coking
                  </p>

                </div>


                {/* Coalfields */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                  <div className="text-3xl font-bold text-[#ab183d]">
                    9
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    Operating Coalfields
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Across the CCL operational area
                  </p>

                </div>


                {/* Workshops */}

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                  <div className="text-3xl font-bold text-[#ab183d]">
                    6
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    Workshops
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    1 Central &amp; 5 Regional
                  </p>

                </div>

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
                  Company
                </h3>

              </div>


              <div>

                {/* History */}

                <Link
                  to="/about-us/history"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  History
                </Link>


                {/* Vision & Mission */}

                <Link
                  to="/about-us/vision-mission"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Vision &amp; Mission
                </Link>


                {/* Company Profile */}

                <Link
                  to="/about-us/company-profile"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Company Profile
                </Link>


                {/* Profile */}

                <Link
                  to="/about-us/profile"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Profile
                </Link>


                {/* RTI */}

                <Link
                  to="/about-us/rti-infrastructure"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  RTI Act / Infrastructure
                </Link>


                {/* ISO */}

                <Link
                  to="/about-us/iso-ohsas-certification"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  ISO/OHSAS Certification
                </Link>


                {/* Corporate Structure */}

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