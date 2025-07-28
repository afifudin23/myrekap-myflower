import { axiosInstance } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const token = searchParams.get("token");
        if (!token) {
            setStatus("error");
            setMessage("❌ Token tidak ditemukan.");
            return;
        }

        const verifyEmail = async () => {
            try {
                await axiosInstance.get(`auth/verify-email?token=${token}`);
                setStatus("success");
                setMessage("✅ Email kamu berhasil diverifikasi. Silakan login.");
            } catch (error: any) {
                console.log(error.response.data);
                setStatus("error");
                setMessage("❌ " + (error.response?.data?.message || "Terjadi kesalahan saat memverifikasi email."));
            }
        };

        verifyEmail();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(message);

    return (
        <div className="max-w-md mx-auto mt-40 p-6 bg-white rounded-xl shadow-md text-center">
            <h1 className="text-2xl font-semibold mb-4">Verifikasi Email</h1>
            <p>{status === "loading" ? "Memverifikasi email..." : message}</p>
        </div>
    );
};

export default VerifyEmailPage;
