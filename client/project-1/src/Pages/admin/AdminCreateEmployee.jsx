import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createEmployee } from "../../API/functions/admin-api-functions/adminCreateEmployee.api";
import { toast } from "sonner";

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),

  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email address is required"),

  role: yup.string().required("Role is required"),

  department: yup.string().nullable(),

  joiningDate: yup.date().nullable().typeError("Invalid date"),
});

const AdminCreateEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (input) => {
    try {
      const res = await createEmployee(input);

      if (res?.status === 201) {
        toast.success(res?.data?.message || "Employee created successfully");
        reset(); // optional but recommended after success
      } else {
        toast.error(res?.data?.message || "Employee creation failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Employee creation failed"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800">
          Create New Employee
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Add a new employee to your organization
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Rahul Sharma"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm
                  focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none
                  ${errors.name ? "border-red-400" : ""}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="rahul@company.com"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm
                  focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none
                  ${errors.email ? "border-red-400" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Work Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Role
                </label>
                <select
                  {...register("role")}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm
                  focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none
                  ${errors.role ? "border-red-400" : ""}`}
                >
                  <option value="">Select role</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="hr">HR</option>
                </select>
                {errors.role && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Department <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  {...register("department")}
                  placeholder="Engineering / Sales"
                  className="w-full px-4 py-2.5 border rounded-lg text-sm
                  focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Joining Date <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="date"
                  {...register("joiningDate")}
                  className="w-full px-4 py-2.5 border rounded-lg text-sm
                  focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none"
                />
                {errors.joiningDate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.joiningDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700">
            Temporary login credentials will be automatically sent to the
            employee’s email address after account creation.
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-2.5 rounded-lg border border-gray-300
              text-gray-600 hover:bg-gray-100 transition text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-emerald-500
              text-white font-semibold hover:bg-emerald-600 transition text-sm"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateEmployee;
