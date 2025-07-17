import { TitlePage } from "@/components/molecules";
import { ProductForm } from "@/components/organisms/products";
import MainLayout from "@/components/templates/MainLayout";
import { axiosInstance } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function ProductCreatePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            price: 0,
            stock: 0,
            description: "",
            images: [],
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
            const formData = new FormData();
            for (const key in data) {
                const value = data[key];

                // Handle multiple file upload
                if (key === "images" && Array.isArray(value)) {
                    value.forEach((file: File) => {
                        formData.append(key, file);
                    });
                } else {
                    formData.append(key, value);
                }
            }

            await axiosInstance.post("products", formData);
            navigate("/products", {
                state: {
                    message: "Produk baru berhasil ditambahkan",
                },
            });
        } catch (error: any) {
            if (error.response.status === 500) {
                navigate("/products", {
                    state: {
                        message: "Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya",
                    },
                });
            } else {
                navigate("/products", {
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
                <TitlePage title="Tambah Produk Baru" subtitle="Mengelola Data Produk Penjualan" />
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <ProductForm
                control={control}
                onSubmit={onSubmit}
                errors={errors}
                isLoading={isLoading}
                fieldRefs={fieldRefs}
            />
        </MainLayout>
    );
}

export default ProductCreatePage;
