import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const adminDashboard=async()=>{
    return await axiosInstance.get(EndPoints.adminEnd.dashboard)
}