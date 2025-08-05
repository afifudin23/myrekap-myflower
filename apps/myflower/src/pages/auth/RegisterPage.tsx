import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { registerFormSchema, type RegisterFormType } from "@/schemas/authSchema";
import AuthTemplate from "@/components/templates/AuthTemplate";
import {  TEXT_COLORS } from "@/constants/colors";
import AuthForm from "@/components/organisms/auth/AuthForm";
import { REGISTER_FIELDS } from "@/components/organisms/auth/auth.constants";
import { axiosInstance } from "@/utils";

function Register() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormType>({
        resolver: zodResolver(registerFormSchema),
    });
    const onSubmit = async (data: RegisterFormType) => {
        try {
            await axiosInstance.post("auth/register", data);
            alert("Pendaftaran berhasil! Link verifikasi akun telah dikirim ke email kamu.");
            navigate("/auth/login");
        } catch (error: any) {
            console.log(error.response.data);
            const axiosError = error as AxiosError;
            if (axiosError.code === "ERR_NETWORK") {
                setErrorMessage("Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda");
            }
            if (axiosError.response) {
                setErrorMessage("Gagal Daftar Akun. Silahkan Periksa Kembali");
            }
        }
    };
    return (
        <AuthTemplate description="Daftar Akun, untuk memulai berbelanja di MyFlower">
            <p className="text-red-500 ml-4 mb-5 text-center text-sm 2xl:text-lg">{errorMessage}</p>
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
                            className={`font-bold hover:underline ${TEXT_COLORS.primary}`}
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
