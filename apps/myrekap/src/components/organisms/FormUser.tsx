import Button from "@/components/atoms/Button";
import Loading from "@/components/atoms/Loading";
import InputText from "@/components/molecules/InputText";
import { defaultValueInputUser, InputUser } from "@/constants/InputUser";
import { InputUserKey, inputUserSchema, InputUserType } from "@/schemas/userSchema";
import axiosInstance from "@/utils/axiosInstance";
import { getUserDetailCookies, removeUserDetailCookies } from "@/utils/userDetailCookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function FormUser({ type = "add" }: any) {
    const userCookies = getUserDetailCookies();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    if (!userCookies && type === "update")
        return <h1 className="text-4xl font-semibold text-center mt-20">Data Tidak Ditemukan</h1>;
    const navigate = useNavigate();
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputUserType>({
        resolver: zodResolver(inputUserSchema),
        defaultValues: type === "update" ? userCookies : defaultValueInputUser,
    });

    useEffect(() => {
        if (!errors || Object.keys(errors).length === 0) return;
        const firstErrorField = Object.keys(errors)[0];
        const errorRef = fieldRefs.current[firstErrorField];

        // Delay scroll agar DOM sempat update (error message muncul)
        if (errorRef) {
            setTimeout(() => {
                errorRef.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 50);
        }
    }, [errors]);

    const onSubmit = async (data: InputUserType) => {
        setIsLoading(true)
        try {
            if (type === "update") {
                await axiosInstance.put(`users/${userCookies.id}`, data);
                navigate("/administrator", {
                    state: { message: "Perubahan pada user berhasil disimpan" },
                });
            } else {
                await axiosInstance.post("users", data);
                navigate("/administrator", {
                    state: {
                        message: "User baru berhasil ditambahkan",
                    },
                });
            }
            reset(userCookies ? userCookies : defaultValueInputUser);
            removeUserDetailCookies();
        } catch (error: any) {
            if (error.response.status === 500) {
                navigate("/administrator", {
                    state: {
                        message: "Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya",
                    },
                });
            } else {
                navigate("/administrator", {
                    state: {
                        message: error.response.data.message,
                    },
                });
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <form className="flex flex-col justify-between gap-6" onSubmit={handleSubmit(onSubmit)}>
                {InputUser.map((field) => {
                    return (
                        <InputText
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            ref={(el) => (fieldRefs.current[field.name] = el)}
                            error={errors[field.name as InputUserKey]?.message}
                            control={control}
                        />
                    );
                })}
                <Button type="submit" className="mb-28 mt-20 2xl:mt-32">
                    Submit
                </Button>
            </form>
            {isLoading && <Loading />}
        </>
    );
}

export default FormUser;
