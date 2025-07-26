import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginFormSchema, type LoginFormType } from "@/schemas/authSchema";
import AuthTemplate from "@/components/templates/AuthTemplate";
import AuthForm from "@/components/organisms/auth/AuthForm";
import { COLORS } from "@/constants/colorConstant";
import axiosInstance from "@/utils/axiosInstance";
import { LOGIN_FIELDS } from "@/components/organisms/auth/auth.constants";
import useAuthStore from "@/stores/useAuthStore";

function Login() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
    });
    const onSubmit = async (data: LoginFormType) => {
        try {
            const response = await axiosInstance.post("auth/login", {
                username: data.username,
                password: data.password,
            });
            useAuthStore.getState().setUser(response.data);
            navigate("/products");
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.code === "ERR_NETWORK") {
                setErrorMessage("Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda");
            }
            if (axiosError.response) {
                setErrorMessage("Username atau Password Yang Anda Masukan Salah");
            }
        }
    };
    return (
        <AuthTemplate description="Masuk untuk memulai pemesanan bunga secara online">
            <p className="text-red-500 ml-4 mb-5 text-center text-sm 2xl:text-lg">{errorMessage}</p>
            <AuthForm
                fields={LOGIN_FIELDS}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                buttonName="Masuk"
                link={
                    <p className="text-center">
                        Belum memiliki akun?{" "}
                        <Link
                            to="/auth/register"
                            className={`font-bold`}
                            style={{ color: COLORS.primary }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.hover)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.primary)}
                        >
                            Buat akun baru sekarang.
                        </Link>
                    </p>
                }
            />
        </AuthTemplate>
    );
}
export default Login;
