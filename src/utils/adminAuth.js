/*
|--------------------------------------------------------------------------
| GET ADMIN TOKEN
|--------------------------------------------------------------------------
*/

export const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};

/*
|--------------------------------------------------------------------------
| ADMIN LOGOUT
|--------------------------------------------------------------------------
*/

export const adminLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("adminUsername");
};

/*
|--------------------------------------------------------------------------
| CHECK ADMIN SESSION
|--------------------------------------------------------------------------
*/

export const checkAdminSession = async () => {
  const token = getAdminToken();

  if (!token) {
    adminLogout();
    return false;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/admin/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

  

    /*
    |--------------------------------------------------------------------------
    | 401 = SESSION INVALID
    |--------------------------------------------------------------------------
    */

    if (response.status === 401) {
      adminLogout();
      return false;
    }

    /*
    |--------------------------------------------------------------------------
    | OTHER API ERROR
    |--------------------------------------------------------------------------
    */

    if (!response.ok || !data.success) {
      adminLogout();
      return false;
    }

    /*
    |--------------------------------------------------------------------------
    | SESSION VALID
    |--------------------------------------------------------------------------
    */

    return true;

  } catch (error) {
    console.error(
      "Admin session check error:",
      error
    );

    /*
    | Network/server problem.
    | Don't remove token automatically.
    */

    return false;
  }
};