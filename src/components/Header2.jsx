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
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [profileMenu, setProfileMenu] = useState(false);

  const navigate = useNavigate();

  // --------------------------------------------------
  // LOGIN CHECK
  // --------------------------------------------------

  const userId = localStorage.getItem("userId");
  const isLoggedIn = Boolean(userId);

  // --------------------------------------------------
  // MENU
  // --------------------------------------------------

  const menus = [
    {
      name: "Home",
      path: "/",
    },

    // ------------------------------------------------
    // ABOUT US
    // ------------------------------------------------

    {
      name: "About Us",
      path: "/about-us",
      submenu: [
        {
          name: "History",
          path: "/about-us/history",
        },
        {
          name: "Vision and Mission",
          path: "/about-us/vision-mission",
        },
        {
          name: "Company Profile",
          path: "/about-us/company-profile",
        },

        {
          name: "RTI Act / Infrastructure",
          path: "/about-us/rti-infrastructure",
        },
        {
          name: "ISO/OHSAS Certification",
          path: "/about-us/iso-ohsas-certification",
        },
      ],
    },

    // ------------------------------------------------
    // APPLY
    // ------------------------------------------------

    {
      name: "Apply",
      path: "/apply-vacancy",
    },

    // ------------------------------------------------
    // PERFORMANCE
    // ------------------------------------------------

    {
      name: "Performance",
      path: "/performance",
      submenu: [
        {
          name: "Financial",
          path: "/performance/Annual",
        },
      ],
    },

    // ------------------------------------------------
    // BUSINESS
    // ------------------------------------------------

    {
      name: "Business",
      path: "/business",
      submenu: [
        {
          name: "Marketing and Sales",
          path: "/business/marketing-sales",
        },
        {
          name: "Materials Management",
          path: "/business/marketing-material",
        },
        {
          name: "Quality",
          path: "/business/Quality",
        },
        {
          name: "Work Order",
          path: "/business/marketing-sales",
        },
      ],
    },

    // ------------------------------------------------
    // SUSTAINABILITY
    // ------------------------------------------------

    {
      name: "Sustainability",
      path: "/sustainability",
      submenu: [
        {
          name: "Safety",
          path: "/sustainability/Safety",
        },
        {
          name: "Welfare",
          path: "/sustainability/Welfare",
        },
        {
          name: "Health",
          path: "/sustainability/Health",
        },
        {
          name: "Environment",
          path: "/sustainability/Environment",
        },
      ],
    },

    // ------------------------------------------------
    // VIGILANCE
    // ------------------------------------------------

    {
      name: "Vigilance",
      path: "/vigilance",
      submenu: [
        {
          name: "General Instructions for lodging Complaints",
          path: "/vigilance/complaints",
        },
        {
          name: "Vigilance Integrity Pact Programme",
          path: "/vigilance/intgrtctprgm",
        },
        {
          name: "Vigilance Awareness Campaign",
          path: "/vigilance/capacity-building",
        },
        {
          name: "Standard Operating Procedure",
          path: "/vigilance/sopSvig",
        },
      ],
    },

    // ------------------------------------------------
    // INFO DESK
    // ------------------------------------------------
  ];

  // --------------------------------------------------
  // CLOSE ALL MENUS
  // --------------------------------------------------

  const closeMenus = () => {
    setMobileMenu(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
    setProfileMenu(false);
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem("userId");

    closeMenus();

    navigate("/");
  };

  // --------------------------------------------------
  // DESKTOP DROPDOWN
  // --------------------------------------------------

  const handleDesktopDropdown = (name) => {
    setDesktopDropdown(desktopDropdown === name ? null : name);
  };

  // --------------------------------------------------
  // MOBILE DROPDOWN
  // --------------------------------------------------

  const handleMobileDropdown = (name) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* ==================================================
          MAIN HEADER
      ================================================== */}

      <div className="bg-[#f7d200]">
        <div className="mx-auto flex min-h-[80px] max-w-[1400px] items-center justify-between">
          {/* ==================================================
              LOGO
          ================================================== */}

          <div className="flex items-center bg-black px-3 py-2 sm:px-4">
            <Link to="/" onClick={closeMenus}>
              <img
                src="/assets/CCL_LOGO2_final.jpg"
                alt="CCL Logo"
                className="h-12 w-auto cursor-pointer object-contain sm:h-14 md:h-16"
              />
            </Link>
          </div>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav className="hidden lg:block">
            <ul className="flex items-center">
              {menus.map((menu) => (
                <li
                  key={menu.name}
                  className="group relative"
                  onMouseEnter={() => {
                    if (menu.submenu) {
                      setDesktopDropdown(menu.name);
                    }
                  }}
                  onMouseLeave={() => {
                    if (menu.submenu) {
                      setDesktopDropdown(null);
                    }
                  }}
                >
                  {/* MENU WITH SUBMENU */}

                  {menu.submenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDesktopDropdown(menu.name)}
                        className="flex items-center gap-2 px-4 py-7 text-[14px] font-semibold text-gray-800 transition hover:bg-[#d6b300] xl:px-5 xl:text-[15px]"
                      >
                        {menu.name}

                        <FaChevronDown
                          className={`text-[9px] transition-transform ${
                            desktopDropdown === menu.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* DESKTOP DROPDOWN */}

                      {desktopDropdown === menu.name && (
                        <div className="absolute left-0 top-full z-50 min-w-[250px] overflow-hidden rounded-b-lg border border-gray-200 bg-white shadow-xl">
                          {menu.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={closeMenus}
                              className="block border-b border-gray-100 px-5 py-3 text-sm font-medium text-gray-700 transition last:border-b-0 hover:bg-[#ab183d] hover:text-white"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    /* NORMAL MENU */

                    <Link
                      to={menu.path}
                      onClick={closeMenus}
                      className="flex items-center px-4 py-7 text-[14px] font-semibold text-gray-800 transition hover:bg-[#d6b300] xl:px-5 xl:text-[15px]"
                    >
                      {menu.name}
                    </Link>
                  )}
                </li>
              ))}

              {/* ==================================================
                  LOGIN / REGISTER
              ================================================== */}

              {!isLoggedIn && (
                <li>
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="group mx-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ab183d] to-[#d21f4f] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-[#921532] hover:to-[#b91842] hover:shadow-lg active:translate-y-0"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-white/25">
                      <FaUserCircle className="text-lg transition-transform duration-300 group-hover:scale-110" />
                    </span>

                    <span className="flex flex-col leading-tight">
                      <span>Login / Register</span>
                      <span className="text-[10px] font-medium text-white/75">
                        Access your account
                      </span>
                    </span>
                  </Link>
                </li>
              )}

              {/* ==================================================
                  PROFILE
              ================================================== */}

              {isLoggedIn && (
                <li
                  className="relative"
                  onMouseLeave={() => setProfileMenu(false)}
                >
                  <button
                    type="button"
                    onClick={() => setProfileMenu(!profileMenu)}
                    className="flex items-center gap-2 px-4 py-6 text-[15px] font-semibold text-gray-800 transition hover:bg-[#d6b300]"
                  >
                    <FaUserCircle className="text-lg" />

                    <span>Profile</span>

                    <FaChevronDown
                      className={`text-[9px] transition-transform ${
                        profileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* PROFILE DROPDOWN */}

                  {profileMenu && (
                    <div className="absolute right-0 top-full z-50 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                      {/* My Profile */}

                      <Link
                        to="/profile"
                        state={{ userId }}
                        onClick={closeMenus}
                        className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                      >
                        <FaUserCircle className="text-[#ab183d]" />
                        My Profile
                      </Link>

                      {/* View Documents */}

                      <Link
                        to="/user-Profile"
                        state={{ userId }}
                        onClick={closeMenus}
                        className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                      >
                        <span className="text-[#ab183d]">🎓</span>
                        View Documents
                      </Link>

                      {/* Download Application */}

                      <Link
                        to="/download-application"
                        onClick={closeMenus}
                        className="flex items-center justify-between border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                      >
                        <span>📄 Download / Print Application</span>

                        <span>→</span>
                      </Link>

                      {/* Logout */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
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

          {/* ==================================================
              MOBILE BUTTON
          ================================================== */}

          <button
            type="button"
            className="mr-2 rounded-lg p-3 text-2xl text-gray-800 transition hover:bg-[#d6b300] lg:hidden"
            onClick={() => {
              setMobileMenu(!mobileMenu);
              setMobileDropdown(null);
              setProfileMenu(false);
            }}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      {mobileMenu && (
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto bg-[#f7d200] shadow-xl lg:hidden">
          {/* ==================================================
              MOBILE MAIN MENU
          ================================================== */}

          {menus.map((menu) => (
            <div key={menu.name} className="border-b border-yellow-600">
              {menu.submenu ? (
                <>
                  {/* Parent */}

                  <button
                    type="button"
                    onClick={() => handleMobileDropdown(menu.name)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-gray-800 transition hover:bg-[#d6b300]"
                  >
                    <span>{menu.name}</span>

                    <FaChevronDown
                      className={`transition-transform ${
                        mobileDropdown === menu.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Submenu */}

                  {mobileDropdown === menu.name && (
                    <div className="bg-yellow-100">
                      {/* Optional Parent Page */}

                      <Link
                        to={menu.path}
                        onClick={closeMenus}
                        className="block border-t border-yellow-300 px-8 py-3 text-sm font-semibold text-[#ab183d] transition hover:bg-yellow-200"
                      >
                        Overview
                      </Link>

                      {menu.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          onClick={closeMenus}
                          className="block border-t border-yellow-300 px-8 py-3 text-sm font-medium text-gray-700 transition hover:bg-yellow-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Normal mobile menu */

                <Link
                  to={menu.path}
                  onClick={closeMenus}
                  className="flex w-full items-center justify-between px-5 py-4 font-semibold text-gray-800 transition hover:bg-[#d6b300]"
                >
                  <span>{menu.name}</span>
                </Link>
              )}
            </div>
          ))}

          {/* ==================================================
              MOBILE LOGIN / REGISTER
          ================================================== */}

          {!isLoggedIn && (
            <div className="border-b border-yellow-600">
              <Link
                to="/login"
                onClick={closeMenus}
                className="group mx-3 my-2 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#ab183d] to-[#d21f4f] px-5 py-3.5 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <FaUserCircle className="text-xl transition-transform duration-300 group-hover:scale-110" />
                </span>

                <span className="flex flex-col text-left leading-tight">
                  <span className="text-sm">Login / Register</span>
                  <span className="text-[10px] font-medium text-white/75">
                    Access your account
                  </span>
                </span>
              </Link>
            </div>
          )}

          {/* ==================================================
              MOBILE PROFILE
          ================================================== */}

          {isLoggedIn && (
            <div className="border-t-2 border-yellow-700">
              {/* Profile Header */}

              <button
                type="button"
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex w-full items-center justify-between px-5 py-4 font-semibold text-gray-800 transition hover:bg-[#d6b300]"
              >
                <span className="flex items-center gap-2">
                  <FaUserCircle />
                  Profile
                </span>

                <FaChevronDown
                  className={`transition-transform ${
                    profileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Items */}

              {profileMenu && (
                <div className="bg-yellow-100">
                  {/* My Profile */}

                  <Link
                    to="/profile"
                    state={{ userId }}
                    onClick={closeMenus}
                    className="flex items-center gap-3 border-t border-yellow-300 px-8 py-3 text-sm font-semibold text-gray-700 transition hover:bg-yellow-200"
                  >
                    <FaUserCircle className="text-[#ab183d]" />
                    My Profile
                  </Link>

                  {/* View Documents */}

                  <Link
                    to="/user-Profile"
                    state={{ userId }}
                    onClick={closeMenus}
                    className="flex items-center gap-3 border-t border-yellow-300 px-8 py-3 text-sm font-semibold text-gray-700 transition hover:bg-yellow-200"
                  >
                    <span className="text-[#ab183d]">🎓</span>
                    View Documents
                  </Link>

                  {/* Download / Print */}

                  <Link
                    to="/download-application"
                    onClick={closeMenus}
                    className="flex items-center justify-between border-t border-yellow-300 px-8 py-3 text-sm font-semibold text-gray-700 transition hover:bg-yellow-200"
                  >
                    <span>📄 Download / Print Application</span>

                    <span>→</span>
                  </Link>

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 border-t border-yellow-300 px-8 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
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
