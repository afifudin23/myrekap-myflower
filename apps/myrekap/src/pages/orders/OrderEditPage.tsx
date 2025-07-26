import { Loading } from "@/components/atoms";
import { TitlePage } from "@/components/molecules";
import { OrderForm } from "@/components/organisms/orders";
import MainLayout from "@/components/templates/MainLayout";
import { orderSchema } from "@/schemas";
import { axiosInstance, formatters } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

function OrderEditPage() {
    const { id } = useParams();
    const data = JSON.parse(localStorage.getItem("orderDetail") || "{}");
    const order = formatters.parseInputOrder(data);
    const navigate = useNavigate();
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        watch,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(orderSchema.update),
        defaultValues: order,
    });
    console.log(order)
    console.log(errors)
    const onSubmit = async (data: any) => {
        console.log(data)
        setIsLoading(true);
        try {
            const formData = new FormData();
            for (const key in data) {
                const value = data[key];

                if (key === "paymentProof" && Array.isArray(value)) {
                    value.map((file) => {
                        formData.append(key, file);
                    });
                } else if (typeof value === "object" && !(value instanceof File)) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            }
            await axiosInstance.put(`orders/admin/${id}/edit`, formData);

            navigate("/orders", {
                state: {
                    message: `Pesanan berhasil diupdate`,
                },
            });
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
                <TitlePage title="Update Order" subtitle="Mengupdate Order Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate(-1);
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

export default OrderEditPage;
