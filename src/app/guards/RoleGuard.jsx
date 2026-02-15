import { useRole } from "../../hooks/useRole";
import { Navigate } from "react-router-dom";

const RoleGuard = ({ allowed, children }) => {
  const { role, loading } = useRole();

  if (loading) return <p>Loading...</p>;

  if (!allowed.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleGuard;
