import { RESET_PASSWORD_FIELDS } from "@/components/organisms/auth/auth.constants";
import AuthForm from "@/components/organisms/auth/AuthForm";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { axiosInstance } from "@/utils";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPasswordPage() {
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>({
        defaultValues: { password: "", confirmPassword: "" },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axiosInstance.post("/auth/reset-password", { ...data, token });
            alert("Reset berhasil! Sekarang kamu bisa masuk dengan kata sandi baru.");
            setMessage("");
            reset({ password: "", confirmPassword: "" });
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
        <AuthTemplate description="Reset Password, Silakan atur password kamu di bawah ini">
            <p className="text-red-500 ml-4 mb-5 text-center text-sm 2xl:text-lg">{message}</p>
            <AuthForm
                fields={RESET_PASSWORD_FIELDS}
                register={register}
                onSubmit={onSubmit}
                errors={errors}
                buttonName="Update Password"
            />
        </AuthTemplate>
    );
}

export default ResetPasswordPage;
