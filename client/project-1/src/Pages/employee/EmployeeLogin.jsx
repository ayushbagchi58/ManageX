import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { employeeLogin } from "../../API/functions/employee-api-functions/employeeLogin.api";
import { useNavigate } from "react-router-dom";
import useTogglePassword from "../../hooks/useTogglePassword";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const EmployeeLogin = () => {
  const passwordToggle = useTogglePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80)",
        }}
      ></div>

      <div className="absolute inset-0 bg-[#3f4a52]/90"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Welcome to{" "}
            <span className="text-emerald-500 font-bold">ManageX</span>
          </h2>

          <h2 className="text-xl font-semibold text-center text-emerald-500">
            Employee Login
          </h2>

          <p className="text-center text-gray-500 text-sm mt-1">
            Access your employee dashboard
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit(async (input) => {
              try {
                const res = await employeeLogin(input);
                if (res?.status === 200) {
                  toast.success(res?.data?.message);
                  const token = res?.data?.token;
                  localStorage.setItem("employee_login", token);
                  if (res.data.employee.isFirstLogin) {
                    navigate("/employee/change-password");
                  } else {
                    navigate("/employee/dashboard");
                  }
                } else {
                  toast.error(res?.data?.message || "Invalid credentials!");
                }
              } catch (error) {
                toast.error(error?.response?.data?.message || "Login failed!");
              }
            })}
          >
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="employee@company.com"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={passwordToggle.type}
                  placeholder="********"
                  {...register("password")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-12"
                />

                <button
                  type="button"
                  onClick={passwordToggle.toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {passwordToggle.show ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 rounded-lg font-semibold transition
                ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                }
              `}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Authorized Employees Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
