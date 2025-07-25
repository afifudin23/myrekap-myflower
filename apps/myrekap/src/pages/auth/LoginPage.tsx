import { AuthForm } from "@/components/organisms/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { loginFormSchema, LoginFormType } from "@/schemas";
import { useAuthStore } from "@/stores/useAuthStore";
import { AnimatePresence } from "framer-motion";
import { AlertInfo } from "@/components/molecules";
import { Loading } from "@/components/atoms";

function LoginPage() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let loadingTimer: NodeJS.Timeout | null = null;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    // Alert
    const location = useLocation();
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const state = location.state as { message?: string };

        if (state?.message) {
            setMessage(state.message);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            navigate(location.pathname, { replace: true });
        }
    }, []);

    useEffect(() => {
        if (user?.username) {
            navigate("/dashboard");
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = async (data: LoginFormType) => {
        loadingTimer = setTimeout(() => {
            setIsLoading(true);
        }, 500);
        try {
            const response = await axiosInstance.post("auth/login", {
                username: data.username,
                password: data.password,
            });
            if (loadingTimer) {
                clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            setIsLoading(false);
            useAuthStore.getState().setUser(response.data);
            navigate("/dashboard");
        } catch (error) {
            const axiosError = error as AxiosError;
            setIsLoading(false);
            setShowAlert(true);
            if (axiosError.code === "ERR_NETWORK") {
                setMessage("Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda");
            }
            if (axiosError.response) {
                setMessage("Username atau Password Yang Anda Masukan Salah");
            }
        } finally {
            if (loadingTimer) {
                clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            setTimeout(() => setShowAlert(false), 3000);
        }
    };
    return (
        <div className="bg-gradient-to-t from-[#FFFFFF] to-[#096bff] h-screen flex">
            <AuthForm
                onSubmit={onSubmit}
                items={["Username", "Password"]}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
            />

            {/* Custom Alert */}
            <AnimatePresence>
                {showAlert && <AlertInfo handleAlert={() => setShowAlert(false)} message={message} />}
            </AnimatePresence>

            {/* Loading */}
            {isLoading && <Loading />}
        </div>
    );
}
export default LoginPage;
