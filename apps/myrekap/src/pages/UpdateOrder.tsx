import Title from "@/components/molecules/Title";
import FormOrderSummary from "@/components/organisms/FormOrderSummary";
import MainLayout from "@/components/templates/MainLayout";
import { updateOrderSummarySchema, UpdateOrderSummaryType } from "@/schemas/orderSummarySchema";
import axiosInstance from "@/utils/axiosInstance";
import formatters from "@/utils/formatters";
import { getOrderCookies, setOrderCookies } from "@/utils/orderCookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

function UpdateOrder() {
    const orderCookies = formatters.formatInputOrderSummary(getOrderCookies());
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { id } = useParams();
    let loadingTimer: NodeJS.Timeout | null = null;

    const {
        handleSubmit,
        control,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm<UpdateOrderSummaryType>({
        resolver: zodResolver(updateOrderSummarySchema),
        defaultValues: orderCookies,
    });

    const onSubmit = async (data: UpdateOrderSummaryType) => {
        loadingTimer = setTimeout(() => {
            setIsLoading(true);
        }, 500);
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, (data as Record<string, any>)[key]);
            }

            if (typeof data.paymentProof === "object" && !(data.paymentProof instanceof File))
                formData.set("paymentProof", JSON.stringify(data.paymentProof));
            const { data: updatedData } = await axiosInstance.put(`order-summaries/edit/${id}`, formData);

            // Update order cookies if payment proof is changed
            let updatedOrderCookies;
            if (data.paymentProof instanceof File) {
                updatedOrderCookies = { ...getOrderCookies(), ...updatedData.data, id };
                // Delete order cookies if payment proof is deleted and payment method is not transfer
            } else if (data.paymentProof === null) {
                updatedOrderCookies = { ...getOrderCookies(), ...updatedData.data, id };
                await axiosInstance.delete(`payment-proofs/${id}`);
                // Update order cookies if payment proof is not a changed
            } else if (typeof data.paymentProof === "object" && !(data.paymentProof instanceof File)) {
                updatedOrderCookies = {
                    ...getOrderCookies(),
                    ...updatedData.data,
                    id,
                    paymentProof: data.paymentProof,
                };
            }
            setOrderCookies(updatedOrderCookies);

            loadingTimer = setTimeout(() => {
                setIsLoading(true);
            }, 500);
            setIsLoading(false);

            navigate(`/order-summary/${id}`, {
                state: { alertMessage: "Perubahan pada pesanan telah berhasil disimpan" },
            });
        } catch (error: any) {
            if (error.response.status === 500) {
                setShowAlert(true);
                setAlertMessage("Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya");
            } else {
                setShowAlert(true);
                setAlertMessage(error.response.data.message);
            }
        } finally {
            if (loadingTimer) {
                clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="flex justify-between">
                <Title title="Update Order" subtitle="Mengupdate Order Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <FormOrderSummary
                onSubmit={handleSubmit(onSubmit)}
                fieldRefs={fieldRefs}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                alertMessage={alertMessage}
                isLoading={isLoading}
                errors={errors}
            />
        </MainLayout>
    );
}

export default UpdateOrder;
