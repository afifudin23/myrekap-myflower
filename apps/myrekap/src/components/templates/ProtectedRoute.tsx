// src/components/routes/ProtectedRoute.tsx
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loading } from "@/components/atoms";

const ProtectedRoute = () => {
    const { isAuthenticated, loading, verifyToken } = useAuthStore();

    useEffect(() => {
        verifyToken();
    }, []);

    if (loading) return <Loading />;

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/auth/login" state={{ message: "Sesi Anda Telah Habis, Silahkan Login Kembali" }} replace />
    );
};

export default ProtectedRoute;
