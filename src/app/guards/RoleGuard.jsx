import { useUser } from "@clerk/clerk-react";
import { useRole } from "../../hooks/useRole";
import { Navigate } from "react-router-dom";

const RoleGuard = ({ allowed, children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const { role, loading } = useRole();

  // loading state
  if (!isLoaded || loading) {
    return <p className="p-6">Loading...</p>;
  }

  // 🔴 not logged in → Clerk login
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // 🔴 role not allowed
  if (!allowed.includes(role)) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm">
          Access Denied
        </div>
      </div>
    );
  }

  return children;
};

export default RoleGuard;
