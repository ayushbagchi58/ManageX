import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const employeeDashboard=async()=>{
    return await axiosInstance.get(EndPoints.employeeEnd.dashboard)
}