import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const token =
    localStorage.getItem("admin_login") ||
    sessionStorage.getItem("admin_login");

  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
