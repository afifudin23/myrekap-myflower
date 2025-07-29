// src/utils/axiosInstance.ts
import axios from "axios";

// Membuat instance axios dengan interceptor
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

// Interceptor untuk menambahkan header x-app-name
axiosInstance.interceptors.request.use((config) => {
    config.headers["x-app-name"] = "myrekap"; 
    return config;
});

// Interceptor untuk menangani error 401 (Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
