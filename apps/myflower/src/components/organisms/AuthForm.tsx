function AuthForm({fields, errorMessage, }: {}) {
    return (
        <>
        <p className="text-red-500 ml-4 mb-5 text-center text-sm 2xl:text-lg">{errorMessage}</p>
                <form className="flex flex-col px-7 2xl:px-10 gap-5 2xl:gap-5 w-full" onSubmit={handleSubmit(onSubmit)}> */}
                    <div className="flex flex-col gap-3">
                        {fields.map((field) => (
                            <>
                                <input
                                    key={field}
                                    type={field === "PIN" ? "password" : "text"}
                                    placeholder={`Input ${field}`}
                                    className="border p-2 pl-4 rounded-2xl w-full font-medium text-sm 2xl:text-base"
                                    autoComplete={field}
                                    {...register(field.toLowerCase() as LoginKey)}
                                />
                                {errors[field.toLowerCase() as LoginKey] && (
                                    <p className="ml-3 text-sm text-red-500">
                                        *{errors[field.toLowerCase() as LoginKey]?.message}
                                    </p>
                                )}
                            </>
                        ))}
                    </div>
                    <p className="border border-slate-300"></p>
                    {/* <Button type="submit" width="w-full p-1">
                        Login
                    </Button> */}
</form>
                        </>
                    );
}

export default AuthForm;
