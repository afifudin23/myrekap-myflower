import React from "react";

interface ButtonSmallProps {
    className?: string;
    onClick?: (e?: React.MouseEvent) => void;
    type?: "submit" | "reset" | "button";
    children: React.ReactNode;
    disabled?: boolean;
}

function ButtonSmall({ className, onClick, type = "button", children, disabled }: ButtonSmallProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center gap-2 rounded-lg text-white text-base 2xl:text-lg ${className} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            } `}
        >
            {children}
        </button>
    );
}

export default ButtonSmall;
