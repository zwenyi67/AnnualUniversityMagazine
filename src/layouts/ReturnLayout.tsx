import { useAuth } from "@/hooks";
import { Navigate, useLocation } from "react-router-dom";

const ReturnLayout = () => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} state={{ from: location }} replace />;
  }

  if (role === "admin" ) {
    return <Navigate to="/manager/dashboard" />;
  }

  if (role === "manager" ) {
    return <Navigate to="/manager/dashboard" />;
  }

  if (role === "coordinator" ) {
    return <Navigate to="/coordinator/dashboard" />;
  }

  if (role === "student" ) {
    return <Navigate to="/student/dashboard" />;
  }

  if (role === "guest" ) {
    return <Navigate to="/guest/dashboard" />;
  }

  return (
    <></>
  );
};

export default ReturnLayout;
