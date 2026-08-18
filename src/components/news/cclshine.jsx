
import React from "react";

export default function CCLShinesCILBadminton() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          SIMPLE PAGE HEADER
      ===================================================== */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">

          {/* Breadcrumb - Text Only */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span>News & Media</span>
            <span>/</span>

            <span className="font-medium text-[#ab183d]">
              CCL News
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            CCL News
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
            Latest news and updates from Central Coalfields Limited.
          </p>

        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 lg:px-8">

        <div className="rounded-xl bg-white p-5 shadow-md sm:p-8">

          {/* =================================================
              PAGE HEADING
          ================================================= */}
          <div className="mb-8 border-b border-gray-200 pb-5">

            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-[#ab183d]">
                News & Media
              </span>

              <span>/</span>

              <span>
                CCL News
              </span>
            </div>

            <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold leading-tight text-gray-800 sm:text-3xl">
              CCL Shines in CIL Badminton
            </h2>

            {/* Date / Area */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">

              <div>
                <span className="font-semibold text-gray-800">
                  Area:
                </span>{" "}
                Headquarter
              </div>

              <div>
                <span className="font-semibold text-gray-800">
                  Posted on:
                </span>{" "}
                31-03-2026
              </div>

            </div>

          </div>


          {/* =================================================
              IMAGE GALLERY
              2 IMAGES LEFT + 1 LARGE IMAGE RIGHT
          ================================================= */}
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* =================================================
                LEFT COLUMN - TWO IMAGES
            ================================================= */}
            <div className="grid grid-cols-1 gap-4">

              {/* LEFT IMAGE 1 */}
              <div className="group overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">

                <img
                  src="/assets/link41.jpg"
                  alt="CCL Inter-Company Badminton Tournament"
                  className="
                    h-[240px]
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                    sm:h-[280px]
                  "
                />

              </div>


              {/* LEFT IMAGE 2 */}
              <div className="group overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">

                <img
                  src="/assets/link42.jpg"
                  alt="CCL Badminton Players"
                  className="
                    h-[240px]
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                    sm:h-[280px]
                  "
                />

              </div>

            </div>


            {/* =================================================
                RIGHT COLUMN - ONE LARGE IMAGE
            ================================================= */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">

              <img
                src="/assets/link43.jpg"
                alt="CCL Badminton Team"
                className="
                  h-[496px]
                  w-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-105
                  sm:h-[576px]
                "
              />

            </div>

          </div>


          {/* =================================================
              NEWS CONTENT
          ================================================= */}
          <article className="space-y-6 text-[15px] leading-8 text-gray-700 sm:text-base">

            <p>
              CCL delivered an impressive performance at the{" "}
              <span className="font-semibold text-gray-900">
                CIL Inter-Company Badminton Tournament 2025-26.
              </span>
            </p>

            <p>
              <span className="font-semibold text-gray-900">
                Avinash Kumar Tiwari
              </span>{" "}
              emerged as winner, while the{" "}
              <span className="font-semibold text-gray-900">
                women's team
              </span>{" "}
              and{" "}
              <span className="font-semibold text-gray-900">
                Sanyami Nidhi
              </span>{" "}
              secured runner-up positions.
            </p>

          </article>


          {/* =================================================
              HIGHLIGHT BOX
          ================================================= */}
          <div className="mt-8 rounded-lg border-l-4 border-[#ab183d] bg-gray-50 p-5">

            <p className="text-sm leading-7 text-gray-700 sm:text-base">
              The outstanding performance reflects the dedication,
              teamwork and sporting spirit of CCL employees at the
              CIL Inter-Company Badminton Tournament 2025-26.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}
