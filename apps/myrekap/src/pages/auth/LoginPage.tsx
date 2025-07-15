import { AuthForm } from "@/components/organisms/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCookies, setUserCookies } from "@/utils";
import axiosInstance from "@/utils/axiosInstance";
import { loginFormSchema, LoginFormType } from "@/schemas";

function LoginPage() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let loadingTimer: NodeJS.Timeout | null = null;
    const navigate = useNavigate();
    useEffect(() => {
        if (getUserCookies() !== null) {
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
            setUserCookies({ username: response.data.username, role: response.data.role });
            navigate("/dashboard");
        } catch (error) {
            const axiosError = error as AxiosError;
            setIsLoading(false);
            setShowAlert(true);
            if (axiosError.code === "ERR_NETWORK") {
                setAlertMessage("Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda");
            }
            if (axiosError.response) {
                setAlertMessage("Username atau Password Yang Anda Masukan Salah");
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
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                alertMessage={alertMessage}
                onSubmit={onSubmit}
                items={["Username", "Password"]}
                register={register}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                errors={errors}
            />
        </div>
    );
}
export default LoginPage;
