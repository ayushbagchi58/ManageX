import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminNavbar = ({ adminName }) => {
  const navigate = useNavigate();

const handleLogout = () => {
  toast("Confirm Logout", {
    description: "You will be redirected to the admin login page.",
    className: "bg-[#3f4a52] text-white border border-white/10",
    action: {
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("admin_login");
        toast.success("Logged out successfully", {
          className: "bg-emerald-500 text-white",
        });
        navigate("/");
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
};



  return (
    <nav className="w-full bg-[#3f4a52] px-4 md:px-6 py-3 flex items-center justify-between shadow-md">
      
    
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
          M
        </div>
        <span className="text-white font-semibold text-lg hidden sm:block">
         Dashboard
        </span>
      </div>

    
      <div className="flex items-center gap-3">
        
        
        <span className="text-white text-sm md:text-base hidden sm:block">
          Hello, <span className="font-semibold text-emerald-400">{adminName || "Admin"}</span>
        </span>

        
        <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
          {adminName ? adminName.charAt(0).toUpperCase() : "A"}
        </div>

      
        <button
          onClick={handleLogout}
          className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg 
                     bg-emerald-500 text-white 
                     hover:bg-emerald-600 
                     active:scale-95 transition-all duration-200
                     shadow-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
