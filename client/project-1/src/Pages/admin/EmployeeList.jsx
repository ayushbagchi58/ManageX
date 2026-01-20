import { useEffect, useState } from "react";
import { getEmployees } from "../../API/functions/admin-api-functions/adminGetEmployees.api";
import useDebounce from "../../hooks/useDebounce";
import { toggleEmployeeStatus } from "../../API/functions/admin-api-functions/adminToggleEmployeeStatus.api";
import { toast } from "sonner";
import { resetEmployeePassword } from "../../API/functions/admin-api-functions/adminResetEmployeePassword.api";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role, status, sortBy, sortOrder]);

  useEffect(() => {
    fetchEmployees();
  }, [page, debouncedSearch, role, status, sortBy, sortOrder]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 10,
        sortBy,
        sortOrder,
      };

      if (debouncedSearch) params.search = debouncedSearch;
      if (role) params.role = role;
      if (status !== "") params.isActive = status;

      const res = await getEmployees(params);
      setEmployees(res?.data?.data?.employees || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = (emp) => {
    if (emp.isActive) {
      toast(`Deactivate ${emp.name}?`, {
        description: "This employee will lose system access.",
        action: {
          label: "Deactivate",
          onClick: async () => {
            try {
              await toggleEmployeeStatus(emp._id);
              toast.success("Employee deactivated", {
                style: { background: "#ecfdf5", color: "#065f46" },
              });
              fetchEmployees();
            } catch {
              toast.error("Failed to deactivate employee");
            }
          },
        },
        cancel: { label: "Cancel" },
        actionButtonStyle: {
          backgroundColor: "#10b981",
          color: "white",
        },
        cancelButtonStyle: {
          backgroundColor: "#ffffff",
          color: "#374151",
        },
      });
    } else {
      toggleEmployeeStatus(emp._id)
        .then(() => {
          toast.success("Employee activated", {
            style: { background: "#ecfdf5", color: "#065f46" },
          });
          fetchEmployees();
        })
        .catch(() => toast.error("Failed to activate employee"));
    }
  };

  const handleResetPassword = (emp) => {
    toast(`Reset password for ${emp.name}?`, {
      description: "A temporary password will be sent to employee email.",
      action: {
        label: "Reset",
        onClick: async () => {
          try {
            await resetEmployeePassword(emp._id);
            toast.success("Password reset email sent successfully");
          } catch (error) {
            toast.error("Failed to reset password");
          }
        },
      },
      cancel: { label: "Cancel" },
      actionButtonStyle: {
          backgroundColor: "#10b981",
          color: "white",
        },
        cancelButtonStyle: {
          backgroundColor: "#ffffff",
          color: "#374151",
        },
    });
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setRole("");
    setStatus("");
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  return (
    <div className="bg-[#f5f7fa] min-h-[calc(100vh-4rem)] p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-emerald-500">Employees</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and view all registered employees
        </p>
      </div>

      <div className="mb-3 bg-white p-4 rounded-xl shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
          Filters
        </p>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-72 px-4 py-2 text-sm rounded-lg border border-gray-200
            focus:outline-none focus:ring-2 focus:ring-emerald-400
            hover:border-emerald-400 transition-all"
          />

          <button
            onClick={handleSearch}
            className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            Search
          </button>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white
            hover:border-emerald-400 focus:outline-none
            focus:ring-2 focus:ring-emerald-400 transition-all"
          >
            <option value="">All Roles</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white
            hover:border-emerald-400 focus:outline-none
            focus:ring-2 focus:ring-emerald-400 transition-all"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="mb-3 bg-white p-4 rounded-xl shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
          Sorting
        </p>

        <div className="flex flex-wrap gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white
            hover:border-emerald-400 focus:outline-none
            focus:ring-2 focus:ring-emerald-400 transition-all"
          >
            <option value="createdAt">Created Date</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="joiningDate">Joining Date</option>
            <option value="lastLogin">Last Login</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white
            hover:border-emerald-400 focus:outline-none
            focus:ring-2 focus:ring-emerald-400 transition-all"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {(debouncedSearch ||
        role ||
        status !== "" ||
        sortBy !== "createdAt" ||
        sortOrder !== "desc") && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {debouncedSearch && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs flex items-center gap-2">
              Search: {debouncedSearch}
              <button
                onClick={() => {
                  setSearchInput("");
                  setSearchQuery("");
                }}
              >
                ✕
              </button>
            </span>
          )}

          {role && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs flex items-center gap-2">
              Role: {role}
              <button onClick={() => setRole("")}>✕</button>
            </span>
          )}

          {status !== "" && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs flex items-center gap-2">
              Status: {status === "true" ? "Active" : "Inactive"}
              <button onClick={() => setStatus("")}>✕</button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-500 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-500 uppercase text-xs">
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-10 text-center">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-t hover:bg-emerald-50 transition"
                >
                  <td className="px-6 py-4">{emp.name}</td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4 capitalize">{emp.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(emp)}
                      className={`relative inline-flex items-center h-6 w-11 rounded-full
    transition-colors duration-200
    ${emp.isActive ? "bg-emerald-500" : "bg-gray-300"}`}
                    >
                      <span
                        className={`inline-block h-5 w-5 bg-white rounded-full
      transform transition-transform duration-200 ease-in-out
      ${emp.isActive ? "translate-x-5" : "translate-x-1"}`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      disabled={!emp.isActive}
                      onClick={() => handleResetPassword(emp)}
                      className={`px-3 py-1 rounded text-xs font-medium
      ${
        emp.isActive
          ? "bg-amber-500 text-white hover:bg-amber-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-6 py-4 border-t">
          <p>Page {page}</p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
