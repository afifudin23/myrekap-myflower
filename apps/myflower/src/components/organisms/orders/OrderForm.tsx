import InputDate from "@/components/molecules/inputs/InputDate";
import InputDropdown from "@/components/molecules/inputs/InputDropdown";
import InputText from "@/components/molecules/inputs/InputText";
import { ORDER_FORM_ITEMS } from "@/components/organisms/orders/order.constants";

function OrderForm({ control, errors , watch }: any) {
    const deliveryOption = watch("deliveryOption");
    return (
        <div className="space-y-4">
            {ORDER_FORM_ITEMS.map((item) => {
                switch (item.type) {
                    case "text":
                        return (
                            <InputText
                                key={item.name}
                                name={item.name}
                                label={item.label}
                                type={item.type}
                                control={control}
                                error={errors[item.name]}
                                disabled={deliveryOption !== "Delivery" && item.name === "deliveryAddress"}
                            />
                        );

                    case "dropdown":
                        return (
                            <InputDropdown
                                key={item.name}
                                name={item.name}
                                label={item.label}
                                options={item.options}
                                control={control}
                                error={errors[item.name]}
                            />
                        );
                    
                    case "date":
                        return (
                            <InputDate
                                key={item.name}
                                name={item.name}
                                label={item.label}
                                control={control}
                                error={errors[item.name]}
                            />
                        );
                    
                }
            })}
        </div>
    );
}

export default OrderForm;
