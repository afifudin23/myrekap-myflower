// src/components/routes/ProtectedRoute.tsx
import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated, loading, verifyToken } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        console.log(123)
        verifyToken();
    }, [location.pathname, verifyToken]);

    if (loading) return <div className="p-10 text-center">Checking authentication...</div>;

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/auth/login" state={{ message: "Sesi Anda Telah Habis, Silahkan Login Kembali" }} replace />
    );
};

export default ProtectedRoute;
