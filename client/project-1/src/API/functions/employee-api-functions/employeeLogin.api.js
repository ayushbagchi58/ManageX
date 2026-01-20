import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const employeeLogin=async(data)=>{
    return await axiosInstance.post(EndPoints.employeeEnd.login,data)
}