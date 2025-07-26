import { axiosInstance } from "@/utils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useVerify() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError>({} as AxiosError);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("auth/verify");
                setIsAuthenticated(response.status === 200);
                console.log(response.status === 200);
            } catch (error: any | AxiosError) {
                console.log(error.response.data);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [location.pathname]);

    return { isAuthenticated, loading, error };
}

export default useVerify;
