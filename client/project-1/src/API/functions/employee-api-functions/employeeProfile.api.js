import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const employeeProfile=async()=>{
    return await axiosInstance.get(EndPoints.employeeEnd.profile)
}