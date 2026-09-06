import AdminHeader from "../admin/Header";
import AdminSidebar from "../admin/AdminsideMenu";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="ml-64 min-h-screen">

        {/* Header */}
        <AdminHeader />

        {/* Current Page */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}