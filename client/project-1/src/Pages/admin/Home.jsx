import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTogglePassword from "../../hooks/useTogglePassword";
import { adminLogin } from "../../API/functions/admin-api-functions/adminLogin.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Home = () => {
  const passwordToggle = useTogglePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate=useNavigate()
  const onSubmit = async (input) => {
    // console.log("Form Data:", input);
    try {
      const res = await adminLogin(input);
      if (res?.status === 200) {
        // console.log("Login data",res)
        toast.success(res?.data?.message);
        const token = res?.data?.token;
        const role = res?.data?.admin?.role || res?.data?.role;
        localStorage.setItem("admin_login", token);
        localStorage.setItem("role", role);
        console.log("saved token", localStorage.getItem("admin_login"));
        setTimeout(() => {
          navigate("/admin/dashboard")
        }, 1000);
      } else {
        toast.error(res?.data?.message || "Invalid credentials!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3f4a52] relative overflow-hidden px-4">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Welcome to{" "}
          <span className="text-emerald-500 font-bold">ManageX Admin</span>
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to manage your organization
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-gray-600 text-sm mb-1">Password</label>

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
          Secured Admin Access Only
        </p>
      </div>
    </div>
  );
};

export default Home;
