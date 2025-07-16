import { InputFile, InputText } from "@/components/molecules";
import { Button, Loading } from "@/components/atoms";
import { PRODUCT_FORM_ITEMS } from ".";

// interface ProductForm {
//     control: any;
// }

function ProductForm({ control, onSubmit, errors, fieldRefs, isLoading }: any) {
    return (
        <>
            <form className="flex flex-col justify-between gap-5 2xl:gap-6" onSubmit={onSubmit}>
                {PRODUCT_FORM_ITEMS.map((item) => {
                    switch (item.type) {
                        case "text":
                            return (
                                <InputText
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    ref={(el) => (fieldRefs.current[item.name] = el)}
                                    error={errors[item.name as any]?.message}
                                    control={control}
                                />
                            );
                        case "file":
                            return (
                                <InputFile
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    ref={(el) => (fieldRefs.current[item.name] = el)}
                                    error={errors[item.name as any]?.message}
                                    control={control}
                                />
                            );
                    }
                })}
                <Button type="submit" className="mb-28 mt-20 2xl:mt-32">
                    Submit
                </Button>
            </form>
            {isLoading && <Loading />}
        </>
    );
}

export default ProductForm;
