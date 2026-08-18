import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NewsSection() {
  const [cclPaused, setCclPaused] = useState(false);
  const [whatsNewPaused, setWhatsNewPaused] = useState(false);

  const cclNews = [
    {
      title: "CCL Launches Navchetna Campaign",
      link: "/news/navchetna-campaign",
    },
    {
      title: "CCL Conducts ERP Capacity Program",
      link: "/news/ccl-conducts",
    },
    {
      title: "CCL Completes CIPET Training Program",
      link: "/news/ccl-complete",
    },
    {
      title: "CCL Shines in CIL Badminton",
      link: "/news/ccl-shine",
    },
    {
      title: "Global Mining Delegation Visit to CCL",
      link: "/news/global-mining-delegation",
    },
  ];

  const whatsNew = [
    
    {
      title:
        "Notification for engagement of full time Advisor (Excavation) at WCL",
      link: "/",
      pdf: "/assets/1340162318",
    },
    {
      title:
        "Notice regarding written examination for departmental selection to the post of Translator (Trainee/OL), Clerical Grade-III",
      link: "/",
      pdf: "/assets/1338164015.pdf",
    },
    {
      title: "List of Eligible and Not Eligible candidates Written Examination for their selection to the post of Jr. Chemist in T&S Grade-D",
      link: "/",
      pdf: "/assets/1337113827.pdf",
    },
    {
      title: "List of eligible candidates for appearing in written exam for selection to the post of Peon(T&S Grade: �H�)",
      link: "/",
      pdf: "/assets/1335113542.pdf",
    },
    {
      title:
        "List of Candidates those who have applied for the selection to the post of PEON- T&S GRADE",
      link: "/",
      pdf: "/assets/1334161532.pdf",
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-[1000px] px-4">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">

          {/* =====================================================
              CCL NEWS
          ===================================================== */}
          <div className="lg:col-span-4">
            <div className="bg-white p-5 shadow-md">

              <h3 className="mb-4 text-xl font-bold">
                CCL News
              </h3>

              <div
                className="h-[208px] overflow-hidden"
                onMouseEnter={() => setCclPaused(true)}
                onMouseLeave={() => setCclPaused(false)}
              >
                <div
                  className={`news-scroll ${
                    cclPaused ? "news-paused" : ""
                  }`}
                >

                  {/* Original */}
                  {cclNews.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 py-3"
                    >
                      <Link
                        to={item.link}
                        className="font-semibold text-[#0033FF] transition hover:text-[#ab183d] hover:underline"
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}

                  {/* Duplicate */}
                  {cclNews.map((item, index) => (
                    <div
                      key={`copy-${index}`}
                      className="border-b border-gray-100 py-3"
                    >
                      <Link
                        to={item.link}
                        className="font-semibold text-[#0033FF] transition hover:text-[#ab183d] hover:underline"
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>


          {/* =====================================================
              WHAT'S NEW
          ===================================================== */}
          <div className="lg:col-span-4">

            <div className="bg-white p-5 shadow-md">

              <h3 className="mb-4 text-xl font-bold">
                What's New
              </h3>

              <div
                className="h-[208px] overflow-hidden"
                onMouseEnter={() => setWhatsNewPaused(true)}
                onMouseLeave={() => setWhatsNewPaused(false)}
              >

                <div
                  className={`news-scroll-slow ${
                    whatsNewPaused ? "news-paused" : ""
                  }`}
                >

                  {/* Original */}
                  {whatsNew.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 py-3"
                    >

                      <div className="flex items-start gap-2">

                        {/* PDF Link */}
                        <a
                          href={item.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold leading-6 text-[#0033FF] transition hover:text-[#ab183d] hover:underline"
                        >
                          {item.title}
                        </a>

                        <img
                          src="/assets/new.gif"
                          alt="New"
                          className="mt-1 inline-block h-auto shrink-0"
                        />

                      </div>

                    </div>
                  ))}


                  {/* Duplicate */}
                  {whatsNew.map((item, index) => (
                    <div
                      key={`copy-${index}`}
                      className="border-b border-gray-100 py-3"
                    >

                      <div className="flex items-start gap-2">

                        {/* PDF Link */}
                        <a
                          href={item.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold leading-6 text-[#0033FF] transition hover:text-[#ab183d] hover:underline"
                        >
                          {item.title}
                        </a>

                        <img
                          src="/assets/new.gif"
                          alt="New"
                          className="mt-1 inline-block h-auto shrink-0"
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>
          </div>


          {/* =====================================================
              CHAIRMAN DESK
          ===================================================== */}
          <div className="lg:col-span-4">

            <div className="bg-white p-5 shadow-md">

              <h3 className="mb-5 text-xl font-bold">
                Chairman's Desk
              </h3>

              <div className="text-center">

                <img
                  src="/assets/cmd_img.jpeg"
                  alt="Shri Nilendu Kumar Singh"
                  className="
                    mx-auto
                    h-[180px]
                    w-[190px]
                    border-2
                    border-white
                    shadow-[1px_0_3px_black]
                  "
                />

                <p className="mt-2 text-[15px] font-semibold text-black">
                  SHRI. NILENDU KUMAR SINGH
                </p>

                <p className="text-[11px] font-bold text-black">
                  Chairman-cum-Managing Director, CCL
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}