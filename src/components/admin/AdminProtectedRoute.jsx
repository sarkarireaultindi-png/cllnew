import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdminSession } from "../../utils/adminAuth";

export default function AdminProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);



  useEffect(() => {
    const verify = async () => {
     

      try {
        const result = await checkAdminSession();

      

        setAuthenticated(result === true);
      } catch (error) {
        console.error(
          "❌ Admin protected route error:",
          error
        );

        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    verify();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | CHECKING
  |--------------------------------------------------------------------------
  */

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#ab183d]" />

          <p className="mt-4 text-sm font-semibold text-gray-600">
            Checking admin session...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | NOT AUTHENTICATED
  |--------------------------------------------------------------------------
  */

  if (!authenticated) {
 

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | AUTHENTICATED
  |--------------------------------------------------------------------------
  */

 

  return children;
}