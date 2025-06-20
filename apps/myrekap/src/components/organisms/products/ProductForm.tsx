import Button from "@/components/atoms/Button";
import InputText from "@/components/molecules/InputText";
import { PRODUCT_FORM_FIELD } from "@/constants/productFormContants";

interface ProductForm {
    control: any;
}

function ProductForm({ control }: ProductForm) {
    return (
        <form className="flex flex-col justify-between gap-5 2xl:gap-6">
            {PRODUCT_FORM_FIELD.map((field, index) => (
                <InputText key={index} label={field.label} name={field.name} control={control} />
            ))}
            <Button type="submit" className="mb-28 mt-20 2xl:mt-32">
                Submit
            </Button>
        </form>
    );
}

export default ProductForm;
