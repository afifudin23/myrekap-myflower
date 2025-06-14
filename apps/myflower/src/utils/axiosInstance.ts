// src/utils/axiosInstance.ts
import axios from "axios";

// Membuat instance axios dengan interceptor
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});


export default axiosInstance;
