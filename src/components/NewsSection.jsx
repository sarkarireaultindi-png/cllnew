import { useState } from "react";

export default function NewsSection() {
  const cclNews = [
    "CCL Launches Navchetna Campaign",
    "CCL Conducts ERP Capacity Program",
    "CCL Completes CIPET Training Program",
    "CCL Shines in CIL Badminton",
    "Global Mining Delegation Visit to CCL",
  ];

  const whatsNew = [
    "List of Eligible candidates selected against the Internal Notification for selection to the post of Clerk Grade:III (T)",
    "Notification Regarding Written Examination for Selection to the Post of Clerk Grade-III",
    "List of Eligible/ Non Eligible candidates received against the Internal Notification for selection to the post of Clerk Grade:III (T)",
    "Notification Regarding Eligibility of Candidates and Conduct of Written Examination for Selection to the Post of Clerk",
    "CCL ke Lal Laadli Merit List Batch 2026-28",
    "WED Celebration at Areas and CCL HQ 2026",
    "Banning /delisting of M/s DNC Infrastructure Private Limited",
  ];

  return (
    <section className="">
      <div className="max-w-[1000px] mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">

          {/* CCL NEWS */}
          <div className="lg:col-span-4">
            <div className="bg-white shadow-md p-5">
              
              <h3 className="text-xl font-bold mb-4">
                CCL News
              </h3>

              <div className="h-[208px] overflow-hidden">
                <div className="news-scroll">
                  {cclNews.map((item,index)=>(
                    <div 
                      key={index}
                      className="py-3"
                    >
                      <a
                        href="#"
                        className="text-[#0033FF] font-semibold"
                      >
                        {item}
                      </a>
                    </div>
                  ))}

                  {cclNews.map((item,index)=>(
                    <div 
                      key={`copy-${index}`}
                      className="py-3"
                    >
                      <a
                        href="#"
                        className="text-[#0033FF] font-semibold"
                      >
                        {item}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>



          {/* WHAT'S NEW */}
          <div className="lg:col-span-4">
            <div className="bg-white shadow-md p-5">

              <h3 className="text-xl font-bold mb-4">
                What's New
              </h3>

              <div className="h-[208px] overflow-hidden">

                <div className="news-scroll-slow">

                {whatsNew.map((item,index)=>(
                  <div
                    key={index}
                    className="py-3"
                  >
                    <a
                      href="#"
                      className="text-[#0033FF] font-semibold text-sm"
                    >
                      {item}
                    </a>

                    <img
                      src="/assets/new.gif"
                      className="inline ml-2"
                    />
                  </div>
                ))}

                </div>

              </div>

            </div>
          </div>




          {/* CHAIRMAN DESK */}
          <div className="lg:col-span-4">

            <div className="bg-white shadow-md p-5">

              <h3 className="text-xl font-bold mb-5">
                Chairman's Desk
              </h3>


              <div className="text-center">

                <img
                  src="/assets/cmd_img.jpeg"
                  alt="CMD"
                  className="
                    w-[190px]
                    h-[180px]
                    mx-auto
                    border-2
                    border-white
                    shadow-[1px_0_3px_black]
                  "
                />


                <p className="mt-2 text-black font-semibold text-[15px]">
                  SHRI. NILENDU KUMAR SINGH
                </p>


                <p className="text-black text-[11px] font-bold">
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