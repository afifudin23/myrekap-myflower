import Button from "../atoms/Button";

function AuthForm({
    fields,
    errorMessage,
    onSubmit,
    register,
    errors,
    buttonName,
    link,
}: {
    fields: any;
    errorMessage: string;
    onSubmit: () => void;
    register: any;
    errors: any;
    buttonName: string;
    link: React.ReactNode;
}) {
    return (
        <>
            <p className="text-red-500 ml-4 mb-5 text-center text-sm 2xl:text-lg">{errorMessage}</p>
            <form className="flex flex-col px-7 2xl:px-10 gap-5 2xl:gap-5 w-full" onSubmit={onSubmit}>
                <div className="flex flex-col gap-3">
                    {fields.map((field: any) => (
                        <div key={field.name}>
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                className="border p-2 pl-4 rounded-2xl w-full font-medium text-sm 2xl:text-base"
                                {...register(field.name)}
                            />
                            {errors[field.name] && (
                                <p className="ml-3 text-sm text-red-500">*{errors[field.name]?.message}</p>
                            )}
                        </div>
                    ))}
                </div>
                <p className="border border-slate-300"></p>
                <Button type="submit" width="w-full p-1">
                    {buttonName}
                </Button>
                {link}
            </form>
        </>
    );
}

export default AuthForm;
