import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ORDER_FORM_ITEMS } from ".";
import {
    AlertInfo,
    InputDate,
    InputDropdown,
    InputFile,
    InputMoney,
    InputProduct,
    InputText,
} from "@/components/molecules";
import { Button, Loading } from "@/components/atoms";

// interface OrderFormProps<TSchema extends ZodType<any, any>> {
//     onSubmit: SubmitHandler<TypeOf<TSchema>>; // ini lebih tepat daripada React.FormEventHandler
//     fieldRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
//     control: Control<TypeOf<TSchema>>;
//     watch: UseFormWatch<TypeOf<TSchema>>;
//     clearErrors: UseFormClearErrors<TypeOf<TSchema>>;
//     showAlert: boolean;
//     setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
//     alertMessage: string;
//     isLoading: boolean;
//     errors: FieldErrors<TypeOf<TSchema>>;
// }

const getErrorMessage = (fieldName: string, errors: any) => {
    const error = errors[fieldName as keyof typeof errors];
    return typeof error?.message === "string" ? error.message : undefined;
};

function OrderForm({
    onSubmit,
    fieldRefs,
    control,
    watch,
    showAlert,
    setShowAlert,
    alertMessage,
    isLoading,
    errors,
}: any) {
    const deliveryOption = watch("deliveryOption");
    const paymentMethod = watch("paymentMethod");

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
                {ORDER_FORM_ITEMS.map((item) => {
                    switch (item.type) {
                        case "text":
                            return (
                                <InputText
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[item.name] = el)}
                                    error={getErrorMessage(item.name, errors)}
                                    disabled={deliveryOption !== "Delivery"}
                                />
                            );
                        case "product":
                            return (
                                <InputProduct
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    control={control}
                                    // ref={(el) => (fieldRefs.current[item.name] = el)}  TODO: fix this
                                    error={getErrorMessage(item.name, errors)}
                                />
                            );

                        case "money":
                            return (
                                <InputMoney
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[item.name] = el)}
                                    error={getErrorMessage(item.name, errors)}
                                />
                            );
                        case "dropdown":
                            return (
                                <InputDropdown
                                    key={item.name}
                                    label={item.label}
                                    options={item.options as string[]}
                                    name={item.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[item.name] = el)}
                                    error={getErrorMessage(item.name, errors)}
                                />
                            );
                        case "date":
                            return (
                                <InputDate
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[item.name] = el)}
                                    error={getErrorMessage(item.name, errors)}
                                />
                            );

                        case "file":
                            return (
                                <InputFile
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    control={control}
                                    ref={(el) => (fieldRefs.current[item.name] = el)}
                                    disabled={paymentMethod !== "Bank Transfer"}
                                    error={getErrorMessage(item.name, errors)}
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

export default OrderForm;
