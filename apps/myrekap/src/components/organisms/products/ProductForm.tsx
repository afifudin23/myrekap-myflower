import { InputText } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { PRODUCT_FORM_ITEMS } from ".";

interface ProductForm {
    control: any;
}

function ProductForm({ control }: ProductForm) {
    return (
        <form className="flex flex-col justify-between gap-5 2xl:gap-6">
            {PRODUCT_FORM_ITEMS.map((item, index) => (
                <InputText key={index} label={item.label} name={item.name} control={control} />
            ))}
            <Button type="submit" className="mb-28 mt-20 2xl:mt-32">
                Submit
            </Button>
        </form>
    );
}

export default ProductForm;
