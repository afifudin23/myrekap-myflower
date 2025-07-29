import { FORGOT_PASSWORD_FIELDS } from "@/components/organisms/auth";
import AuthForm from "@/components/organisms/auth/AuthForm";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { COLORS } from "@/constants/colors";
import { axiosInstance } from "@/utils";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>({ defaultValues: { email: "" } });
    const onSubmit = handleSubmit(async (data) => {
        try {
            await axiosInstance.post("/auth/forgot-password", data);
            alert("Email reset sudah dikirim, silakan dicek!");
            setMessage("");
            reset({ email: "" });
            navigate("/auth/login");
        } catch (error: any) {
            const axiosError = error as AxiosError;
            if (axiosError.code === "ERR_NETWORK") {
                setMessage("Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda");
            }
            if (axiosError.response) {
                setMessage(error.response.data.message);
            }
        }
    });

    return (
        <AuthTemplate description="Masukkan email kamu untuk mengatur ulang kata sandi">
            <p className="text-red-500 ml-4 mb-5 text-center text-sm 2xl:text-lg">{message}</p>
            <AuthForm
                fields={FORGOT_PASSWORD_FIELDS}
                register={register}
                onSubmit={onSubmit}
                errors={errors}
                buttonName="Kirim"
                link={
                    <p className="text-center">
                        Sudah ingat kata sandi?{" "}
                        <Link
                            to="/auth/login"
                            className={`font-bold`}
                            style={{ color: COLORS.primary }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.hover)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.primary)}
                        >
                            Masuk sekarang.
                        </Link>
                    </p>
                }
            />
        </AuthTemplate>
    );
}

export default ForgotPasswordPage;
