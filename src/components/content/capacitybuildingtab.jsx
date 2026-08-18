import React from "react";
import { Link } from "react-router-dom";

export default function VigilanceAwarenessCampaign() {
  const campaigns = [
    {
      from: "15-04-2026",
      to: "15-04-2026",
      topic:
        "IT INITIATIVES AND INTEGRATED COMMAND AND CONTROL CENTRE (ICCC)",
      participants: "40",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=QnJpZWZfTm90ZV9vbl9DQlBfb25fSVRfSW5pdGlhdGl2ZV9fX0lDQ0NfMTVfQXByaWxfMjZfXzFfXzIwMjYwNDE3XzEwMjQxM19hYzQ0ODExZi5wZGY=",
    },
    {
      from: "10-09-2025",
      to: "10-09-2025",
      topic:
        "Disciplinary Inquiry: Principles, Procedures and Ethical Conduct",
      participants: "38",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=UmVwb3J0X29uX0Rpc2NpcGxpbmFyeV9JbnF1aXJ5XzIwMjYwMzMxXzEzMTIzM184NWM2MWFjZC5wZGY=",
    },
    {
      from: "06-09-2025",
      to: "06-09-2025",
      topic: "Conduct Rules",
      participants: "34",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=UmVwb3J0X29uX0NvbmR1Y3RfUnVsZXNfMjAyNjAzMzFfMTMxMDAwX2U3NzZhNjIzLnBkZg==",
    },
    {
      from: "19-09-2025",
      to: "19-09-2025",
      topic: "Post Award Contract Management",
      participants: "40",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=UG9zdF9Bd2FyZF9Db250cmFjdF9NYW5hZ2VtZW50X0JyaWVmXzIwMjYwMzMxXzEzMDQyMF9kNTcyNDQyZS5wZGY=",
    },
    {
      from: "29-01-2026",
      to: "29-01-2026",
      topic: "MSME and Government e-Marketplace (GeM)",
      participants: "37",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=Q0JQX29uX01TTUVfX19HZU1fMjAyNjAzMzFfMTMwMDUyX2RjYTU0YTFlLnBkZg==",
    },
    {
      from: "23-09-2025",
      to: "25-09-2025",
      topic: "Finance",
      participants: "34",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=Q0JQX29uX0ZpbmFuY2VfMjAyNjAzMzFfMTI1NDI3X2UxMDA2NDkyLnBkZg==",
    },
    {
      from: "27-11-2025",
      to: "29-11-2025",
      topic: "Mining",
      participants: "37",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=Q0JQX01pbmluZ19maW5hbF8yMDI2MDMzMV8xMjQ5NTRfN2M4ODgwYmIucGRm",
    },
    {
      from: "26-02-2026",
      to: "27-02-2026",
      topic: "Human Resource",
      participants: "30",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=Q0JQX0hSXzI2X2FuZF8yN19GZWJfMjZfMjAyNjAzMzFfMTI0NzM3XzkxODk3MDY4LnBkZg==",
    },
    {
      from: "16-12-2025",
      to: "18-12-2025",
      topic: "Cyber Security under Marathon Training",
      participants: "32",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=Q0JQX0N5YmVyX1NlY3VyaXR5XzIwMjYwMzMxXzEyNDUwMF83N2QxM2M3OS5wZGY=",
    },
    {
      from: "10-04-2025",
      to: "11-04-2025",
      topic: "Weighbridge Operation and Maintenance in two batches at MTC",
      participants: "",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=MTFfMDRfMjAyNV93ZWlnaGJyaWRnZV8yMDI1MDkyNV8xNjQzMzZfZDcyODEwYy5wZGY=",
    },
    {
      from: "09-04-2025",
      to: "09-04-2025",
      topic:
        "Inter Subsidiary Program on EMB portal at MTC, HRD on 09.04.2025",
      participants: "",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=MTFfMDRfMjAyNV9lbWJfcG9ydGFsXzIwMjUwOTI1XzE2NDIwOF9iNTg5ODAzNC5wZGY=",
    },
    {
      from: "25-07-2024",
      to: "27-07-2024",
      topic: "Finance",
      participants: "33",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=Y2FwX2J1aWxfMl8yMDI1MDkyNV8xNjI2MzBfZmM0OWQyODkucGRm",
    },
    {
      from: "21-08-2024",
      to: "23-08-2024",
      topic: "IT Initiatives",
      participants: "37",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=Y2FwX2J1aWxfMV8yMDI1MDkyNV8xNjI0MTJfYmIxNzlhMTMucGRm",
    },
    {
      from: "26-09-2024",
      to: "26-09-2024",
      topic:
        "Contract (Mining, E&M, Excavation, Civil, MM): IT initiative",
      participants: "32",
      location: "HRD Department, CCL HQ",
      report:
        "https://centralcoalfields.in/vglnc/counter.php?filename=MS5wZGY=",
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
              Vigilance Awareness Campaign
            </span>

          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Vigilance Awareness Campaign
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/90 sm:text-base">
            Capacity building and awareness programmes conducted by
            Central Coalfields Limited.
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

            {/* Title */}
            <div className="mb-8">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Vigilance Awareness Campaign
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-gray-600 sm:text-base">
                Details of various capacity building and awareness
                programmes conducted by CCL.
              </p>

            </div>

            {/* =================================================
                TABLE
            ================================================= */}
            <div className="overflow-hidden rounded-xl border border-gray-200">

              <div className="overflow-x-auto">

                <table className="min-w-[950px] w-full border-collapse">

                  <thead>
                    <tr className="bg-[#ab183d] text-left text-sm font-semibold text-white">

                      <th className="whitespace-nowrap px-4 py-4 sm:px-5">
                        From Date
                      </th>

                      <th className="whitespace-nowrap px-4 py-4 sm:px-5">
                        To Date
                      </th>

                      <th className="min-w-[300px] px-4 py-4 sm:px-5">
                        Topic
                      </th>

                      <th className="whitespace-nowrap px-4 py-4 text-center sm:px-5">
                        No. of Participants
                      </th>

                      <th className="min-w-[180px] px-4 py-4 sm:px-5">
                        Location
                      </th>

                      <th className="whitespace-nowrap px-4 py-4 text-center sm:px-5">
                        Report
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {campaigns.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 bg-white transition hover:bg-gray-50"
                      >

                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-700 sm:px-5">
                          {item.from}
                        </td>

                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-700 sm:px-5">
                          {item.to}
                        </td>

                        <td className="px-4 py-5 text-sm leading-6 text-gray-700 sm:px-5">
                          {item.topic}
                        </td>

                        <td className="px-4 py-5 text-center text-sm font-semibold text-gray-700 sm:px-5">
                          {item.participants || "-"}
                        </td>

                        <td className="px-4 py-5 text-sm text-gray-700 sm:px-5">
                          {item.location}
                        </td>

                        <td className="px-4 py-5 text-center sm:px-5">

                          <a
                            href={item.report}
                            target="_blank"
                            rel="noopener noreferrer"
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
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Vigilance Awareness Campaign
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}