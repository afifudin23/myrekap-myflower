import { InputMonthYear, TitlePage } from "@/components/molecules";
import {
    DEFAULT_VALUE_REPORT_PRODUCT_STOCK,
    REPORT_PRODUCT_STOCK_FORM_FIELDS,
    ReportForm,
} from "@/components/organisms/reports";
import MainLayout from "@/components/templates/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function ReportProductStockFilterPage() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<any>({
        // resolver: zodResolver(reportOrderSchema),
        defaultValues: DEFAULT_VALUE_REPORT_PRODUCT_STOCK,
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

    const onSubmit = (filter: any) => {
        const month = filter.monthYear ? filter.monthYear.getMonth() + 1 : new Date().getMonth() + 1; // getMonth() is zero-based
        const year = filter.monthYear ? filter.monthYear.getFullYear() : new Date().getFullYear();
        const params = new URLSearchParams({
            month: month.toString().padStart(2, "0"),
            year: year.toString(),
            type: filter.type,
        });

        reset(DEFAULT_VALUE_REPORT_PRODUCT_STOCK);
        navigate(`/reports/products/result?${params}`);
    };
    return (
        <MainLayout>
            <div className="flex justify-between items-center">
                <TitlePage title="Laporan Penjualan" subtitle="Mencetak Rekap Penjualan Sesuai Kebutuhan" />
                <button onClick={() => navigate("/reports")}>
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>

            <ReportForm
                fields={REPORT_PRODUCT_STOCK_FORM_FIELDS}
                handleSubmit={handleSubmit}
                control={control}
                errors={errors}
                fieldRefs={fieldRefs}
                onSubmit={onSubmit}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                inputDate={
                    <Controller
                        name="monthYear"
                        control={control}
                        render={({ field: { value, onChange } }) => {
                            return <InputMonthYear monthYear={value} setMonthYear={onChange} />;
                        }}
                    />
                }
            />
        </MainLayout>
    );
}

export default ReportProductStockFilterPage;
