import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaCreditCard,
  FaFileUpload,
  FaShieldAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoggedIn");

    navigate("/admin/login", { replace: true });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "Total Users",
      path: "/admin/users",
      icon: FaUsers,
    },
    {
      name: "Applications",
      path: "/admin/applications",
      icon: FaFileAlt,
    },
    {
      name: "Payment Gateway",
      path: "/admin/payment-gateway",
      icon: FaCreditCard,
    },
    {
      name: "Documents",
      path: "/admin/documents",
      icon: FaFileUpload,
    },
    {
      name: "Verification",
      path: "/admin/verification",
      icon: FaShieldAlt,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: FaCog,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#111827] text-white shadow-xl">

      {/* Logo */}
      <div className="h-20 flex items-center px-5 border-b border-gray-700">
        <div>
          <h1 className="text-xl font-bold">
            Admin Panel
          </h1>

          <p className="text-xs text-gray-400">
           CCL Coldfields
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#ab183d] text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Icon className="text-lg" />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-[#111827]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          <FaSignOutAlt />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>

    </aside>
  );
}