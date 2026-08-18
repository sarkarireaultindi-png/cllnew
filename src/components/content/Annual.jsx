import React from "react";
import { Link } from "react-router-dom";

export default function AnnualReport() {
  const reports = [
    {
      year: "2023-24",
      url: "https://www.centralcoalfields.in/prfnc/pdf/19_10_2024_annual_report_jcrl_eng.pdf",
    },
    {
      year: "2022-23",
      url: "https://www.centralcoalfields.in/prfnc/pdf/10_11_23_annual_report_2022_23.pdf",
    },
    {
      year: "2021-22",
      url: "https://www.centralcoalfields.in/prfnc/pdf/02_9_2022_annual_report_2021_22.pdf",
    },
    {
      year: "2020-21",
      url: "https://www.centralcoalfields.in/prfnc/pdf/annul_report_20_21_jcrl.pdf",
    },
    {
      year: "2019-20",
      url: "https://www.centralcoalfields.in/prfnc/pdf/annul_report_19_20_jcrl.pdf",
    },
    {
      year: "2017-18",
      url: "https://www.centralcoalfields.in/prfnc/pdf/annul_report_1718_jcrl.pdf",
    },
    {
      year: "2016-17",
      url: "http://www.centralcoalfields.in/prfnc/pdf/14_09_17_finance_acc_for_the_year_ended_31st_mar_17.pdf",
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
              to="/business"
              className="transition hover:underline"
            >
              Business
            </Link>

            <span>/</span>

            <span>
              Financial
            </span>

            <span>/</span>

            <span>
              JCRL
            </span>

            <span>/</span>

            <span>
              Annual Report
            </span>

          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Annual Report
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 sm:text-base">
            Financial reports and annual reports of Central Coalfields
            Limited.
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

            {/* Heading */}
            <div className="border-l-4 border-[#ab183d] pl-4">

              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                Financial | JCRL | Annual Report
              </h2>

            </div>


            <p className="mt-6 text-[15px] leading-7 text-gray-700 sm:text-base">
              Annual reports for the respective financial years are
              available below. Click on a year to open the corresponding
              annual report.
            </p>


            {/* =================================================
                REPORT LIST
            ================================================= */}
            <div className="mt-8 space-y-4">

              {reports.map((report, index) => (

                <a
                  key={report.year}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#ab183d] hover:bg-[#ab183d]/5 hover:shadow-md sm:p-6"
                >

                  <div className="flex items-center gap-4">

                    {/* PDF Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-sm font-bold text-white">
                      PDF
                    </div>

                    <div>

                      <h3 className="text-base font-bold text-gray-800 transition group-hover:text-[#ab183d] sm:text-lg">
                        Year : {report.year}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Annual Report
                      </p>

                    </div>

                  </div>


                  {/* Open Icon */}
                  <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-[#ab183d] transition group-hover:bg-[#ab183d] group-hover:text-white">
                    ↗
                  </div>

                </a>

              ))}

            </div>


            {/* =================================================
                INFORMATION BOX
            ================================================= */}
            <div className="mt-10 rounded-xl border border-[#ab183d]/20 bg-[#ab183d]/5 p-5 sm:p-6">

              <h3 className="text-lg font-bold text-[#ab183d]">
                Annual Reports
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700 sm:text-[15px]">
                Select the required financial year above to view or
                download the corresponding annual report.
              </p>

            </div>

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

                {/* Financial */}
                <Link
                  to="/business/financial"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Financial
                </Link>


                {/* JCRL */}
                <Link
                  to="/business/financial/jcrl"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  JCRL
                </Link>


                {/* Annual Report */}
                <Link
                  to="/business/financial/jcrl/annual-report"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Annual Report
                </Link>


                {/* Marketing & Sales */}
                <Link
                  to="/business/marketing-sales"
                  className="block px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Marketing & Sales
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}