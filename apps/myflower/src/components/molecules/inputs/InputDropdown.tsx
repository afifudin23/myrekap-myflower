import Label from "@/components/atoms/Label";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { TiArrowSortedDown } from "react-icons/ti";

const InputDropdown = ({
    label,
    options,
    name,
    error,
    control,
    className = "py-2 2xl:py-3 px-4 2xl:px-5 text-base 2xl:text-xl",
    disabled,
}: any) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="flex flex-col gap-2">
            <Label id={name} children={label} />
            <Controller
                name={name as any}
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
                        <div className="relative inline-block w-full" ref={dropdownRef}>
                            <div
                                className={`bg-gray-700 mb-1 ${className}  flex items-center justify-between text-white rounded-lg ${
                                    disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                                }`}
                                onClick={() => {
                                    if (disabled) return;
                                    setIsOpen(!isOpen);
                                }}
                            >
                                <p>
                                    {!value || disabled
                                        ? "- Pilih Salah Satu -"
                                        : typeof value === "string"
                                        ? value
                                        : value.toLocaleString()}
                                </p>
                                <TiArrowSortedDown
                                    size={25}
                                    className={`transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                                />
                            </div>
                            <ul
                                className={`w-full z-10 absolute left-0 bg-gray-700 text-white rounded-lg overflow-y-scroll scrollbar-hide ${
                                    isOpen ? "flex flex-col max-h-60" : "max-h-0"
                                }`}
                            >
                                <li
                                    className={`${className} bg-gray-700 hover:bg-slate-400 rounded-lg cursor-pointer ${
                                        value === null && "bg-slate-500"
                                    }`}
                                    onClick={() => {
                                        onChange(undefined);
                                        setIsOpen(false);
                                    }}
                                >
                                    - Pilih Salah Satu -
                                </li>
                                {options.map((item: any) => (
                                    <li
                                        className={`${className} bg-gray-700 hover:bg-slate-400 rounded-lg cursor-pointer ${
                                            value === item && "bg-slate-500"
                                        }`}
                                        key={item}
                                        onClick={() => {
                                            onChange(item);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                }}
            />
            {error && <p className="text-red-500 text-xs 2xl:text-sm">*{error?.message}</p>}
        </div>
    );
};

export default InputDropdown;
