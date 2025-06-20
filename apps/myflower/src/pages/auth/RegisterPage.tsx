import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { registerFormSchema, type RegisterFormType } from "@/schemas/authSchema";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { REGISTER_FIELDS } from "@/constants/authConstant";
import { COLORS } from "@/constants/colorConstant";
import AuthForm from "@/components/organisms/auth/AuthForm";

function Register() {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormType>({
        resolver: zodResolver(registerFormSchema),
    });
    const onSubmit = async (data: RegisterFormType) => {
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
    return (
        <AuthTemplate description="Daftar Akun, untuk memulai berbelanja di MyFlower">
            <AuthForm
                fields={REGISTER_FIELDS}
                errorMessage={errorMessage}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                buttonName="Daftar"
                link={
                    <p className="text-center">
                        Sudah terdaftar?{" "}
                        <Link
                            to="/auth/login"
                            className={`font-bold`}
                            style={{ color: COLORS.primary }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.hover)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.primary)}
                        >
                            Masuk ke akun Anda.
                        </Link>
                    </p>
                }
            />
        </AuthTemplate>
    );
}

export default Register;
