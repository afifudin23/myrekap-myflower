import React from "react";
import { Control, Controller } from "react-hook-form";

const InputIsPaid = React.forwardRef<HTMLDivElement, { name: string; error?: string; control: Control<any> }>(
    ({ name, error, control }, ref) => {
        return (
            <div className="my-2" ref={ref}>
                <Controller
                    name={name as any}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <label className="inline-flex items-center cursor-pointer gap-3 2xl:gap-5 text-sm 2xl:text-lg font-light">
                            <p>Apakah sudah melakakun pembayaran ? </p>
                            <input type="checkbox" checked={!!value} onChange={onChange} className="hidden" />
                            <div
                                className={`w-8 h-4 2xl:w-12 2xl:h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                                    value ? "bg-green-500" : ""
                                }`}
                            >
                                <div
                                    className={`bg-white w-2 h-2 2xl:w-4 2xl:h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                                        value ? "translate-x-4 2xl:translate-x-6" : ""
                                    }`}
                                ></div>
                            </div>
                            <span className="text-gray-700">{value ? "Sudah bayar" : "Belum bayar"}</span>
                        </label>
                    )}
                />
                {error && <p className="text-red-500 text-sm">*{error}</p>}
            </div>
        );
    }
);

export default InputIsPaid;