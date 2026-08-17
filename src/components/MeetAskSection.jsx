import { Link } from "react-router-dom";

export default function JobHighlightSection() {
  return (
    <section className="relative z-[100] bg-yellow-300">
      <div className="max-w-[1000px] mx-auto px-4">

        <div className="
          py-4
          flex
          items-center
          justify-between
          gap-4
        ">


          {/* Job Details */}

          <div className="flex-1">

            <h3
              className="
                text-[18px]
                md:text-[21px]
                text-[#1A237E]
                font-bold
              "
            >
              CCL Recruitment 2026 - Apply Online for Various Posts
            </h3>


            <p
              className="
                text-sm
                text-gray-700
                mt-1
              "
            >
              Latest job notification, eligibility, important dates and application details.
            </p>


          </div>




          {/* Full Details Button */}

          <div>

            <Link
              to="/job-details"
              className="
                bg-[#ab183d]
                text-white
                px-5
                py-2
                rounded
                font-semibold
                text-sm
                whitespace-nowrap
                hover:bg-red-800
                transition
              "
            >
              See Full Details
            </Link>

          </div>


        </div>


      </div>
    </section>
  );
}