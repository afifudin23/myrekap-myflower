import Label from "@/components/atoms/Label";
import { InputTextProps } from "@/types/Input";
import React from "react";
import { Controller } from "react-hook-form";

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(({ label, name, error, control }, ref) => {
    return (
        <div >
            <Label id={name} children={label} />
            <Controller
                name={name as any}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <input
                        id={name}
                        ref={ref}
                        placeholder={`Masukan ${label}`}
                        className="border py-2 2xl:py-4 px-4 2xl:px-6 rounded-lg w-full text-base 2xl:text-xl"
                        onChange={onChange}
                        value={value as any}
                    />
                )}
            />
            {error && <p className="text-red-500 text-xs 2xl:text-sm">*{error}</p>}
        </div>
    );
});

export default InputText;
