// interface InputTextProps {
//     id: string;
//     children: React.ReactNode;
//     className?: string;
// }

import Label from "@/components/atoms/Label";
import { Controller } from "react-hook-form";

function InputText({ formInput = true, name, label, type, control, error, disabled }: any) {
    return (
        <div>
            {formInput && <Label id={name} children={label} />}
            <Controller
                name={name as any}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <input
                        id={name}
                        type={type}
                        placeholder={`Masukan ${label}`}
                        className={`border py-2 px-4 rounded-lg w-full text-base 2xl:text-xl ${
                            disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onChange={onChange}
                        value={value as any}
                        disabled={disabled}
                    />
                )}
            />
            {error && <p className="text-red-500 text-xs 2xl:text-sm">*{error?.message}</p>}
        </div>
    );
}

export default InputText;
