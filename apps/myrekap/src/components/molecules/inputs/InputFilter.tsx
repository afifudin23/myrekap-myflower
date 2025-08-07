import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function InputFilter({
    options,
    optionLabel,
    name,
    value,
    onChange,
}: {
    options: string[];
    optionLabel: any;
    name: string;
    value: string;
    onChange: (value: string) => void;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const defaultValue = useRef(value);

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
        <div className="relative inline-block w-full" ref={dropdownRef}>
            {value !== defaultValue.current && (
                <button
                    className="absolute top-0 right-0 text-2xl"
                    onClick={() => {
                        onChange(defaultValue.current);
                        setIsOpen(false);
                    }}
                >
                    <AiFillCloseCircle className="text-slate-200" />
                </button>
            )}
            <div
                className="bg-sky-900 py-2 px-3 w-full flex items-center justify-between text-white rounded-lg text-wrap cursor-pointer text-base 2xl:text-lg"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <p className="mx-auto">{value === name ? name : optionLabel[value]}</p>
            </div>
            <ul
                className={`w-full z-10 absolute left-0 bg-sky-950 text-white mt-1 rounded-lg overflow-y-scroll scrollbar-hide text-base 2xl:text-lg ${
                    isOpen ? "flex flex-col max-h-60" : "max-h-0"
                }`}
            >
                {options
                    .filter((item) => item !== "ALL")
                    .map((item, index) => (
                        <li
                            className={`py-2 px-6 hover:bg-sky-700 rounded-lg cursor-pointer text-center ${
                                value === item ? "bg-sky-900" : "bg-sky-950"
                            }`}
                            key={index}
                            onClick={() => {
                                onChange(item);
                                setIsOpen(false);
                            }}
                        >
                            {optionLabel[item]}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default InputFilter;
