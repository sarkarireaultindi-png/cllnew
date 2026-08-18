import React from "react";
import { Link } from "react-router-dom";

export default function VisionMission() {
  const objectives = [
    "To optimize generation of internal resources by improving productivity of resources, prevent wastage and to mobilize adequate external resources to meet investment need.",

    "To maintain high standards of Safety and strive for an accident free mining of Coal.",

    "To lay emphasis on afforestation, protection of Environment and control of Pollution.",

    "To undertake detailed exploration and plan for new Projects to meet the future Coal demand.",

    "To modernize existing Mines.",

    "To Develop technical know-how and organizational capability of Coal mining as well as Coal beneficiation and undertake, wherever necessary, applied research and development work related to Scientific exploration for greater extraction of Coal.",

    "To improve the quality of life of employees and to discharge the corporate obligations to Society at large and the community around the Coalfields in particular.",

    "To provide adequate number of skilled manpower to run the operations and impart technical and managerial training for up gradation of skill.",

    "To improve consumer satisfaction.",

    "To enhance the CSR activities specifically in the field of Health, Sanitation and Drinking Water in the Surrounding villages.",
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
              Vision & Mission
            </span>

          </div>

          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl lg:text-5xl">
            Vision & Mission
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white drop-shadow-md sm:text-base">
            Our vision, mission and objectives for sustainable growth
            and responsible coal production.
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
                VISION
            ================================================= */}

            <section>

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Our Vision
              </h2>

              <div className="mt-6 rounded-xl border border-[#ab183d]/20 bg-[#ab183d]/5 p-5 sm:p-7">

                <p className="text-[15px] font-medium italic leading-8 text-gray-700 sm:text-base">
                  To emerge as a National player in the Primary Energy
                  Sector, committed to provide energy security to the
                  Country, by attaining environmentally and Socially
                  Sustainable Growth, through best practices from Mine
                  to Market.
                </p>

              </div>

            </section>


            {/* =================================================
                MISSION
            ================================================= */}

            <section className="mt-12">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Our Mission
              </h2>

              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-7">

                <p className="text-[15px] font-medium italic leading-8 text-gray-700 sm:text-base">
                  The Mission of Central Coalfields Limited (CCL) is
                  to produce and market the planned quantity of Coal
                  and Coal products efficiently and economically in
                  Eco-Friendly manner, with due regard to Safety,
                  Conservation and Quality.
                </p>

              </div>

            </section>


            {/* =================================================
                OBJECTIVES
            ================================================= */}

            <section className="mt-12">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Our Objectives
              </h2>

              <div className="mt-6 space-y-4">

                {objectives.map((objective, index) => (

                  <div
                    key={index}
                    className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-[#ab183d]/30 hover:bg-gray-50"
                  >

                    {/* Number */}

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ab183d] text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    {/* Text */}

                    <p className="text-[15px] leading-7 text-gray-700 sm:text-base">
                      {objective}
                    </p>

                  </div>

                ))}

              </div>

            </section>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <section className="mt-12">

              <div className="rounded-xl bg-[#ab183d] p-6 text-white sm:p-8">

                <h3 className="text-xl font-bold sm:text-2xl">
                  Commitment to Sustainable Growth
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/90 sm:text-base">
                  Central Coalfields Limited remains committed to
                  responsible coal production, workplace safety,
                  environmental protection, technological development,
                  employee welfare, consumer satisfaction and the
                  overall development of communities surrounding its
                  coalfields.
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
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Vision & Mission
                </Link>


                {/* Company Profile */}

                <Link
                  to="/about-us/company-profile"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
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