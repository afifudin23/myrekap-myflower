import { useEffect } from "react";
import { ORDER_FORM_ITEMS } from ".";
import { InputDate, InputDropdown, InputFile, InputMoney, InputProduct, InputText } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { COLORS } from "@/constants/colors";
// import { formatters } from "@/utils";

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

function OrderForm({ onSubmit, fieldRefs, control, watch, errors, getValues, setValue }: any) {
    const deliveryOption = watch("deliveryOption");
    const paymentMethod = watch("paymentMethod");
    // const items = watch("items");
    // const totalPrice = items.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    // const shippingCost = deliveryOption === "Delivery" ? totalPrice * 0.1 : 0;

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
                                disabled={deliveryOption !== "DELIVERY" && item.name === "deliveryAddress"}
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
                                setValue={setValue}
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
                                options={item.options as any[]}
                                optionLabel={item.optionLabel}
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
                                disabled={paymentMethod !== "BANK_TRANSFER"}
                                error={getErrorMessage(item.name, errors)}
                                getValues={getValues}
                                setValue={setValue}
                            />
                        );
                    default:
                        return null;
                }
            })}
            {/* <h1>Biaya Pengiriman: {formatters.formatRupiah(shippingCost)}</h1>
            <h1>Total Harga: {formatters.formatRupiah(totalPrice + shippingCost)}</h1> */}

            <Button type="submit" className="mb-28 mt-20 2xl:mt-32 p-1 2xl:p-2 w-[15rem] 2xl:w-[20rem]" colors={COLORS}>
                Submit
            </Button>
        </form>
    );
}

export default OrderForm;
