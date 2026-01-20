import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  X,
  UserPlus,
  KeyRound,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserCheck,
} from "lucide-react";

const AdminSidebar = ({ adminName = "Admin", collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);
  const [employeesOpen, setEmployeesOpen] = useState(false);

  const mainMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  ];

  const managementMenu = [
    { name: "Create Employee", path: "/admin/create-employee", icon: UserPlus },
  ];

  const systemMenu = [
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const renderMenu = (items) =>
    items.map((item, index) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={index}
          to={item.path}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
            ${
              isActive
                ? "bg-emerald-500 text-white shadow"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <Icon size={20} />
          {!collapsed && <span>{item.name}</span>}
        </NavLink>
      );
    });

  return (
    <>
    
      <style>{`
        .admin-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .admin-scrollbar::-webkit-scrollbar-track {
          background: #2f383f;
        }
        .admin-scrollbar::-webkit-scrollbar-thumb {
          background-color: #10b981; /* emerald-500 */
          border-radius: 8px;
        }
        .admin-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #34d399; /* emerald-400 */
        }

        
        .admin-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 #2f383f;
        }
      `}</style>

      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-emerald-500 text-white p-2 rounded-lg shadow-md"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full ${
          collapsed ? "w-20" : "w-64"
        } bg-[#3f4a52] text-white z-50 transform transition-all duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-16 flex items-center gap-3 px-4 border-b border-white/10">
          <div className="h-10 w-10 bg-emerald-500 text-white font-bold flex items-center justify-center rounded-lg">
            M
          </div>

          {!collapsed && (
            <span className="text-xl text-white-300 font-semibold leading-tight">
              ManageX
              <div className="text-xs text-white-300 font-normal">
                Employee System
              </div>
            </span>
          )}

          <button
            className="ml-auto hidden lg:block text-gray-300 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          <button className="ml-auto lg:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

       
        <nav className="admin-scrollbar h-[calc(100vh-9rem)] overflow-y-auto px-3 py-6 space-y-6">
          <div>
            {!collapsed && (
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-2">
                Main
              </p>
            )}
            <div className="space-y-1">{renderMenu(mainMenu)}</div>
          </div>

          <div>
            {!collapsed && (
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-2">
                Employees
              </p>
            )}

            <button
              onClick={() => setEmployeesOpen(!employeesOpen)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Users size={20} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">Employees</span>
                  {employeesOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </>
              )}
            </button>

            {employeesOpen && !collapsed && (
              <div className="ml-9 mt-1 space-y-1">
                <NavLink
                  to="/admin/employees"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition
                    ${
                      isActive
                        ? "bg-emerald-500 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <UserCheck size={16} />
                  <span>Employee List</span>
                </NavLink>
              </div>
            )}
          </div>

          <div>
            {!collapsed && (
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-2">
                Management
              </p>
            )}
            <div className="space-y-1">{renderMenu(managementMenu)}</div>
          </div>

          <div>
            {!collapsed && (
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-2">
                System
              </p>
            )}
            <div className="space-y-1">{renderMenu(systemMenu)}</div>
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold">
              {adminName.charAt(0).toUpperCase()}
            </div>

            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{adminName}</p>
                <p className="text-xs text-gray-300">Administrator</p>
              </div>
            )}

            {!collapsed && (
              <span className="h-2 w-2 bg-green-400 rounded-full"></span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
