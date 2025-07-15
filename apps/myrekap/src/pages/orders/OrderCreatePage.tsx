import { TitlePage } from "@/components/molecules";
import { defaultValuesAddOrderSummary, OrderForm } from "@/components/organisms/orders";
import MainLayout from "@/components/templates/MainLayout";
import { createOrderSchema, CreateOrderType } from "@/schemas";
import { axiosInstance } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

function OrderCreatePage() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let loadingTimer: NodeJS.Timeout | null = null;

    // Type Any, Next Fixing 
    const {
        handleSubmit,
        control,
        watch,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: defaultValuesAddOrderSummary,
    });

    const onSubmit = async (data: CreateOrderType) => {
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
            setShowAlert(true);
            if (error.response.status === 500) {
                setAlertMessage("Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya");
            } else {
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
            <TitlePage title="Tambah Order" subtitle="Menginput Order Sesuai Kebutuhan" />
            <OrderForm
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

export default OrderCreatePage;
