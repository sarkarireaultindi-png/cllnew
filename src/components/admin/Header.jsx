import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoggedIn");

    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="w-full bg-[#ab183d] text-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo / Title */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-xs md:text-sm text-white/80">
            CCL ColdField Limited
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white text-[#ab183d] font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
}