import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const adminToken =
      localStorage.getItem("admin_login") ||
      sessionStorage.getItem("admin_login");

    const employeeToken =
      localStorage.getItem("employee_login") ||
      sessionStorage.getItem("employee_login");

    const token = employeeToken || adminToken;

    if (config) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response success", response);
    return response;
  },
  (error) => {
    console.log("Global error", error);
    return Promise.reject(error);
  }
);
export default axiosInstance;
