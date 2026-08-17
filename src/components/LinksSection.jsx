import {
  FaPlusSquare,
  FaBan,
  FaLink,
  FaGavel,
  FaList,
  FaUsers,
} from "react-icons/fa";

export default function LinksSection() {

  const links = [
    {
      title: "Online Report Delivery System",
      icon: <FaPlusSquare />,
      url: "#",
    },
    {
      title: "CPRMSE/NE",
      icon: <FaBan />,
      url: "#",
    },
    {
      title: "Complaint Desk",
      icon: <FaLink />,
      url: "#",
    },
    {
      title: "CPGRAMS",
      icon: <FaLink />,
      url: "http://pgportal.gov.in/",
    },
    {
      title: "eMB & eBilling Ecosystem",
      icon: <FaLink />,
      url: "#",
    },
    {
      title: "e-auction",
      icon: <FaGavel />,
      url: "#",
    },
    {
      title: "e-Office",
      icon: <FaLink />,
      url: "#",
    },
    {
      title: "CIL WHISTLE BLOWER POLICY",
      icon: <FaGavel />,
      url: "#",
    },
    {
      title: "TReDS",
      icon: <FaLink />,
      url: "#",
    },
    {
      title: "Vendor Grievance Redressal Committee",
      icon: <FaLink />,
      url: "#",
    },
    {
      title: "Holiday-List",
      icon: <FaList />,
      url: "#",
    },
    {
      title: "Human Resource Development",
      icon: <FaUsers />,
      url: "#",
    },
    {
      title: "PIDPI",
      icon: <FaLink />,
      url: "#",
    },
    {
      title: "CCL Departmental Circulars",
      icon: <FaLink />,
      url: "#",
    },
    {
      title: "Sexual Harassment electronic Box Portal (She-Box)",
      icon: <FaLink />,
      url: "#",
    },
  ];


  return (
    <section
      className="
        bg-cover
        bg-center
        py-12
        relative
      "
      style={{
        backgroundImage:
          "url('/assets/bg1.jpg')",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/100"></div>


      <div className="relative max-w-[1000px] mx-auto px-4">


        {/* Heading */}

        <div className="text-center text-white mb-8">

          <h2 className="text-3xl font-bold uppercase">
            Links
          </h2>


          <div className="w-20 h-1 bg-white mx-auto mt-3"></div>

        </div>



        {/* Cards */}

        <div className="
          grid 
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-6
        ">


          {links.map((item,index)=>(

            <div
              key={index}
              className="
                text-center
                mb-8
              "
            >


              {/* Icon */}

              <a
                href={item.url}
                target="_blank"
                className="
                  mx-auto
                  flex
                  items-center
                  justify-center
                  w-[70px]
                  h-[70px]
                  rounded-full
                  border-2
                  border-white
                  text-white
                  text-3xl
                  hover:bg-white
                  hover:text-blue-700
                  transition
                "
              >
                {item.icon}

              </a>



              {/* Title */}

              <h5
                className="
                  mt-5
                  text-white
                  text-sm
                  font-semibold
                  uppercase
                "
              >
                {item.title}
              </h5>


            </div>


          ))}


        </div>


      </div>
    

    </section>
  );
}