import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const changePassword=async(data)=>{
    return await axiosInstance.post(EndPoints.employeeEnd.changePassword,data)
}