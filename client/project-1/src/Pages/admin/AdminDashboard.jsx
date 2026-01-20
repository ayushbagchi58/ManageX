import React, { useState, useEffect } from "react";
import { adminDashboard } from "../../API/functions/admin-api-functions/adminDashboard.api";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const fetchAdmin = async () => {
    setIsLoading(true);
    setIsError("");
    try {
      const res = await adminDashboard();
      if (res?.status === 200) {
        setAdminData(res?.data);
      }
    } catch (error) {
      setAdminData([]);
      setIsError(error?.response?.data?.message || "Admin data not found!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">{isError}</p>;

  const { stats, recentEmployees, message } = adminData || {};

  return (
    <div className="bg-white min-h-screen p-6">
    
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#3f4a52]">
          {message}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your organization
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Employees" value={stats?.totalEmployees} />
        <StatCard title="Active Employees" value={stats?.activeEmployees} />
        <StatCard title="Inactive Employees" value={stats?.inactiveEmployees} />
        <StatCard title="New This Month" value={stats?.newThisMonth} />
      </div>

    
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#3f4a52]">
            Recent Employees
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-xs uppercase text-gray-500">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Joined</th>
            </tr>
          </thead>

          <tbody>
            {recentEmployees?.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
                  No recent employees
                </td>
              </tr>
            ) : (
              recentEmployees?.map((emp, idx) => (
                <tr
                  key={idx}
                  className="border-t hover:bg-emerald-50 transition"
                >
                  <td className="px-6 py-4">{emp.name}</td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4 capitalize">{emp.role}</td>
                  <td className="px-6 py-4">
                  {new Date(emp.createdAt).toLocaleDateString("en-GB")}

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-emerald-500">
      {value ?? 0}
    </h3>
  </div>
);

export default AdminDashboard;
