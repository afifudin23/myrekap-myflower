// src/utils/axiosInstance.ts
import axios from "axios";

// Membuat instance axios dengan interceptor
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

// Interceptor untuk menangani error 401 (Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login"; // Redirect otomatis ke login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
