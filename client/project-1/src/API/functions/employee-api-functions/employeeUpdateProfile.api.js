import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const updateProfile=async(payload)=>{
    return await axiosInstance.put(EndPoints.employeeEnd.profile,payload)
}