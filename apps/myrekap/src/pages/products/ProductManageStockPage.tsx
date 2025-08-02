import { TitlePage } from "@/components/molecules";
import { PRODUCT_STOCK_FORM_FIELDS, ProductForm } from "@/components/organisms/products";
import MainLayout from "@/components/templates/MainLayout";
import { axiosInstance } from "@/utils";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function ProductManageStockPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const product = JSON.parse(localStorage.getItem("productDetail") || "{}");

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            name: product?.name,
            type: "",
            quantity: 0,
            note: "",
        },
    });

    const onSubmit = handleSubmit(async(data) => {
        setIsLoading(true);
        try {
            await axiosInstance.post(`products/${product.id}/stock`, data);
            localStorage.removeItem("productDetail");
            navigate("/products", {
                state: {
                    message: "Perubahan pada stok produk berhasil disimpan",
                },
            })
        } catch (error: any) {
            console.log(error.response.data);
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
                <TitlePage title="Edit Produk" subtitle="Mengelola Data Produk Penjualan" />
                <button
                    onClick={() => {
                        navigate("/products");
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
                getValues={getValues}
                setValue={setValue}
                fields={PRODUCT_STOCK_FORM_FIELDS}
            />
        </MainLayout>
    );
}

export default ProductManageStockPage;
