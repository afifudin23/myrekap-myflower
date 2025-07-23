import Button from "@/components/atoms/Button";
import { COLORS } from "@/constants/colorConstant";

function AuthForm({ fields, onSubmit, register, errors, buttonName, link }: any) {
    return (
        <form className="flex flex-col px-7 2xl:px-10 gap-5 2xl:gap-5 w-full" onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {fields.map((field: any) => {
                    const { name, type, placeholder, options } = field;

                    return (
                        <div key={name}>
                            {(() => {
                                switch (type) {
                                    case "dropdown":
                                        return (
                                            <select
                                                {...register(name)}
                                                className="border p-2 pl-4 rounded-2xl w-full font-medium text-sm 2xl:text-base"
                                            >
                                                <option value="">-- {placeholder || "Pilih"} --</option>
                                                {options?.map((option: any) => (
                                                    <option key={option} value={option} className="">
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        );

                                    case "password":
                                    case "text":
                                    default:
                                        return (
                                            <input
                                                type={type}
                                                placeholder={placeholder}
                                                className="border p-2 pl-4 rounded-2xl w-full font-medium text-sm 2xl:text-base"
                                                {...register(name)}
                                            />
                                        );
                                }
                            })()}

                            {errors[name] && <p className="ml-3 text-sm text-red-500">*{errors[name]?.message}</p>}
                        </div>
                    );
                })}
            </div>

            <p className="border border-slate-300"></p>
            <Button type="submit" className="w-full p-1" colors={COLORS}>
                {buttonName}
            </Button>
            {link}
        </form>
    );
}

export default AuthForm;

// interface AuthFormProps {
//     fields: any;
//     errorMessage: string;
//     onSubmit: () => void;
//     register: any;
//     errors: any;
//     buttonName: string;
//     link: React.ReactNode;
// }
