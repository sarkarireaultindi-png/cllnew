import React from "react";

export default function CCLLaunchesNavchetnaCampaign() {
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
              CCL Launches Navchetna Campaign
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
                18-03-2026
              </div>

            </div>

          </div>


          {/* =================================================
              IMAGE GALLERY
              2 LEFT + 2 RIGHT
          ================================================= */}
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* =================================================
                LEFT SIDE - 2 IMAGES
            ================================================= */}
            <div className="grid grid-cols-1 gap-6">

              {/* LEFT IMAGE 1 */}
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm">
                <img
                  src="/assets/link51.jpg"
                  alt="Navchetna Campaign"
                  className="h-[260px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[300px]"
                />
              </div>

              {/* LEFT IMAGE 2 */}
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm">
                <img
                  src="/assets/link52.jpg"
                  alt="Navchetna Awareness Campaign"
                  className="h-[260px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[300px]"
                />
              </div>

            </div>


            {/* =================================================
                RIGHT SIDE - 2 IMAGES
            ================================================= */}
            <div className="grid grid-cols-1 gap-6">

              {/* RIGHT IMAGE 1 */}
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm">
                <img
                  src="/assets/link53.jpg"
                  alt="Navchetna Awareness Rath"
                  className="h-[260px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[300px]"
                />
              </div>

              {/* RIGHT IMAGE 2 */}
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm">
                <img
                  src="/assets/link54.jpg"
                  alt="Navchetna Campaign Flag Off"
                  className="h-[260px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[300px]"
                />
              </div>

            </div>

          </div>


          {/* =================================================
              NEWS CONTENT
          ================================================= */}
          <article className="space-y-6 text-[15px] leading-8 text-gray-700 sm:text-base">

            <p>
              CCL and{" "}
              <span className="font-semibold text-gray-900">
                Prabhat Khabar Group
              </span>{" "}
              launched the{" "}
              <span className="font-semibold text-gray-900">
                "Navchetna"
              </span>{" "}
              anti-drug campaign.
            </p>

            <p>
              Senior officials flagged off the{" "}
              <span className="font-semibold text-gray-900">
                awareness rath
              </span>
              , which will spread awareness across villages in
              Jharkhand.
            </p>

          </article>


          {/* =================================================
              HIGHLIGHT BOX
          ================================================= */}
          <div className="mt-8 rounded-lg border-l-4 border-[#ab183d] bg-gray-50 p-5">

            <p className="text-sm leading-7 text-gray-700 sm:text-base">
              The Navchetna campaign aims to create awareness among
              communities, particularly in rural areas, about the
              harmful effects of drug abuse and encourage a healthier
              and safer society.
            </p>

          </div>


          {/* =================================================
              QUICK LINKS + CONTACT US
          ================================================= */}
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-gray-200 pt-8 md:grid-cols-2">

            {/* =================================================
                QUICK LINKS
            ================================================= */}
            <div>

              <h3 className="mb-5 border-l-4 border-[#ab183d] pl-3 text-xl font-bold text-gray-800">
                Quick Links
              </h3>

              <div className="space-y-2">

                <a
                  href="http://www.centralcoalfields.in/indsk/pdf/2026_utkarsh_Magzine.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#ab183d] hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Utkarsh Magazine
                </a>

                <a
                  href="http://cclobs.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#ab183d] hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  CCL OBS
                </a>

                <a
                  href="http://centralcoalfields.in/crgt/corpte_geet.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#ab183d] hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Corporate Geet
                </a>

                <a
                  href="http://centralcoalfields.in/sitemap/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#ab183d] hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Site Map
                </a>

                <a
                  href="https://p-rise-piep.coalindia.in:44383/irj/portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#ab183d] hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  ESS/MSS
                </a>

                <a
                  href="https://www.centralcoalfields.in/ind/sap_gui.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#ab183d] hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  SAP GUI Users Setup
                </a>

                <a
                  href="http://centralcoalfields.in/apntbt/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#ab183d] hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Apni Baat
                </a>

                <a
                  href="http://apps.coalindia.in:8080/apex/f?p=231:LOGIN_DESKTOP:7085644280214:::::"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#ab183d] hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Samvaad Application
                </a>

              </div>

            </div>


            {/* =================================================
                CONTACT US
            ================================================= */}
            <div>

              <h3 className="mb-5 border-l-4 border-[#ab183d] pl-3 text-xl font-bold text-gray-800">
                Contact Us
              </h3>

              <div className="rounded-lg bg-gray-50 p-5">

                <h4 className="mb-3 text-base font-bold text-gray-800">
                  Central Coalfields Limited
                </h4>

                <p className="text-sm leading-7 text-gray-600">
                  Darbhanga House,
                  <br />
                  Ranchi - 834029,
                  <br />
                  Jharkhand, India.
                </p>

                <div className="mt-5 border-t border-gray-200 pt-4">

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Website:
                    </span>{" "}
                    Central Coalfields Limited
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Location:
                    </span>{" "}
                    Ranchi, Jharkhand
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}