import {
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";


export default function FooterTop() {

  const quickLinks = [
    {
      title: "Utkarsh Magazine",
      url: "#",
    },
    {
      title: "CCL OBS",
      url: "#",
    },
    {
      title: "Corporate Geet",
      url: "#",
    },
    {
      title: "Site Map",
      url: "#",
    },
    {
      title: "ESS/MSS",
      url: "#",
    },
    {
      title: "SAP GUI Users Setup",
      url: "#",
    },
    {
      title: "Apni Baat",
      url: "#",
    },
    {
      title: "Samvaad Application",
      url: "#",
    },
  ];


  return (
    <div className="bg-[#1b1b1b] text-white py-10">

      <div className="max-w-[1000px] mx-auto px-4">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">


          {/* QUICK LINKS */}

          <div>

            <h4 className="
              text-lg
              font-bold
              uppercase
              mb-4
            ">
              Quick Links
            </h4>


            <div className="
              w-16
              h-[2px]
              bg-white
              mb-4
            "></div>



            <ul className="space-y-3">

              {quickLinks.map((item,index)=>(

                <li key={index}>

                  <a
                    href={item.url}
                    target="_blank"
                    className="
                      text-gray-200
                      hover:text-white
                      text-sm
                    "
                  >
                    {item.title}
                  </a>

                </li>

              ))}

            </ul>

          </div>




          {/* CONTACT */}

          <div>


            <h4 className="
              text-lg
              font-bold
              uppercase
              mb-4
            ">
              Contact us
            </h4>


            <div className="
              w-16
              h-[2px]
              bg-white
              mb-4
            "></div>



            <ul className="space-y-5 text-sm">


              <li className="flex gap-3">

                <FaMapMarkerAlt className="text-xl mt-1"/>


                <div>

                  <strong>
                    Address
                  </strong>

                  <p>
                    Central Coalfields Limited
                    <br/>
                    Darbhanga House,
                    Kutchery Road,
                    <br/>
                    Ranchi-834029,
                    Jharkhand
                  </p>

                </div>


              </li>



              <li className="flex gap-3">

                <FaPhone className="text-xl mt-1"/>


                <div>

                  <strong>
                    Toll Free (Samadhan Cell)
                  </strong>

                  <p>
                    18003456501
                  </p>


                  <strong>
                    Whatsapp no.
                  </strong>

                  <p>
                    7250141999
                  </p>

                </div>


              </li>



            </ul>


          </div>



          {/* Empty column (for future twitter/social) */}

          <div>

          </div>



        </div>


      </div>


    </div>
  );
}