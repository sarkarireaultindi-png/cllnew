import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaSyncAlt,
  FaEye,
  FaTimes,
} from "react-icons/fa";

export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // ======================================================
  // FETCH REGISTERED USERS
  // ======================================================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("Admin session not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://cllnew.onrender.com/api/users/admin/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      // ==================================================
      // UNAUTHORIZED
      // ==================================================

      if (response.status === 401) {
        localStorage.removeItem("adminToken");

        setError(
          data.message ||
            "Admin session expired. Please login again."
        );

        return;
      }

      // ==================================================
      // OTHER API ERROR
      // ==================================================

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch users."
        );
      }

      // ==================================================
      // SET USERS
      // ==================================================

      setUsers(
        Array.isArray(data.users)
          ? data.users
          : []
      );
    } catch (error) {
      console.error("Fetch users error:", error);

      setError(
        error.message ||
          "Unable to load registered users."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD USERS
  // ======================================================

  useEffect(() => {
    fetchUsers();
  }, []);

  // ======================================================
  // SEARCH
  // ======================================================

  const filteredUsers = users.filter((user) => {
    const searchText = search
      .toLowerCase()
      .trim();

    if (!searchText) {
      return true;
    }

    return (
      user.name
        ?.toLowerCase()
        .includes(searchText) ||

      user.email
        ?.toLowerCase()
        .includes(searchText) ||

      user.mobile
        ?.toString()
        .includes(searchText) ||

      user.aadhaar
        ?.toString()
        .includes(searchText) ||

      user.registrationNumber
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  // ======================================================
  // VIEW USER
  // ======================================================

  const handleViewUser = (userId) => {
    if (!userId) {
      return;
    }

    navigate(`/admin/users/${userId}`);
  };

  // ======================================================
  // LOGIN AGAIN
  // ======================================================

  const handleLoginAgain = () => {
    localStorage.removeItem("adminToken");

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <div>

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-[#ab183d] text-white flex items-center justify-center">
            <FaUsers className="text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Registered Users
            </h1>

            <p className="text-sm text-gray-500">
              View and manage registered users
            </p>
          </div>

        </div>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ab183d] text-white rounded-lg hover:bg-[#8f1433] transition disabled:opacity-60"
        >
          <FaSyncAlt
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* ==================================================
          SEARCH / TOTAL
      ================================================== */}

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* SEARCH */}

          <div className="relative w-full md:w-[500px]">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search name, registration number, Aadhaar, email or mobile..."
              className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#ab183d] focus:border-transparent"
            />

          </div>

          {/* TOTAL */}

          <div className="bg-gray-100 rounded-lg px-5 py-3">

            <span className="text-gray-500">
              Total Users:
            </span>

            <span className="font-bold text-gray-800 ml-2">
              {users.length}
            </span>

          </div>

        </div>

      </div>

      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <span>
              {error}
            </span>

            {error
              .toLowerCase()
              .includes("session") && (
              <button
                onClick={handleLoginAgain}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Login Again
              </button>
            )}

          </div>

        </div>
      )}

      {/* ==================================================
          LOADING
      ================================================== */}

      {loading ? (

        <div className="bg-white rounded-xl shadow-sm border py-20 flex flex-col items-center justify-center">

          <FaSyncAlt className="text-3xl text-[#ab183d] animate-spin mb-4" />

          <p className="text-gray-500">
            Loading registered users...
          </p>

        </div>

      ) : filteredUsers.length === 0 ? (

        /* ==================================================
           NO USERS
        ================================================== */

        <div className="bg-white rounded-xl shadow-sm border py-20 text-center">

          <FaUsers className="text-5xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-semibold text-gray-700">
            No Users Found
          </h2>

          <p className="text-gray-500 mt-2">
            {search
              ? "No users match your search."
              : "No registered users are available."}
          </p>

        </div>

      ) : (

        /* ==================================================
           TABLE
        ================================================== */

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1200px]">

              {/* ==================================================
                  TABLE HEADER
              ================================================== */}

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    #
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Registration No.
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Aadhaar
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Mobile
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Action
                  </th>

                </tr>

              </thead>

              {/* ==================================================
                  TABLE BODY
              ================================================== */}

              <tbody className="divide-y">

                {filteredUsers.map(
                  (user, index) => (

                    <tr
                      key={
                        user._id ||
                        index
                      }
                      className="hover:bg-gray-50 transition"
                    >

                      {/* NUMBER */}

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {index + 1}
                      </td>

                      {/* REGISTRATION NUMBER */}

                      <td className="px-5 py-4">

                        <span className="font-semibold text-[#ab183d]">
                          {user.registrationNumber ||
                            "N/A"}
                        </span>

                      </td>

                      {/* NAME */}

                      <td className="px-5 py-4">

                        <div className="font-medium text-gray-800">
                          {user.name ||
                            "N/A"}
                        </div>

                      </td>

                      {/* AADHAAR */}

                      <td className="px-5 py-4 text-sm text-gray-600">

                        <span className="font-medium">
                          {user.aadhaar ||
                            "N/A"}
                        </span>

                      </td>

                      {/* MOBILE */}

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {user.mobile ||
                          "N/A"}
                      </td>

                      {/* EMAIL */}

                      <td className="px-5 py-4 text-sm text-gray-600">

                        <span className="break-all">
                          {user.email ||
                            "N/A"}
                        </span>

                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4 text-sm text-gray-600">

                        {formatDate(
                          user.createdAt
                        )}

                      </td>

                      {/* VIEW */}

                      <td className="px-5 py-4 text-center">

                        <button
                          onClick={() =>
                            handleViewUser(
                              user._id
                            )
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#ab183d] text-white rounded-lg hover:bg-[#8f1534] transition"
                        >

                          <FaEye />

                          View

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* ==================================================
          USER DETAILS MODAL
      ================================================== */}

      {selectedUser && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden">

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="bg-[#ab183d] text-white px-6 py-4 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  User Details
                </h2>

                <p className="text-sm opacity-80">
                  Registered User Information
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="text-white hover:bg-white/20 rounded-lg p-2"
              >
                <FaTimes />
              </button>

            </div>

            {/* ==================================================
                MODAL BODY
            ================================================== */}

            <div className="p-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* REGISTRATION NUMBER */}

                <div>

                  <p className="text-sm text-gray-500">
                    Registration Number
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedUser.registrationNumber ||
                      "N/A"}
                  </p>

                </div>

                {/* NAME */}

                <div>

                  <p className="text-sm text-gray-500">
                    Name
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedUser.name ||
                      "N/A"}
                  </p>

                </div>

                {/* AADHAAR */}

                <div>

                  <p className="text-sm text-gray-500">
                    Aadhaar Number
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedUser.aadhaar ||
                      "N/A"}
                  </p>

                </div>

                {/* MOBILE */}

                <div>

                  <p className="text-sm text-gray-500">
                    Mobile
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedUser.mobile ||
                      "N/A"}
                  </p>

                </div>

                {/* EMAIL */}

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold text-gray-800 mt-1 break-all">
                    {selectedUser.email ||
                      "N/A"}
                  </p>

                </div>

                {/* DOB */}

                <div>

                  <p className="text-sm text-gray-500">
                    Date of Birth
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedUser.dob ||
                      "N/A"}
                  </p>

                </div>

                {/* REGISTRATION DATE */}

                <div>

                  <p className="text-sm text-gray-500">
                    Registration Date
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {formatDate(
                      selectedUser.createdAt
                    )}
                  </p>

                </div>

              </div>

              {/* CLOSE */}

              <div className="mt-6 flex justify-end">

                <button
                  onClick={() =>
                    setSelectedUser(null)
                  }
                  className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}