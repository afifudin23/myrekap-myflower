/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/atoms/Loading";
import MainLayout from "@/components/templates/MainLayout";
import useVerify from "@/hooks/useVerify";
import axiosInstance from "@/utils/axiosInstance";
import { getUserCookies, removeUserCookies } from "@/utils/userCookies";
import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: { children?: ReactNode }) {
    const { loading, isAuthenticated, error } = useVerify();
    const userCookies = getUserCookies();
    const path = useLocation().pathname.split("/")[1];

    if (loading) {
        return <Loading />;
    }
    if (!isAuthenticated || !userCookies) {
        removeUserCookies();
        (async () => await axiosInstance.post("auth/logout"))();
        return <Navigate to="/login" replace />;
    }
    if (error.code === "ERR_NETWORK") {
        return (
            <MainLayout>
                <div className="flex justify-center items-center ">
                    <div className="text-2xl font-bold">
                        Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda
                    </div>
                </div>
            </MainLayout>
        );
    }
    if (path === "administrator" && getUserCookies().role !== "SUPERADMIN") {
        return (
            <MainLayout>
                <div className="flex justify-center items-center ">
                    <div className="text-2xl font-bold">Maaf Halaman Ini Hanya Bisa Diakses Oleh Superadmin</div>
                </div>
            </MainLayout>
        );
    }
    return <>{children || <Outlet />}</>;
}

export default ProtectedRoute;
