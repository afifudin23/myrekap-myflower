import { Button, Loading } from "@/components/atoms";
import { InputText } from "@/components/molecules";
import { USER_FORM_ITEMS } from ".";

function FormUser({ control, fieldRefs, errors, isLoading, onSubmit }: any) {
    return (
        <>
            <form className="flex flex-col justify-between gap-6" onSubmit={onSubmit}>
                {USER_FORM_ITEMS.map((field) => {
                    return (
                        <InputText
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            ref={(el) => (fieldRefs.current[field.name] = el)}
                            error={errors[field.name as any]?.message}
                            control={control}
                        />
                    );
                })}
                <Button type="submit" className="mb-28 mt-20 2xl:mt-32">
                    Submit
                </Button>
            </form>
            {isLoading && <Loading />}
        </>
    );
}

export default FormUser;
