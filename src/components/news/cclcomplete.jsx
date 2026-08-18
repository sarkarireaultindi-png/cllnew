
import React from "react";

export default function CCLCompletesCIPETTraining() {
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
              CCL Completes CIPET Training Program
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
                25-03-2026
              </div>

            </div>

          </div>


          {/* =================================================
              FOUR IMAGE GALLERY
              2 LEFT + 2 RIGHT
          ================================================= */}
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* =================================================
                IMAGE 1
            ================================================= */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">

              <img
                src="/assets/link31.jpg"
                alt="CCL CIPET Training Program"
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


            {/* =================================================
                IMAGE 2
            ================================================= */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">

              <img
                src="/assets/link32.jpg"
                alt="CIPET Training Session"
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


            {/* =================================================
                IMAGE 3
            ================================================= */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">

              <img
                src="/assets/link33.jpg"
                alt="CCL Skill Development Program"
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


            {/* =================================================
                IMAGE 4
            ================================================= */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">

              <img
                src="/assets/link34.jpg"
                alt="CIPET Ranchi Training Program"
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
              NEWS CONTENT
          ================================================= */}
          <article className="space-y-6 text-[15px] leading-8 text-gray-700 sm:text-base">

            <p>
              CCL successfully completed the{" "}
              <span className="font-semibold text-gray-900">
                5th batch of its skill development program at CIPET,
                Ranchi.
              </span>
            </p>

            <p>
              Out of{" "}
              <span className="font-semibold text-gray-900">
                35 trainees
              </span>
              ,{" "}
              <span className="font-semibold text-gray-900">
                31 secured placements
              </span>
              , completing the target of training{" "}
              <span className="font-semibold text-gray-900">
                180 youth.
              </span>
            </p>

          </article>


          {/* =================================================
              HIGHLIGHT BOX
          ================================================= */}
          <div className="mt-8 rounded-lg border-l-4 border-[#ab183d] bg-gray-50 p-5">

            <p className="text-sm leading-7 text-gray-700 sm:text-base">
              The successful completion of the training program
              reflects CCL's continued commitment to skill development,
              employment opportunities and empowering local youth.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}
