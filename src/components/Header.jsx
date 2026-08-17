import {
  FaHome,
  FaShieldAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="w-full bg-[#1b1b1b]">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 lg:px-10">
        <div className="flex justify-end py-2">
          <ul className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-5">

            <li>
              <a
                href="https://www.centralcoalfields.in/ind/index_h.php"
                target="_blank"
                rel="noreferrer"
              >
                <FaHome className="text-yellow-300 text-lg sm:text-2xl hover:scale-110 transition" />
              </a>
            </li>

            <li>
              <a
                href="../../ind/cybercrime/cyberpage.php"
                target="_blank"
                rel="noreferrer"
              >
                <FaShieldAlt className="text-red-600 text-lg sm:text-2xl hover:scale-110 transition" />
              </a>
            </li>

            <li>
              <a
                href="https://www.facebook.com/CentralCoalfieldsLtd/?fref=ts"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF className="text-blue-500 text-lg sm:text-2xl hover:scale-110 transition" />
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com/cclranchi"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter className="text-sky-400 text-lg sm:text-2xl hover:scale-110 transition" />
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/centralcoalfieldsltd/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="text-pink-300 text-lg sm:text-2xl hover:scale-110 transition" />
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/company/central-coalfields-limited"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn className="text-blue-500 text-lg sm:text-2xl hover:scale-110 transition" />
              </a>
            </li>

            <li>
              <a
                href="https://www.youtube.com/channel/UCsIb8i_OoYZU6xDeMbXa8Zw"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube className="text-red-600 text-lg sm:text-2xl hover:scale-110 transition" />
              </a>
            </li>

            <li>
              <a
                href="../../hindi/ind/indexh.php"
                className="text-white text-sm sm:text-base font-semibold hover:text-yellow-300"
              >
                हिन्दी
              </a>
            </li>

            <li>
              <a
                href="../../ind/help.php"
                className="text-white text-sm sm:text-base font-semibold hover:text-yellow-300"
              >
                Help
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}