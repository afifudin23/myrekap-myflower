import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiFlowerLine } from "react-icons/ri";
import { getUserCookies, setUserCookies } from "@/utils";
import axiosInstance from "@/utils/axiosInstance";
import { loginFormSchema, LoginFormType, LoginKey } from "@/schemas";
import { Button } from "@/components/atoms";

function AuthForm() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const items = ["Username", "Password"];
    const navigate = useNavigate();
    useEffect(() => {
        if (getUserCookies() !== null) {
            navigate("/beranda");
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
        try {
            const response = await axiosInstance.post("auth/login", {
                username: data.username,
                password: data.password,
            });
            console.log(response)
            setUserCookies({ username: response.data.username, role: response.data.role });
            navigate("/beranda");
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
        <div className="border w-1/3 2xl:w-1/4 m-auto p-5 rounded-2xl bg-[#F5F1FB]">
            <h1 className="text-base 2xl:text-xl font-poppins w-fit">
                <b className="flex gap-1 items-center text-base 2xl:text-xl">
                    <RiFlowerLine />
                    <span>Karangan Bunga Anda</span>
                </b>
                <p className="border border-black"></p>
            </h1>
            <div className="flex flex-col py-7 2xl:py-10">
                <div className="mb-3 2xl:mb-5 flex flex-col items-center">
                    <b className="text-4xl 2xl:text-4xl font-semibold">MyRekap</b>
                    <p className="text-sm 2xl:text-base text-slate-500 mt-1 text-center">
                        Login Untuk Masuk Admin Dashboard
                    </p>
                </div>
                <p className="text-red-500 ml-4 mb-5 p-3 text-center text-sm 2xl:text-base">{errorMessage}</p>
                <form className="flex flex-col px-7 2xl:px-10 gap-5 2xl:gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        {items.map((item) => (
                            <div key={item}>
                                <input
                                    type={item === "PIN" ? "password" : "text"}
                                    placeholder={`Input ${item}`}
                                    className="border p-2 pl-4 rounded-2xl w-full font-medium text-sm 2xl:text-base"
                                    autoComplete={item}
                                    {...register(item.toLowerCase() as LoginKey)}
                                />
                                {errors[item.toLowerCase() as LoginKey] && (
                                    <p className="ml-3 text-sm text-red-500">
                                        *{errors[item.toLowerCase() as LoginKey]?.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="border border-slate-300"></p>
                    <Button type="submit" width="w-full p-1">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;
