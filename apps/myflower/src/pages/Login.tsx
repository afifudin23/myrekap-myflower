import { useForm } from "react-hook-form";
import AuthForm from "../components/organisms/AuthForm";
import AuthTemplate from "../components/templates/AuthTemplate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { AxiosError } from "axios";
import { LOGIN_FIELDS } from "../constants/authConstant";
import { loginFormSchema, type LoginFormType } from "../schemas/authSchema";
import { Link } from "react-router-dom";

function Login() {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
    });
    const onSubmit = async (data: LoginFormType) => {
        try {
            console.log(data);
            // const response = await axiosInstance.post("auth/login", {
            //     username: data.username,
            //     pin: data.pin,
            // });
            // setUserCookies({ username: response.data.username, role: response.data.role });
            // navigate("/beranda");
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.code === "ERR_NETWORK") {
                setErrorMessage("Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda");
            }
            if (axiosError.response) {
                setErrorMessage("Username atau PIN Yang Anda Masukan Salah");
            }
        }
    };
    console.log(errors)
    return (
        <AuthTemplate description="Masuk untuk memulai pemesanan bunga secara online">
            <AuthForm
                fields={LOGIN_FIELDS}
                errorMessage={errorMessage}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                link={
                    <p className="text-center">
                        Belum memiliki akun?{" "}
                        <Link to="/auth/register" className="font-bold text-[#355ee7]">
                            Buat akun baru sekarang.
                        </Link>
                    </p>
                }
            />
        </AuthTemplate>
    );
}
export default Login;
