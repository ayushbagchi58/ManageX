import React from "react";

const EmployeeNavbar = ({ employee }) => {
  return (
    <header className="w-full bg-[#3f4a52] shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-white text-xl font-semibold">
              Employee Dsshboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">
                {employee?.name}
              </p>
              <p className="text-xs text-emerald-400 capitalize">
                {employee?.role || "Employee"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold">
              {employee?.name?.charAt(0)?.toUpperCase() || "E"}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default EmployeeNavbar;
