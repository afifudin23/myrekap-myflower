// src/utils/axiosInstance.ts
import axios from "axios";

// Membuat instance axios dengan interceptor
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    config.headers["x-app-name"] = "myflower"; // atau dynamic sesuai environment/project
    return config;
});

export default axiosInstance;
