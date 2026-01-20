import React from "react";

const EmployeeFooter = () => {
  return (
    <footer className="mt-auto bg-[#3f4a52] border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 text-sm text-white/80">
        
       
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-emerald-400 font-semibold">ManageX</span>. All
          rights reserved.
        </p>

       
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span className="text-white/50">v1.0.0</span>
          <span className="h-4 w-px bg-white/20"></span>
          <span className="hover:text-emerald-400 cursor-pointer transition">
            Support
          </span>
          <span className="hover:text-emerald-400 cursor-pointer transition">
            Docs
          </span>
        </div>

      </div>
    </footer>
  );
};

export default EmployeeFooter;
