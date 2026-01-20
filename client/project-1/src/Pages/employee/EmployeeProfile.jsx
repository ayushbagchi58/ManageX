import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/Instance/axiosInstance";
import { EndPoints } from "../../API/End_point";
import { employeeProfile } from "../../API/functions/employee-api-functions/employeeProfile.api";
import { updateProfile } from "../../API/functions/employee-api-functions/employeeUpdateProfile.api";

const EmployeeProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    department: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await employeeProfile();

      if (res.status === 200) {
        setProfile(res.data.employee);
        setForm({
          name: res.data.employee.name || "",
          department: res.data.employee.department || "",
        });
      }
    } catch (error) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("employee_login");
      navigate("/employee/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setSaving(true);
      const res = await updateProfile({
        name: form.name,
        department: form.department,
      });
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        setProfile((prev) => ({
          ...prev,
          name: form.name,
          department: form.department,
        }));
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

 
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
       
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-sm text-gray-500 mt-1">
              View & manage your personal information
            </p>
          </div>

          <button
            onClick={() => setEditMode((prev) => !prev)}
            className="px-4 py-2 rounded-lg text-sm font-semibold
              bg-emerald-500 text-white hover:bg-emerald-600
              transition shadow-md"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 p-[1px]">
          <div className="rounded-3xl bg-white p-8 shadow-lg space-y-6">
           
            <div className="flex items-center gap-5">
              <div
                className="w-16 h-16 rounded-2xl bg-emerald-500 text-white
                flex items-center justify-center text-2xl shadow"
              >
                👤
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Employee ID: {profile.employeeId}
                </p>
              </div>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
              <div className="space-y-1">
                <label className="text-sm text-gray-500">Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border
                      focus:ring-2 focus:ring-emerald-400
                      outline-none"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    {profile.name}
                  </div>
                )}
              </div>

             
              <div className="space-y-1">
                <label className="text-sm text-gray-500">Email</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  {profile.email}
                </div>
              </div>

             
              <div className="space-y-1">
                <label className="text-sm text-gray-500">Department</label>
                {editMode ? (
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        department: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border
                      focus:ring-2 focus:ring-emerald-400
                      outline-none"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl capitalize">
                    {profile.department || "N/A"}
                  </div>
                )}
              </div>

             
              <div className="space-y-1">
                <label className="text-sm text-gray-500">Joining Date</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  {profile.joiningDate
                    ? new Date(profile.joiningDate).toDateString()
                    : "N/A"}
                </div>
              </div>
            </div>

           
            {editMode && (
              <div className="flex justify-end pt-4">
                <button
                  disabled={saving}
                  onClick={handleUpdate}
                  className="px-6 py-3 rounded-xl font-semibold
                    bg-emerald-500 text-white
                    hover:bg-emerald-600
                    active:scale-95 transition
                    shadow-md disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

       
        <div className="rounded-2xl bg-white border shadow-sm p-4 text-sm text-gray-600">
          For email or role changes, please contact your administrator.
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
