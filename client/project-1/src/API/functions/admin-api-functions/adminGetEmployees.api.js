import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const getEmployees = (params) => {
  return axiosInstance.get(EndPoints.adminEnd.employeeList, { params })
}