import {
  FaGavel,
  FaFolder,
  FaBook,
  FaClipboard,
  FaImage,
  FaEnvelope,
} from "react-icons/fa";

export default function QuickLinks() {
  const links = [
    {
      title: "Tenders",
      icon: <FaGavel />,
      url: "http://27.0.244.4/tender/",
    },
    {
      title: "Directory",
      icon: <FaFolder />,
      url: "https://www.centralcoalfields.in/contt/contact.php",
    },
    {
      title: "Circulars/Docs",
      icon: <FaBook />,
      url: "http://www.centralcoalfields.in/indsk/crclrs.php",
    },
    {
      title: "Notices",
      icon: <FaClipboard />,
      url: "http://www.centralcoalfields.in/indsk/ntcs_new.php",
    },
    {
      title: "Gallery",
      icon: <FaImage />,
      url: "http://www.centralcoalfields.in/nwmdi/glry_new.php",
    },
    {
      title: "Web-Mail",
      icon: <FaEnvelope />,
      url: "https://mail.gov.in/",
    },
  ];

  return (
    <section>
      <div className="max-w-[1000px] mx-auto px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

          {links.map((item, index) => (
            <div
              key={index}
              className="
                mt-10
                mb-7
                p-6
                text-center
                border
                border-gray-200
                bg-white
                shadow-sm
                hover:shadow-md
                transition
              "
            >

              {/* Icon */}
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  justify-center
                  mx-auto
                  w-[60px]
                  h-[60px]
                  rounded-full
                  border-2
                  border-blue-500
                  text-blue-600
                  text-2xl
                  bg-white
                  hover:bg-blue-600
                  hover:text-white
                  transition
                "
              >
                {item.icon}
              </a>


              {/* Title */}
              <div className="mt-10">
                <h5 className="
                  text-sm
                  font-bold
                  uppercase
                  text-gray-800
                ">
                  {item.title}
                </h5>
              </div>


            </div>
          ))}

        </div>

      </div>
    </section>
  );
}