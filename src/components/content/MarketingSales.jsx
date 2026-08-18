import React from "react";
import { Link } from "react-router-dom";

export default function LinkageAuction() {
  const items = [
    {
      number: "01",
      title: "Linkage Auction Policy",
      path: "/business/marketing-sales/linkage-auction/policy",
    },
    {
      number: "02",
      title: "Scheme Documents",
      path: "/business/marketing-sales/linkage-auction/scheme-documents",
    },
    {
      number: "03",
      title: "Model FSA",
      path: "/business/marketing-sales/linkage-auction/model-fsa",
    },
    {
      number: "04",
      title: "Notices",
      path: "/business/marketing-sales/linkage-auction/notices",
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

            <Link
              to="/business/marketing-sales"
              className="transition hover:underline"
            >
              Marketing & Sales
            </Link>

            <span>/</span>

            <span>
              Linkage Auction
            </span>

          </div>


          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Linkage Auction
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 sm:text-base">
            Policies, scheme documents, model FSA and notices related
            to Linkage Auction.
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
                Marketing & Sales
              </h2>

              <p className="mt-1 text-base font-semibold text-[#ab183d]">
                Linkage Auction
              </p>

            </div>


            <p className="mt-6 text-[15px] leading-7 text-gray-700 sm:text-base">
              Select an option below to access information and
              documents related to Linkage Auction.
            </p>


            {/* =================================================
                LINKAGE AUCTION ITEMS
            ================================================= */}
            <div className="mt-8 space-y-4">

              {items.map((item) => (

                <Link
                  key={item.number}
                  to={item.path}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#ab183d] hover:bg-[#ab183d]/5 hover:shadow-md sm:p-6"
                >

                  <div className="flex items-center gap-4">

                    {/* Number */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ab183d] text-sm font-bold text-white">
                      {item.number}
                    </div>

                    {/* Title */}
                    <div>

                      <h3 className="text-base font-bold text-gray-800 transition group-hover:text-[#ab183d] sm:text-lg">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        View {item.title}
                      </p>

                    </div>

                  </div>


                  {/* Arrow */}
                  <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-[#ab183d] transition group-hover:bg-[#ab183d] group-hover:text-white">
                    →
                  </div>

                </Link>

              ))}

            </div>


            {/* =================================================
                INFORMATION BOX
            ================================================= */}
            <div className="mt-10 rounded-xl border border-[#ab183d]/20 bg-[#ab183d]/5 p-5 sm:p-6">

              <h3 className="text-lg font-bold text-[#ab183d]">
                Linkage Auction
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700 sm:text-[15px]">
                Information relating to Linkage Auction Policy,
                Scheme Documents, Model FSA and Notices is available
                through the options above.
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
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Financial
                </Link>


                {/* Marketing & Sales */}
                <Link
                  to="/business/marketing-sales"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Marketing & Sales
                </Link>


                {/* Linkage Auction */}
                <Link
                  to="/business/marketing-sales/linkage-auction"
                  className="block border-b border-gray-100 bg-[#ab183d]/5 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Linkage Auction
                </Link>


                {/* Other Business */}
                <Link
                  to="/business"
                  className="block px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Business Overview
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}