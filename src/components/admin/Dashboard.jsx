export default function AdminDashboard() {
  return (
    <div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to Admin Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Users */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            0
          </h2>
        </div>

        {/* Applications */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Applications
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            0
          </h2>
        </div>

        {/* Payments */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Payments
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            0
          </h2>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Pending Applications
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            0
          </h2>
        </div>

      </div>

    </div>
  );
}