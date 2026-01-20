import { Navigate, Outlet } from "react-router-dom";

const EmployeePrivateRoute = () => {
  const token = localStorage.getItem("employee_login");

  return token ? <Outlet /> : <Navigate to="/employee/login" replace />;
};

export default EmployeePrivateRoute;
