import { useForm } from "react-hook-form";
import AuthForm from "../components/organisms/AuthForm";
import AuthTemplate from "../components/templates/AuthTemplate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { AxiosError } from "axios";
import { LOGIN_FIELDS } from "../constants/authConstant";
import { loginFormSchema, type LoginFormType } from "../schemas/authSchema";

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
            console.log(data)
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
    return (
        <AuthTemplate>
            <AuthForm
                fields={LOGIN_FIELDS}
                errorMessage={errorMessage}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
            />
        </AuthTemplate>
    );
}
export default Login;
