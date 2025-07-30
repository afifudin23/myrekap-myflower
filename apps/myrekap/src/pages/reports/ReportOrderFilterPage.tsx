import { TitlePage } from "@/components/molecules";
import { DEFAULT_VALUE_REPORT_ORDER, ReportOrderForm } from "@/components/organisms/reports";
import MainLayout from "@/components/templates/MainLayout";
import {
    CUSTOMER_CATEGORY_LABELS,
    ORDER_STATUS_LABELS,
    PAYMENT_METHOD_LABELS,
    PAYMENT_STATUS_LABELS,
} from "@/constants/category";
import { reportOrderSchema, ReportOrderType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ReportOrderFilterPage = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ReportOrderType>({
        resolver: zodResolver(reportOrderSchema),
        defaultValues: DEFAULT_VALUE_REPORT_ORDER,
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

    const onSubmit = (filter: ReportOrderType) => {
        try {
            const params = new URLSearchParams({
                from_date: filter.fromDate.toISOString(),
                to_date: filter.toDate.toISOString(),
                customer_category: CUSTOMER_CATEGORY_LABELS[filter.customerCategory].toLowerCase(),
                payment_method: PAYMENT_METHOD_LABELS[filter.paymentMethod].toLowerCase(),
                payment_status: PAYMENT_STATUS_LABELS[filter.paymentStatus].toLowerCase(),
                order_status: ORDER_STATUS_LABELS[filter.orderStatus].toLowerCase(),
            });

            reset(DEFAULT_VALUE_REPORT_ORDER);
            navigate(`/reports/orders/result?${params}`);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <MainLayout>
            <TitlePage title="Cetak Rekap" subtitle="Mencetak Rekap Sesuai Kebutuhan" />
            <ReportOrderForm
                handleSubmit={handleSubmit}
                control={control}
                errors={errors}
                fieldRefs={fieldRefs}
                onSubmit={onSubmit}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
        </MainLayout>
    );
};

export default ReportOrderFilterPage;
