import { useState } from "react";
import AuthForm from "../components/organisms/AuthForm";
import AuthTemplate from "../components/templates/AuthTemplate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
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
            <AuthForm  />
        </AuthTemplate>
    );
}

export default Register;
