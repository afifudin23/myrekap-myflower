import Button from "@/components/atoms/Button";
import { AlertInfo } from "@/components/molecules/Alert";
import InputDate from "@/components/molecules/InputDate";
import InputDropdown from "@/components/molecules/InputDropdown";
import { defaultValueCetakRekap, InputCetakRekap } from "@/constants/InputPrintSummary";
import { PrintSummaryKey, printSummarySchema, PrintSummaryType } from "@/schemas/printSummarySchema";
import formatters from "@/utils/formatters";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const FormPrintSummary = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<PrintSummaryType>({
        resolver: zodResolver(printSummarySchema),
        defaultValues: defaultValueCetakRekap,
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

    const onSubmit = async (filter: PrintSummaryType) => {
        try {
            const params = new URLSearchParams({
                from_date: filter.fromDate.toISOString(),
                to_date: filter.toDate.toISOString(),
                flower_category: formatters.parseCapital(filter.flowerCategory).toLowerCase(),
                customer_category: formatters.parseCapital(filter.customerCategory).toLowerCase(),
                payment_method: formatters.parseCapital(filter.paymentMethod).toLowerCase(),
                payment_status: formatters.parseCapital(filter.paymentStatus).toLowerCase(),
                order_status: formatters.parseCapital(filter.orderStatus).toLowerCase(),
            });

            reset(defaultValueCetakRekap);
            navigate(`/order-summary/print/report?${params.toString()}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form className="flex flex-col gap-5" action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
                <div id="input-date" className="flex w-full justify-between items-center gap-10">
                    <InputDate
                        label="Dari Tanggal"
                        name="fromDate"
                        control={control}
                        ref={(el) => (fieldRefs.current["fromDate"] = el)}
                        error={errors.fromDate?.message}
                    />
                    <FaArrowRightLong className="text-5xl 2xl:text-7xl mt-6" />
                    <InputDate
                        label="Sampai Tanggal"
                        name="toDate"
                        control={control}
                        ref={(el) => (fieldRefs.current["toDate"] = el)}
                        error={errors.toDate?.message}
                    />
                </div>
                {InputCetakRekap.map((field) => {
                    return (
                        <InputDropdown
                            key={field.name}
                            label={field.label}
                            options={field.options || []}
                            name={field.name}
                            control={control}
                            ref={(el) => (fieldRefs.current[field.name] = el)}
                            error={errors[field.name as PrintSummaryKey]?.message}
                        />
                    );
                })}
                <Button type="submit" className="mb-28 mt-20 2xl:mt-32">
                    Cetak
                </Button>
            </form>

            <AnimatePresence>
                {showAlert && (
                    <AlertInfo handleAlert={() => setShowAlert(false)} message="Rekap filter berhasil dicetak" />
                )}
            </AnimatePresence>
        </>
    );
};

export default FormPrintSummary;
