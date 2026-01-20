import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { employeeDashboard } from "../../API/functions/employee-api-functions/employeeDashboard.api";

const EmployeeDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const res = await employeeDashboard();
      if (res?.status === 200) {
        setData(res?.data?.employee);
      }
    } catch (error) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("employee_login");
      navigate("/employee/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading dashboard...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, <span className="text-emerald-500">{data?.name}</span> 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Your employee profile & security overview
            </p>
          </div>

          <button
            onClick={() => {
              toast("Confirm Logout", {
                description: "Are you sure you want to logout?",
                action: {
                  label: "Logout",
                  onClick: () => {
                    localStorage.removeItem("employee_login");

                    toast.success("logged out successfull!");

                    setTimeout(() => {
                      navigate("/employee/login");
                    }, 400);
                  },
                },
                cancel: {
                  label: "Cancel",
                },
                actionButtonStyle: {
                  backgroundColor: "#10b981",
                  color: "white",
                },
                cancelButtonStyle: {
                  backgroundColor: "#ffffff",
                  color: "#374151",
                },
              });
            }}
            className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg 
             bg-emerald-500 text-white 
             hover:bg-emerald-600 
             active:scale-95 transition-all duration-200
             shadow-md"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 p-[1px]">
            <div className="rounded-3xl bg-white p-7 h-full shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow">
                  👤
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Profile Information
                  </h2>
                  <p className="text-xs text-gray-500">
                    Personal & organizational details
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                {[
                  ["Employee ID", data?.employeeId],
                  ["Email", data?.email],
                  ["Role", data?.role],
                  ["Department", data?.department || "N/A"],
                  [
                    "Joining Date",
                    data?.joiningDate
                      ? new Date(data.joiningDate).toDateString()
                      : "N/A",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-gray-800 capitalize">
                      {value}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between items-center bg-emerald-50 rounded-xl px-4 py-3">
                  <span className="text-gray-500">Status</span>
                  <span className="text-emerald-600 font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl bg-gradient-to-br from-gray-300/40 to-gray-400/40 p-[1px]">
            <div className="rounded-3xl bg-white p-7 h-full shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-800 text-white flex items-center justify-center text-xl shadow">
                  🔒
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Security Status
                  </h2>
                  <p className="text-xs text-gray-500">
                    Account protection & activity
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-gray-500">Password</span>
                  {data?.isFirstLogin ? (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                      Change Required
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-semibold">
                      Secure
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-gray-500">Last Login</span>
                  <span className="font-medium text-gray-800">
                    {data?.lastLogin
                      ? new Date(data.lastLogin).toLocaleString()
                      : "First Login"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/employee/change-password")}
                className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md transition"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border shadow-sm p-4 text-sm text-gray-600">
          For profile updates or access issues, please contact your
          administrator.
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
