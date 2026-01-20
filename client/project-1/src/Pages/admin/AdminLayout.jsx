import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { adminDashboard } from "../../API/functions/admin-api-functions/adminDashboard.api";
import AdminNavbar from "../../Components/admin/AdminNavbar";
import AdminFooter from "../../Components/admin/AdminFooter";
import AdminSidebar from "../../Components/admin/AdminSidebar";

const AdminLayout = () => {
  const [adminData, setAdminData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const fetchAdmin = async () => {
    try {
      const res = await adminDashboard();
      if (res?.status === 200) {
        setAdminData(res?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar
        adminName={adminData?.admin?.name || "Admin"}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex-1 min-h-screen flex flex-col bg-gray-100 transition-all duration-300
        ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        <AdminNavbar adminName={adminData?.admin?.name} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
