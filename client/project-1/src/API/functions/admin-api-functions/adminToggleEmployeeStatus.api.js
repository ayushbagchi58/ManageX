import axiosInstance from "../../Instance/axiosInstance"

export const toggleEmployeeStatus = (id) => {
  return axiosInstance.patch(`/admin/employee/${id}/status`)
}