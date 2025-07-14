import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import React from "react";
import { InputDateProps } from ".";
import { Label } from "@/components/atoms";

const InputDate = React.forwardRef<HTMLDivElement, InputDateProps>(({ label, name, error, control }, ref) => {
    return (
        <div ref={ref}>
            <Label id={label} children={label} />
            <Controller
                name={name as any}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <DatePicker
                        selected={value instanceof Date ? value : value ? new Date(value) : null}
                        onChange={onChange}
                        dateFormat="dd-MM-yyyy HH:mm" // Custom format
                        showTimeSelect
                        timeFormat="HH:mm" // Format 24 hours
                        timeIntervals={15} // Interval of 15 minutes
                        placeholderText={`Pilih ${label}`}
                        locale={"id"}
                        preventOpenOnFocus={true}
                        className="border py-2 2xl:py-4 px-4 2xl:px-6 rounded-lg w-[350px] 2xl:w-full text-base 2xl:text-xl"
                    />
                )}
            />
            {error && <p className="text-red-500 text-xs 2xl:text-sm">*{error}</p>}
        </div>
    );
});

export default InputDate;
