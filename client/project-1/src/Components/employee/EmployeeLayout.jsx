import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import EmployeeNavbar from "./EmployeeNavbar";
import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeFooter from "./EmployeeFooter";
import { employeeDashboard } from "../../API/functions/employee-api-functions/employeeDashboard.api";

const EmployeeLayout = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await employeeDashboard();
        if (res?.status === 200) {
          setEmployee(res.data.employee);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      
      <EmployeeSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">

       
        <EmployeeNavbar employee={employee} />

      
        <main className="flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-b from-gray-50 to-white">
          <Outlet />
        </main>

       
        <EmployeeFooter />
      </div>

    </div>
  );
};

export default EmployeeLayout;
