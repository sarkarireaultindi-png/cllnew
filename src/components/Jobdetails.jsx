import { Link } from "react-router-dom";

export default function JobDetails() {

  const posts = [
    {
      name: "Multi Tasking Staff (MTS)",
      vacancy: 3554,
      qualification: "10th Pass",
      category: {
        general: 1400,
        obc: 1200,
        sc: 380,
        st: 340,
        ews: 234
      }
    },

    {
      name: "Lower Division Clerk (LDC)",
      vacancy: 2479,
      qualification: "12th Pass + Typing",
      category: {
        general: 1100,
        obc: 900,
        sc: 150,
        st: 150,
        ews: 179
      }
    },

    {
      name: "Upper Division Clerk (UDC)",
      vacancy: 1798,
      qualification: "Graduate",
      category: {
        general: 860,
        obc: 640,
        sc: 125,
        st: 115,
        ews: 58
      }
    },

    {
      name: "Assistant Section Officer (ASO)",
      vacancy: 873,
      qualification: "Graduate",
      category: {
        general: 340,
        obc: 260,
        sc: 100,
        st: 100,
        ews: 73
      }
    }
  ];


  return (
    <section className="bg-gray-100 py-6 sm:py-10">

      <div className="max-w-[1000px] mx-auto px-3 sm:px-5">


        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">


          <h1 className="
          text-xl sm:text-2xl
          font-bold
          text-[#ab183d]
          border-b
          pb-3
          mb-5
          ">
            Recruitment 2026
          </h1>



          {
            posts.map((post,index)=>(

              <div
              key={index}
              className="
              border
              rounded-lg
              p-4
              sm:p-5
              mb-5
              hover:shadow-md
              transition
              ">


                <h2 className="
                text-lg
                sm:text-xl
                font-bold
                text-blue-700
                mb-4
                ">
                  {post.name}
                </h2>



                {/* Basic Details */}

                <div className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-3
                ">


                  <div className="
                  bg-gray-50
                  rounded
                  p-3
                  ">
                    <span className="font-semibold block">
                      Vacancy
                    </span>

                    <span>
                      {post.vacancy} Posts
                    </span>
                  </div>



                  <div className="
                  bg-gray-50
                  rounded
                  p-3
                  ">
                    <span className="font-semibold block">
                      Qualification
                    </span>

                    <span>
                      {post.qualification}
                    </span>
                  </div>



                  <div className="
                  bg-gray-50
                  rounded
                  p-3
                  ">
                    <span className="font-semibold block">
                      Type
                    </span>

                    <span>
                      Government Job
                    </span>
                  </div>


                </div>




                <h3 className="
                mt-5
                mb-3
                font-bold
                text-[#ab183d]
                ">
                  Category Wise Vacancy
                </h3>




                <div className="
                grid
                grid-cols-2
                sm:grid-cols-5
                gap-2
                ">


                {
                  Object.entries(post.category).map(
                    ([key,value])=>(

                    <div
                    key={key}
                    className="
                    bg-gray-100
                    rounded
                    p-3
                    text-center
                    "
                    >

                      <p className="
                      text-xs
                      sm:text-sm
                      uppercase
                      font-semibold
                      ">
                        {key}
                      </p>

                      <p className="
                      text-lg
                      font-bold
                      text-blue-700
                      ">
                        {value}
                      </p>

                    </div>

                  ))
                }


                </div>



              </div>

            ))
          }




          {/* Fee */}

          <h2 className="
          text-lg
          sm:text-xl
          font-bold
          text-[#ab183d]
          mt-8
          mb-4
          ">
            Application Fee
          </h2>




          <div className="
          grid
          grid-cols-2
          sm:grid-cols-4
          gap-3
          ">


            {
              [
                ["General","₹500"],
                ["OBC","₹500"],
                ["SC/ST","₹500"],
                ["Female","₹500"]
              ]
              .map((fee,index)=>(

                <div
                key={index}
                className="
                border
                rounded
                p-3
                text-center
                "
                >

                  <p className="font-semibold">
                    {fee[0]}
                  </p>

                  <p className="text-[#ab183d] font-bold">
                    {fee[1]}
                  </p>

                </div>

              ))
            }


          </div>





          <Link
          to="/apply"
          className="
          block
          text-center
          mt-8
          bg-[#ab183d]
          hover:bg-red-800
          text-white
          py-3
          rounded-lg
          font-bold
          transition
          "
          >

            Apply Now

          </Link>



        </div>


      </div>


    </section>
  );
}