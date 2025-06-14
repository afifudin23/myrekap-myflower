import Title from "@/components/molecules/Title";
import FormOrderSummary from "@/components/organisms/FormOrderSummary";
import MainLayout from "@/components/templates/MainLayout";
import { defaultValuesAddOrderSummary } from "@/constants/InputOrderSummary";
import { addOrderSummarySchema, AddOrderSummaryType } from "@/schemas/orderSummarySchema";
import axiosInstance from "@/utils/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

function AddOrder() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let loadingTimer: NodeJS.Timeout | null = null;

    const {
        handleSubmit,
        control,
        watch,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<AddOrderSummaryType>({
        resolver: zodResolver(addOrderSummarySchema),
        defaultValues: defaultValuesAddOrderSummary,
    });

    const onSubmit = async (data: AddOrderSummaryType) => {
        loadingTimer = setTimeout(() => {
            setIsLoading(true);
        }, 500);
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, (data as Record<string, any>)[key]);
            }
            await axiosInstance.post("order-summaries", formData);

            if (loadingTimer) {
                clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            setIsLoading(false);
            setShowAlert(true);
            setAlertMessage("Pesanan baru telah berhasil disimpan");
            reset(defaultValuesAddOrderSummary);
            window.scrollTo({ top: 0, behavior: "smooth" });
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
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    return (
        <MainLayout>
            <Title title="Input Order" subtitle="Menginput Order Sesuai Kebutuhan" />
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

export default AddOrder;
