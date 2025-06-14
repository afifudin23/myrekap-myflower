import { Control, FieldErrors, Path, SubmitHandler, UseFormClearErrors, UseFormWatch } from "react-hook-form";
import { InputOrderSummary } from "@/constants/InputOrderSummary";
import Button from "@/components/atoms/Button";
import InputText from "@/components/molecules/InputText";
import InputDropdown from "@/components/molecules/InputDropdown";
import InputDate from "@/components/molecules/InputDate";
import InputIsPaid from "@/components/molecules/InputIsPaid";
import InputFile from "@/components/molecules/InputFile";
import InputMoney from "@/components/molecules/InputMoney";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AlertInfo } from "@/components/molecules/Alert";
import Loading from "@/components/atoms/Loading";
import { TypeOf, ZodType } from "zod";

type FormOrderSummaryProps<TSchema extends ZodType<any, any>> = {
    onSubmit: SubmitHandler<TypeOf<TSchema>>; // ini lebih tepat daripada React.FormEventHandler
    fieldRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
    control: Control<TypeOf<TSchema>>;
    watch: UseFormWatch<TypeOf<TSchema>>;
    clearErrors: UseFormClearErrors<TypeOf<TSchema>>;
    showAlert: boolean;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    alertMessage: string;
    isLoading: boolean;
    errors: FieldErrors<TypeOf<TSchema>>;
};
const getErrorMessage = (fieldName: string, errors: any) => {
    const error = errors[fieldName as keyof typeof errors];
    return typeof error?.message === "string" ? error.message : undefined;
};

function FormOrderSummary<TSchema extends ZodType<any, any>>({
    onSubmit,
    fieldRefs,
    control,
    watch,
    clearErrors,
    showAlert,
    setShowAlert,
    alertMessage,
    isLoading,
    errors,
}: FormOrderSummaryProps<TSchema>) {
    const isPaid = watch("isPaid" as Path<TypeOf<TSchema>>);
    useEffect(() => {
        if (!isPaid) {
            clearErrors(["paymentMethod", "paymentProof"] as Path<TypeOf<TSchema>>[]);
        }
    }, [isPaid]);

    useEffect(() => {
        if (!errors || Object.keys(errors).length === 0) return;
        const firstErrorField = Object.keys(errors)[0];
        const errorRef = fieldRefs.current[firstErrorField];

        if (errorRef) {
            setTimeout(() => {
                errorRef.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }
    }, [errors]);

    return (
        <>
            <form className="flex flex-col justify-between gap-5 2xl:gap-6" onSubmit={onSubmit}>
                {InputOrderSummary.map((field) => {
                    switch (field.type) {
                        case "text":
                            return (
                                <InputText
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[field.name] = el)}
                                    error={getErrorMessage(field.name, errors)}
                                />
                            );
                        case "money":
                            return (
                                <InputMoney
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[field.name] = el)}
                                    error={getErrorMessage(field.name, errors)}
                                />
                            );
                        case "dropdown":
                            return (
                                <InputDropdown
                                    key={field.name}
                                    label={field.label}
                                    options={field.options as string[]}
                                    name={field.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[field.name] = el)}
                                    disabled={field.name === "paymentMethod" ? !watch("isPaid" as any) : false}
                                    error={getErrorMessage(field.name, errors)}
                                />
                            );
                        case "date":
                            return (
                                <InputDate
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[field.name] = el)}
                                    error={getErrorMessage(field.name, errors)}
                                />
                            );
                        case "checkbox":
                            return (
                                <InputIsPaid
                                    key={field.name}
                                    name={field.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[field.name] = el)}
                                    error={getErrorMessage(field.name, errors)}
                                />
                            );
                        case "file":
                            return (
                                <InputFile
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[field.name] = el)}
                                    disabled={!watch("isPaid" as any) || watch("paymentMethod" as any) !== "Transfer"}
                                    error={getErrorMessage(field.name, errors)}
                                />
                            );
                        default:
                            return null;
                    }
                })}

                <Button type="submit" className="mb-28 mt-20 2xl:mt-32">
                    Submit
                </Button>
            </form>

            {/* Custom Alert */}
            <AnimatePresence>
                {showAlert && <AlertInfo handleAlert={() => setShowAlert(false)} message={alertMessage} />}
            </AnimatePresence>

            {/* Loading */}
            {isLoading && <Loading />}
        </>
    );
}

export default FormOrderSummary;
