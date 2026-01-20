import { EndPoints } from "../../End_point"
import axiosInstance from "../../Instance/axiosInstance"

export const createEmployee=async(data)=>{
    return await axiosInstance.post(EndPoints.adminEnd.createEmployee,data)
}