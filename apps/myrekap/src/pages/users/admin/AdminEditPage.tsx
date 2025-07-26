import MainLayout from "@/components/templates/MainLayout";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { TitlePage } from "@/components/molecules";
import { axiosInstance } from "@/utils";
import { UserForm } from "@/components/organisms/users";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function AdminEditPage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userSelected") || "{}");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {
            fullName: user?.fullName,
            username: user?.username,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
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

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await axiosInstance.put(`users/${user.id}`, data);
            localStorage.removeItem("userSelected");
            navigate("/users/admin", {
                state: { message: "Perubahan pada user berhasil disimpan" },
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
    };
    return (
        <MainLayout>
            <div className="flex justify-between">
                <TitlePage title="Update User Admin" subtitle="Mengupdate User Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        localStorage.removeItem("userSelected");
                        navigate("/users/admin");
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>

            <UserForm
                control={control}
                fieldRefs={fieldRefs}
                errors={errors}
                isLoading={isLoading}
                onSubmit={handleSubmit(onSubmit)}
            />
        </MainLayout>
    );
}

export default AdminEditPage;
