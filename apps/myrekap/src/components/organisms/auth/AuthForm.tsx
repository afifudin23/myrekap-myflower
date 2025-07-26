import { RiFlowerLine } from "react-icons/ri";
import { Button } from "@/components/atoms";
import { TypeOf, ZodType } from "zod";
import { FieldErrors, Path, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface AuthFormProps<TSchema extends ZodType<any, any>> {
    onSubmit: SubmitHandler<TypeOf<TSchema>>;
    items: string[];
    register: UseFormRegister<TypeOf<TSchema>>;
    handleSubmit: UseFormHandleSubmit<TypeOf<TSchema>>;
    errors: FieldErrors<TypeOf<TSchema>>;
}
const getErrorMessage = (fieldName: string, errors: any) => {
    const error = errors[fieldName as keyof typeof errors];
    return typeof error?.message === "string" ? error.message : undefined;
};

function AuthForm<TSchema extends ZodType<any, any>>({
    onSubmit,
    items,
    register,
    handleSubmit,
    errors,
}: AuthFormProps<TSchema>) {
    return (
        <div className="border w-1/3 2xl:w-1/4 m-auto p-5 rounded-2xl bg-[#F5F1FB]">
            <h1 className="text-base 2xl:text-xl font-poppins w-fit">
                <b className="flex gap-1 items-center text-base 2xl:text-xl">
                    <RiFlowerLine />
                    <span>Karangan Bunga Anda</span>
                </b>
                <p className="border border-black"></p>
            </h1>
            <div className="flex flex-col py-7 2xl:py-10">
                <div className="mb-3 2xl:mb-5 flex flex-col items-center">
                    <b className="text-4xl 2xl:text-4xl font-semibold">MyRekap</b>
                    <p className="text-sm 2xl:text-base text-slate-500 mt-1 text-center">
                        Login Untuk Masuk Admin Dashboard
                    </p>
                </div>
                <form className="flex flex-col px-7 2xl:px-10 gap-5 2xl:gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        {items.map((item) => (
                            <div key={item}>
                                <input
                                    type={item.toLowerCase()}
                                    placeholder={`Input ${item}`}
                                    className="border p-2 pl-4 rounded-2xl w-full font-medium text-sm 2xl:text-base"
                                    autoComplete={item}
                                    {...register(item.toLowerCase() as Path<TypeOf<TSchema>>)}
                                />
                                {errors[item.toLowerCase()] && (
                                    <p className="ml-3 text-sm text-red-500">
                                        *{getErrorMessage(item.toLowerCase(), errors)}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="border border-slate-300"></p>
                    <Button type="submit" width="w-full p-1">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;
