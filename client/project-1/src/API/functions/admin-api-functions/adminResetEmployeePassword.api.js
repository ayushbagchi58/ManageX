import { EndPoints } from "../../End_point";
import axiosInstance from "../../Instance/axiosInstance";

export const resetEmployeePassword = async (employeeId) => {
  return await axiosInstance.post(`${EndPoints.adminEnd.resetEmployeePassword}/${employeeId}`
  );
};