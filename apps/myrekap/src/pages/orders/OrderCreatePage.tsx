import { TitlePage } from "@/components/molecules";
import MainLayout from "@/components/templates/MainLayout";
import { useRef, useState } from "react";
import { OrderForm } from "@/components/organisms/orders";
import { axiosInstance, removeOrderCookies } from "@/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { Loading } from "@/components/atoms";
import { orderSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

function OrderCreatePage() {
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Type Any, Next Fixing
    const {
        handleSubmit,
        control,
        watch,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(orderSchema.create),
        defaultValues: {
            customerName: "",
            customerCategory: "",
            phoneNumber: "",
            items: [{ productId: "", quantity: 1, message: "", price: 0 }],
            deliveryOption: "",
            deliveryAddress: "",
            readyDate: "",
            paymentMethod: "",
            paymentProof: [],
        },
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            for (const key in data) {
                const value = data[key];

                if (key === "paymentProof" && Array.isArray(value)) {
                    value.map((file: File) => {
                        formData.append(key, file);
                    });
                } else if (typeof value === "object" && !(value instanceof File)) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            }

            await axiosInstance.post("orders/admin", formData);

            navigate("/orders", {
                state: {
                    message: "Pesanan baru berhasil ditambahkan",
                },
            });
            // reset(defaultValuesAddOrderSummary);
        } catch (error: any) {
            if (error.response.status === 500) {
                navigate("/orders", {
                    state: {
                        message: "Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya",
                    },
                });
            } else {
                navigate("/orders", {
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
                <TitlePage title="Tambah Order" subtitle="Menginput Order Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate("/orders");
                        removeOrderCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <OrderForm
                onSubmit={handleSubmit(onSubmit)}
                fieldRefs={fieldRefs}
                control={control}
                watch={watch}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
            />

            {/* Loading */}
            {isLoading && <Loading />}
        </MainLayout>
    );
}

export default OrderCreatePage;
