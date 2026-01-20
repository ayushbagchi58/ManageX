import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AdminPrivateRoute from "./AdminPrivateRoute";
import EmployeePrivateRoute from "./EmployeePrivateRoute";
const Home = lazy(() => import("../Pages/admin/Home"));
const Error404 = lazy(() => import("../Pages/Error404"));
const AdminLayout = lazy(() => import("../Pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("../Pages/admin/AdminDashboard"));
const AdminCreateEmployee = lazy(
  () => import("../Pages/admin/AdminCreateEmployee"),
);
const EmployeeList = lazy(() => import("../Pages/admin/EmployeeList"));

const EmployeeLogin = lazy(() => import("../Pages/employee/EmployeeLogin"));
const EmployeeLayout = lazy(
  () => import("../Components/employee/EmployeeLayout"),
);
const EmployeeDashboard = lazy(
  () => import("../Pages/employee/EmployeeDashboard"),
);
const EmployeeProfile = lazy(() => import("../Pages/employee/EmployeeProfile"));
const EmployeeChangePassword = lazy(
  () => import("../Pages/employee/EmployeeChangePassword"),
);

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

const Routing = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="create-employee" element={<AdminCreateEmployee />} />
          </Route>
        </Route>

        <Route path="/employee/login" element={<EmployeeLogin />} />

        <Route element={<EmployeePrivateRoute />}>
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeProfile />} />
          </Route>

          <Route
            path="/employee/change-password"
            element={<EmployeeChangePassword />}
          />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
