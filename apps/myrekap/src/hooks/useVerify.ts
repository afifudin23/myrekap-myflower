/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

function useVerify() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError>({} as AxiosError);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get("auth/verify");
                setIsAuthenticated(response.status === 200);
            } catch (error: any | AxiosError) {
                setError(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 10);
            }
        };
        checkAuth();
    }, []);

    return { isAuthenticated, loading, error };
}

export default useVerify;
