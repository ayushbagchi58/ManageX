import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const EmployeeSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300";

  const activeClass = "bg-emerald-500 text-white shadow";
  const inactiveClass = "text-gray-300 hover:bg-white/10 hover:text-white";

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-[#3f4a52] p-4 hidden md:flex flex-col transition-all duration-300`}
    >
    
      <div
        className={`flex items-center gap-3 mb-6 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="h-10 w-10 rounded-lg bg-emerald-500 text-white font-bold flex items-center justify-center shadow">
          M
        </div>

        {!collapsed && (
          <div className="leading-tight">
            <p className="text-white font-semibold text-lg">ManageX</p>
            <p className="text-xs text-gray-300">Employee System</p>
          </div>
        )}
      </div>

     
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6 flex items-center justify-center w-10 h-10 rounded-lg 
               bg-white/10 hover:bg-white/20 text-white transition self-end"
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

     
      <nav className="space-y-2 flex-1">
        <NavLink
          to="/employee/dashboard"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass} ${
              collapsed ? "justify-center" : ""
            }`
          }
        >
          <span className="text-lg">📊</span>
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/employee/profile"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass} ${
              collapsed ? "justify-center" : ""
            }`
          }
        >
          <span className="text-lg">👤</span>
          {!collapsed && <span>Profile</span>}
        </NavLink>
      </nav>

      {!collapsed && (
        <div className="mt-6 text-xs text-gray-400 px-4">MANAGEX EMPLOYEE</div>
      )}
    </aside>
  );
};

export default EmployeeSidebar;
