// src/components/routes/ProtectedRoute.tsx
import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated, loading, verifyToken } = useAuthStore();

    useEffect(() => {
        verifyToken();
        // eslint-disable-next-line
    }, []);

    if (loading) return <div className="p-10 text-center">Checking authentication...</div>;

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/auth/login" state={{ message: "Sesi Anda Telah Habis, Silahkan Login Kembali" }} replace />
    );
};

export default ProtectedRoute;
