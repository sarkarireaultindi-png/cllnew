import React from "react";
import { Link } from "react-router-dom";

export default function IntegrityPact() {
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
              Integrity Pact Programme
            </span>

          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Integrity Pact Programme
          </h1>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/90 sm:text-base">
            Information regarding the Integrity Pact Programme of
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

            {/* Page Heading */}
            <div className="mb-8">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Vigilance - Integrity Pact Programme
              </h2>

            </div>

            {/* =================================================
                INTRODUCTION
            ================================================= */}
            <section className="space-y-5">

              <p className="text-[15px] leading-8 text-gray-700 sm:text-base">
                The Integrity Pact is a tool developed in the 1990s by
                Transparency International to help governments, businesses
                and civil society to fight corruption in the field of public
                contracting.
              </p>

              <p className="text-[15px] leading-8 text-gray-700 sm:text-base">
                IP is intended to make public procurement transparent by
                binding both parties to ethical conduct. It consists of a
                process that includes an agreement between a government or
                a government department and all bidders for a public contract.
              </p>

              {/* Highlight Box */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">

                <h3 className="mb-4 text-lg font-bold text-gray-800">
                  Integrity Pact
                </h3>

                <p className="text-[15px] leading-8 text-gray-700">
                  It contains rights and obligations to the effect that
                  neither side will:
                </p>

                <ul className="mt-4 space-y-3">

                  <li className="flex gap-3 text-sm leading-7 text-gray-700 sm:text-[15px]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ab183d]"></span>
                    <span>
                      Pay, offer, demand or accept bribes.
                    </span>
                  </li>

                  <li className="flex gap-3 text-sm leading-7 text-gray-700 sm:text-[15px]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ab183d]"></span>
                    <span>
                      Collude with competitors to obtain the contract.
                    </span>
                  </li>

                  <li className="flex gap-3 text-sm leading-7 text-gray-700 sm:text-[15px]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ab183d]"></span>
                    <span>
                      Engage in such abuses while carrying out the contract.
                    </span>
                  </li>

                </ul>

              </div>

              <p className="text-[15px] leading-8 text-gray-700 sm:text-base">
                The IP also introduces a monitoring system that provides
                for independent oversight and accountability.
              </p>

            </section>

            {/* =================================================
                CCL IMPLEMENTATION
            ================================================= */}
            <section className="mt-10">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800">
                Implementation of Integrity Pact Programme in CCL
              </h2>

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">

                <p className="text-[15px] leading-8 text-gray-700 sm:text-base">
                  CCL has signed an MOU with M/s. Transparency International
                  India on 11-8-08 for implementation of IP Programme.
                </p>

                <p className="mt-4 text-[15px] leading-8 text-gray-700 sm:text-base">
                  The IPP was made operational in CCL after the adoption of
                  above said MOU in CCL Board at its 350th meeting held on
                  23.08.2008.
                </p>

              </div>

            </section>

            {/* =================================================
                INDEPENDENT EXTERNAL MONITORS
            ================================================= */}
            <section className="mt-10">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800">
                Independent External Monitors
              </h2>

              <p className="mt-5 text-[15px] leading-8 text-gray-700 sm:text-base">
                Presently, the following two names have been approved by CVC
                for a period of three years for empanelment as Independent
                External Monitors for implementation of Integrity Pact
                Program against tenders issued by CCL:
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                {/* Monitor 1 */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-[#ab183d]/40 hover:shadow-sm">

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#ab183d] text-lg font-bold text-white">
                    1
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    Shri Sanjiv Garg
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    IRTS (Retd.)
                  </p>

                  <a
                    href="mailto:sanjivgarg.iem@gmail.com"
                    className="mt-4 block break-all text-sm font-medium text-[#ab183d] hover:underline"
                  >
                    sanjivgarg.iem@gmail.com
                  </a>

                </div>

                {/* Monitor 2 */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-[#ab183d]/40 hover:shadow-sm">

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#ab183d] text-lg font-bold text-white">
                    2
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    Shri Rohit Choudhary
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    IPS (Retd.)
                  </p>

                  <a
                    href="mailto:aol.rohit@gmail.com"
                    className="mt-4 block break-all text-sm font-medium text-[#ab183d] hover:underline"
                  >
                    aol.rohit@gmail.com
                  </a>

                </div>

              </div>

            </section>

            {/* =================================================
                DOCUMENTS
            ================================================= */}
            <section className="mt-10">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800">
                Documents
              </h2>

              <div className="mt-6 space-y-4">

                {/* MOU */}
                <a
                  href="#"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-[#ab183d] hover:bg-[#ab183d]/5"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#ab183d]/10 text-[#ab183d]">
                      <span className="text-lg font-bold">
                        PDF
                      </span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-[#ab183d]">
                        MOU with Transparency International India
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        View / Download Document
                      </p>
                    </div>

                  </div>

                  <span className="shrink-0 rounded-md bg-[#ab183d] px-4 py-2 text-sm font-semibold text-white">
                    View
                  </span>

                </a>

                {/* Integrity Pact */}
                <a
                  href="#"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-[#ab183d] hover:bg-[#ab183d]/5"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#ab183d]/10 text-[#ab183d]">
                      <span className="text-lg font-bold">
                        PDF
                      </span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-[#ab183d]">
                        Integrity Pact
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        View / Download Document
                      </p>
                    </div>

                  </div>

                  <span className="shrink-0 rounded-md bg-[#ab183d] px-4 py-2 text-sm font-semibold text-white">
                    View
                  </span>

                </a>

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
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Integrity Pact Programme
                </Link>

                <Link
                  to="/vigilance/guidelines"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Guidelines
                </Link>

                <Link
                  to="/vigilance/online-complaint"
                  className="block px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Lodge Complaint Online
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}