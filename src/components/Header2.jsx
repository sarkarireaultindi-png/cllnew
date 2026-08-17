import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | CHECK LOGIN
  |--------------------------------------------------------------------------
  */

  const userId = localStorage.getItem("userId");
  const isLoggedIn = Boolean(userId);

  /*
  |--------------------------------------------------------------------------
  | MENU
  |--------------------------------------------------------------------------
  */

  const menus = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "Apply",
      path: "/apply-vacancy",
    },
    {
      name: "Business",
      path: "/business",
    },
    {
      name: "Sustainability",
      path: "/sustainability",
    },
    {
      name: "Vigilance",
      path: "/vigilance",
    },
    {
      name: "Info Desk",
      path: "/info-desk",
    },
    {
      name: "CZone",
      path: "/czone",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  const handleLogout = () => {
    localStorage.removeItem("userId");

    setProfileMenu(false);
    setMobileMenu(false);

    navigate("/");
  };

  return (
    <header className="w-full shadow-md">

      {/* Header */}

      <div className="bg-[#f7d200]">

        <div className="mx-auto flex max-w-[1200px] items-center justify-between">

          {/* Logo */}

          <div className="flex items-center bg-black px-4 py-2">

            <Link to="/">
              <img
                src="/assets/CCL_LOGO2_final.jpg"
                alt="CCL Logo"
                className="h-14 cursor-pointer md:h-16"
              />
            </Link>

          </div>

          {/* Desktop Menu */}

          <nav className="hidden lg:block">

            <ul className="flex items-center">

              {menus.map((menu) => (

                <li
                  key={menu.name}
                  className="relative group"
                >

                  <Link
                    to={menu.path}
                    className="flex items-center gap-2 px-5 py-7 text-[15px] font-semibold text-gray-800 transition hover:bg-[#d6b300]"
                  >
                    {menu.name}

                    <FaChevronDown className="text-[10px]" />
                  </Link>

                </li>

              ))}

              {/* Profile */}

              {isLoggedIn && (

                <li className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setProfileMenu(!profileMenu)
                    }
                    className="flex items-center gap-2 px-5 py-6 text-[15px] font-semibold text-gray-800 transition hover:bg-[#d6b300]"
                  >

                    <FaUserCircle className="text-lg" />

                    <span>
                      Profile
                    </span>

                    <FaChevronDown className="text-[10px]" />

                  </button>

                  {/* Profile Dropdown */}

                  {profileMenu && (

                    <div className="absolute right-0 top-full z-50 w-52 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">

                      <Link
                        to="/profile"
                        state={{ userId }}
                        onClick={() =>
                          setProfileMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                      >

                        <FaUserCircle className="text-[#ab183d]" />

                        My Profile

                      </Link>

                      <Link
                        to="/user-Profile"
                        state={{ userId }}
                        onClick={() =>
                          setProfileMenu(false)
                        }
                        className="flex items-center gap-3 border-t border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                      >

                        <span className="text-[#ab183d]">
                          🎓
                        </span>

                        View Documents

                      </Link>
                      <Link
    to="/download-application"
    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
  >
    <span>📄 Download / Print Application</span>
    <span>→</span>
  </Link>


                      {/* Logout */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 border-t border-gray-200 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >

                        <FaSignOutAlt />

                        Logout

                      </button>

                    </div>

                  )}

                </li>

              )}

            </ul>

          </nav>

          {/* Mobile Menu Button */}

          <button
            type="button"
            className="p-4 text-2xl lg:hidden"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            aria-label="Toggle menu"
          >

            {mobileMenu ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}

          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {mobileMenu && (

        <div className="bg-[#f7d200] shadow-lg lg:hidden">

          {menus.map((menu) => (

            <div
              key={menu.name}
              className="border-b border-yellow-600"
            >

              <Link
                to={menu.path}
                onClick={() =>
                  setMobileMenu(false)
                }
                className="flex w-full items-center justify-between px-5 py-4 font-semibold transition hover:bg-[#d6b300]"
              >

                <span>
                  {menu.name}
                </span>

                <FaChevronDown />

              </Link>

            </div>

          ))}

          {/* Mobile Profile */}

          {isLoggedIn && (

            <div className="border-t-2 border-yellow-700">

              <button
                type="button"
                onClick={() =>
                  setProfileMenu(!profileMenu)
                }
                className="flex w-full items-center justify-between px-5 py-4 font-semibold transition hover:bg-[#d6b300]"
              >

                <span className="flex items-center gap-2">

                  <FaUserCircle />

                  Profile

                </span>

                <FaChevronDown />

              </button>

              {profileMenu && (

                <div className="bg-yellow-100">

                  <Link
                    to="/user-profile"
                    state={{ userId }}
                    onClick={() => {
                      setMobileMenu(false);
                      setProfileMenu(false);
                    }}
                    className="block border-t border-yellow-300 px-8 py-3 text-sm font-semibold"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/qualification-details"
                    state={{ userId }}
                    onClick={() => {
                      setMobileMenu(false);
                      setProfileMenu(false);
                    }}
                    className="block border-t border-yellow-300 px-8 py-3 text-sm font-semibold"
                  >
                    Qualification
                  </Link>

                  <Link
                    to="/documents-upload"
                    state={{ userId }}
                    onClick={() => {
                      setMobileMenu(false);
                      setProfileMenu(false);
                    }}
                    className="block border-t border-yellow-300 px-8 py-3 text-sm font-semibold"
                  >
                    Documents
                  </Link>

                  <Link
                    to="/fee-details"
                    state={{ userId }}
                    onClick={() => {
                      setMobileMenu(false);
                      setProfileMenu(false);
                    }}
                    className="block border-t border-yellow-300 px-8 py-3 text-sm font-semibold"
                  >
                    Fee Details
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 border-t border-yellow-300 px-8 py-3 text-left text-sm font-semibold text-red-600"
                  >

                    <FaSignOutAlt />

                    Logout

                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      )}

    </header>
  );
}