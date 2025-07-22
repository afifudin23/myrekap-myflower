import { TitlePage } from "@/components/molecules";
import { UserForm } from "@/components/organisms/users";
import MainLayout from "@/components/templates/MainLayout";
import { axiosInstance, removeUserDetailCookies } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function AdminCreatePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {
            username: "",
            phoneNumber: "",
            email: "",
            password: "",
            confPassword: "",
        },
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

    const onSubmit = handleSubmit(async (data: any) => {
        setIsLoading(true);
        try {
            await axiosInstance.post("users/admin", data);
            navigate("/users/admin", {
                state: {
                    message: "User baru berhasil ditambahkan",
                },
            });
        } catch (error: any) {
            console.log(error.response.data);
            if (error.response.status === 500) {
                navigate("/users/admin", {
                    state: {
                        message: "Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya",
                    },
                });
            } else {
                navigate("/users/admin", {
                    state: {
                        message: error.response.data.message,
                    },
                });
            }
        } finally {
            setIsLoading(false);
        }
    });
    return (
        <MainLayout>
            <div className="flex justify-between">
                <TitlePage title="Tambah User Admin" subtitle="Menambah User Baru Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate(-1);
                        removeUserDetailCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <UserForm
                control={control}
                onSubmit={onSubmit}
                errors={errors}
                isLoading={isLoading}
                fieldRefs={fieldRefs}
            />
        </MainLayout>
    );
}

export default AdminCreatePage;
