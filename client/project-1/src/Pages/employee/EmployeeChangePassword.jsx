import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTogglePassword from "../../hooks/useTogglePassword";
import { changePassword } from "../../API/functions/employee-api-functions/employeeChangePass.api";

const EmployeeChangePassword = () => {
  const navigate = useNavigate();

  const oldPass = useTogglePassword();
  const newPass = useTogglePassword();
  const confirmPass = useTogglePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (input) => {
    // console.log("formData", input);
    try {
      const res = await changePassword(input);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        localStorage.removeItem("employee_login");
        toast.warning("Session expired. Please login again.", {
          duration: Infinity,
          action: {
            label: "Login",
            onClick: () => navigate("/employee/login"),
          },
           actionButtonStyle: {
          backgroundColor: "#10b981",
          color: "white",
        },
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#3f4a52] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80)",
        }}
      ></div>

      <div className="absolute inset-0 bg-[#3f4a52]/80"></div>

      <div className="relative z-10 bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-emerald-500">
          Change Your Password
        </h2>

        <p className="text-center text-gray-500 text-sm mt-2">
          For security reasons, you must change your password
        </p>

        <form onSubmit={handleSubmit(submitHandler)} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Old Password</label>
            <div className="relative">
              <input
                type={oldPass.type}
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
                className="w-full border px-4 py-2 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={oldPass.toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {oldPass.show ? "Hide" : "Show"}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <div className="relative">
              <input
                type={newPass.type}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="w-full border px-4 py-2 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={newPass.toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {newPass.show ? "Hide" : "Show"}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <div className="relative">
              <input
                type={confirmPass.type}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
                className="w-full border px-4 py-2 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={confirmPass.toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {confirmPass.show ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-600 transition"
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeChangePassword;
