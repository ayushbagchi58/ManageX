import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const adminLogin=async(data)=>{
    return await axiosInstance.post(EndPoints.adminEnd.login,data)
}