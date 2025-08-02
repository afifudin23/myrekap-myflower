import { InputDropdown, InputFile, InputMoney, InputText } from "@/components/molecules";
import { Button, Loading } from "@/components/atoms";
import { COLORS } from "@/constants/colors";

function ProductForm({ control, onSubmit, errors, fieldRefs, isLoading, setValue, getValues, fields }: any) {
    return (
        <>
            <form className="flex flex-col justify-between gap-5 2xl:gap-6" onSubmit={onSubmit}>
                {fields.map((item: any) => {
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
                                    disabled={item.disabled}
                                />
                            );
                        case "money":
                            return (
                                <InputMoney
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
                                    getValues={getValues}
                                    setValue={setValue}
                                />
                            );
                        case "dropdown":
                            return (
                                <InputDropdown
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    ref={(el) => (fieldRefs.current[item.name] = el)}
                                    error={errors[item.name as any]?.message}
                                    control={control}
                                    options={item.options}
                                    optionLabel={item.optionLabel}
                                />
                            );
                    }
                })}
                <Button
                    type="submit"
                    className="mb-28 mt-20 2xl:mt-32 p-1 2xl:p-2 w-[15rem] 2xl:w-[20rem]"
                    colors={COLORS}
                >
                    Submit
                </Button>
            </form>
            {isLoading && <Loading />}
        </>
    );
}

export default ProductForm;
