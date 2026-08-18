
import React from "react";
import { Link } from "react-router-dom";

export default function History() {
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
        History
      </span>

    </div>

    <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl lg:text-5xl">
      History
    </h1>

    <p className="mt-3 max-w-3xl text-sm leading-6 text-white drop-shadow-md sm:text-base">
      The historical journey of Central Coalfields Limited
      and its contribution to the Indian coal industry.
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
                INTRODUCTION
            ================================================= */}

            <section>

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Central Coalfields Limited - The Historical March
              </h2>

              <p className="mt-6 text-[15px] leading-7 text-gray-700 sm:text-base">
                Central Coalfields Limited is a Category-I Mini-Ratna
                Company since October 2007. During 2023-24, coal
                production of the company reached its highest-ever
                figure of <strong>86.054 million tonnes</strong>.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                Formed on <strong>1st November 1975</strong>, CCL
                (formerly National Coal Development Corporation Ltd)
                was one of the five subsidiaries of Coal India Ltd.,
                which was the first holding company for coal in the
                country. Coal India Limited now has eight subsidiaries.
              </p>

            </section>


            {/* =================================================
                HISTORICAL MARCH
            ================================================= */}

            <section className="mt-12">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Central Coalfields Limited - The Historical March
              </h2>

              <p className="mt-6 text-[15px] leading-7 text-gray-700 sm:text-base">
                CCL had a proud past. As NCDC, it heralded the
                beginning of nationalization of coal mines in India.
                National Coal Development Corporation Ltd. (NCDC)
                was set up in October, 1956 as a Government-owned
                Company in pursuance of the Industrial Policy
                Resolutions of 1948 and 1956 of the Government of
                India.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                It was started with a nucleus of 11 old state
                collieries, owned by the Railways, having a total
                annual production of 2.9 million tonnes of coal.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                Until the formation of NCDC, coal mining in India was
                largely confined to the Raniganj coal belt in West
                Bengal and the Jharia coalfields in Bihar (now in
                Jharkhand), besides a few other areas in Bihar
                (now Jharkhand), a part of Madhya Pradesh
                (now Chhattisgarh) and Orissa.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                From its very beginning, NCDC addressed itself to the
                task of increasing coal production and developing new
                coal resources in the outlying areas, besides
                introducing modern and scientific techniques of coal
                mining.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                In the Second Five Year Plan (1956-1961), NCDC was
                called upon to increase its production from new
                collieries, to be opened mainly in areas away from the
                already developed Raniganj and Jharia coalfields.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                Eight new collieries were opened during this period
                and production increased to <strong>8.05 million tonnes</strong>
                by the end of the Second Plan.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                During the Third Five Year Plan (1961-1966), although
                the Corporation had built up a much larger production
                capacity, it could not be utilized due to a sluggish
                domestic coal market. Production had therefore to be
                pegged down and the development of several collieries
                undertaken from the early part of the Plan period had
                to be suspended.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                By this time, the contribution of NCDC to the nation's
                coal production increased to around
                <strong> 9.6 million tonnes</strong>.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                With the gradual rise in demand for coal due to the
                commissioning of new power plants and development of
                other coal-based industries during the Fourth Five
                Year Plan (1969-1974), NCDC's production increased to
                <strong> 15.55 million tonnes</strong> by the terminal
                year of the Fourth Five Year Plan, i.e. 1973-74.
              </p>

            </section>


            {/* =================================================
                HISTORICAL IMAGE PLACEHOLDER
            ================================================= */}

            <section className="mt-10">

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100">

                <img
                  src="/assets/1.jpg"
                  alt="Shovel loading a bottom discharge dumper in an opencast mine in 1977-78"
                  className="h-auto w-full object-cover"
                />

                <div className="bg-gray-50 px-4 py-3 text-center text-sm italic text-gray-600">
                  Fig. Shovel loading a bottom discharge dumper in an
                  opencast mine in 1977-78
                </div>

              </div>

            </section>


            {/* =================================================
                NCDC CONTRIBUTION
            ================================================= */}

            <section className="mt-12">

              <p className="text-[15px] leading-7 text-gray-700 sm:text-base">
                NCDC played a pioneering role in India's coal industry
                by introducing large-scale mechanization and modern
                and scientific methods of coal mining for promoting
                conservation of high grades of coal and exploiting
                deep coking coal seams necessitating heavy capital
                investment and sophisticated technical skill.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                NCDC went in for foreign collaboration with countries
                such as Poland and the USSR besides limited
                collaboration with Japan, West Germany and France.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                NCDC's role can be truly assessed by its contribution
                towards growth of new coal resources in what are known
                as the outlying areas.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                The opening of new mines in Madhya Pradesh, Orissa
                and Maharashtra brought about a significant change in
                these regions by creating new opportunities of
                industrialization and employment.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                Development of the Singrauli coalfields brought coal
                almost to the doorsteps of northern India.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                With the development and application of improved
                mining techniques, emphasis on planning, design and
                research, introduction of modern mine management
                systems and an enlightened industrial relations policy,
                NCDC was able to provide the infrastructure for the
                total nationalization of the coal industry in the
                country.
              </p>

            </section>


            {/* =================================================
                NATIONALIZATION
            ================================================= */}

            <section className="mt-12">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Nationalization of Coal Mines
              </h2>

              <p className="mt-6 text-[15px] leading-7 text-gray-700 sm:text-base">
                A major event in the history of the Indian coal
                industry during the Fourth Plan Period (1969-74) was
                the nationalisation of the erstwhile privately owned
                coal mines in two phases.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                In the first phase, the management of coking coal
                mines was taken over by the Government of India on
                <strong> 17th October 1971</strong> and nationalization
                was effective from <strong>5th January 1972</strong>.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                A state-owned company, Bharat Coking Coal Ltd., was
                formed for managing coking coal mines.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                For convenience of management, BCCL collieries in the
                East Bokaro coalfields in Bihar (now Jharkhand) were
                transferred to NCDC, and its projects in the Central
                Jharia region, viz. Sudamdih and Moonidih deep shaft
                mines, were handed over in stages to BCCL.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                In the second phase of nationalisation, the management
                of non-coking coal mines in the country, excepting the
                captive coal mines of the two steel plants, TISCO and
                IISCO, was taken over by the Government on
                <strong> 31st January 1973</strong>.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                These mines were subsequently nationalized with
                effect from <strong>1st May 1973</strong> and another
                state-owned company, Coal Mines Authority Ltd. (CMAL),
                came into being with headquarters at Calcutta
                (now Kolkata) to manage and develop NCDC collieries
                and other newly nationalized units.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                NCDC itself, in this process, became a division of CMAL
                which owned 36 collieries under commercial production
                in Bihar, Orissa, Madhya Pradesh and Maharashtra,
                besides four coal washeries, one by-product coke oven
                plant, two large central workshops and manpower of
                about 71,000.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                The formation of CMAL witnessed regrouping of the coal
                mines into three divisions, namely Western, Central
                and Eastern. The regrouping had to be done for the
                convenience of management, keeping in view the
                geographical location of the collieries.
              </p>

            </section>


            {/* =================================================
                CENTRAL DIVISION
            ================================================= */}

            <section className="mt-10">

              <div className="rounded-xl border border-[#ab183d]/20 bg-[#ab183d]/5 p-5 sm:p-6">

                <h3 className="text-xl font-bold text-[#ab183d]">
                  Central Division
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-gray-700">
                  As a result, NCDC units located in the States of
                  Maharashtra and Madhya Pradesh, with the exception
                  of Singrauli Coalfields, became a part of the
                  Western Division.
                </p>

                <p className="mt-4 text-[15px] leading-7 text-gray-700">
                  The Central Division consisted of all the old
                  collieries of NCDC in Orissa and Bihar, except
                  Sudamdih and Moonidih which had been handed over to
                  BCCL, and those acquired by CMAL after takeover in
                  Giridih, East Bokaro, West Bokaro, South Karanpura,
                  North Karanpura, Hutar and Daltonganj Coalfields in
                  Bihar.
                </p>

                <p className="mt-4 text-[15px] leading-7 text-gray-700">
                  The Central Division consisted of
                  <strong> 64 collieries, four coal washeries, one
                  by-product coke oven plant, one bee-hive coke plant
                  and one central workshop</strong>, having a manpower
                  of approximately <strong>1,11,500</strong>.
                </p>

              </div>

            </section>


            {/* =================================================
                FORMATION OF CCL
            ================================================= */}

            <section className="mt-12">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Formation of CCL
              </h2>

              <p className="mt-6 text-[15px] leading-7 text-gray-700 sm:text-base">
                The CMAL, with its three divisions, continued up to
                <strong> 1st November 1975</strong> when it was renamed
                as Coal India Limited (CIL) following the decision of
                the Government of India to restructure the coal
                industry.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                The Central Division of CMAL came to be known as
                <strong> Central Coalfields Limited</strong> and became
                a separate company with the status of a subsidiary of
                Coal India Limited, which became the holding company.
              </p>

            </section>


            {/* =================================================
                TIMELINE
            ================================================= */}

            <section className="mt-14">

              <h2 className="mb-8 border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Important Milestones
              </h2>

              <div className="space-y-6">

                {/* 1956 */}

                <div className="flex gap-4">

                  <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-sm font-bold text-white">
                    1956
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Formation of NCDC
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      National Coal Development Corporation Ltd.
                      was established as a Government-owned company.
                    </p>
                  </div>

                </div>


                {/* 1971 */}

                <div className="flex gap-4">

                  <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-sm font-bold text-white">
                    1971
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Nationalization Begins
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Management of coking coal mines was taken over
                      by the Government of India.
                    </p>
                  </div>

                </div>


                {/* 1973 */}

                <div className="flex gap-4">

                  <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-sm font-bold text-white">
                    1973
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Non-Coking Coal Nationalization
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Non-coking coal mines were subsequently
                      nationalized and CMAL came into existence.
                    </p>
                  </div>

                </div>


                {/* 1975 */}

                <div className="flex gap-4">

                  <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-sm font-bold text-white">
                    1975
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Formation of CCL
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Central Division of CMAL became Central
                      Coalfields Limited on 1st November 1975.
                    </p>
                  </div>

                </div>


                {/* 2007 */}

                <div className="flex gap-4">

                  <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-sm font-bold text-white">
                    2007
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Category-I Mini-Ratna
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      CCL achieved Category-I Mini-Ratna Company
                      status in October 2007.
                    </p>
                  </div>

                </div>


                {/* 2023-24 */}

                <div className="flex gap-4">

                  <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-xs font-bold text-white">
                    2023-24
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Highest-Ever Coal Production
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      CCL achieved its highest-ever coal production
                      of 86.054 million tonnes.
                    </p>
                  </div>

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

                <a
                  href="/about-us/history"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  History
                </a>

                <a
                  href="/about-us/vision-mission"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Vision & Mission
                </a>

                <a
                  href="/about-us/company-profile"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Company Profile
                </a>

                <a
                  href="/about-us/profile"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Profile
                </a>

                <a
                  href="/about-us/rti-infrastructure"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  RTI Act / Infrastructure
                </a>

                <a
                  href="/about-us/iso-ohsas-certification"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  ISO/OHSAS Certification
                </a>

                <a
                  href="/about-us/corporate-structure"
                  className="block px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Corporate Structure
                </a>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}
