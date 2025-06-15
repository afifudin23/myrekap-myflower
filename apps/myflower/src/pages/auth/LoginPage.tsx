import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginFormSchema, type LoginFormType } from "@/schemas/authSchema";
import { LOGIN_FIELDS } from "@/constants/authConstant";
import AuthTemplate from "@/components/templates/AuthTemplate";
import AuthForm from "@/components/organisms/auth/AuthForm";
import { COLORS } from "@/constants/colorConstant";

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
            console.log(data);
            // const response = await axiosInstance.post("auth/login", {
            //     username: data.username,
            //     pin: data.pin,
            // });
            // setUserCookies({ username: response.data.username, role: response.data.role });
            navigate("/products");
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
    console.log(errors);
    return (
        <AuthTemplate description="Masuk untuk memulai pemesanan bunga secara online">
            <AuthForm
                fields={LOGIN_FIELDS}
                errorMessage={errorMessage}
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
