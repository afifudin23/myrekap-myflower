import React from "react";

interface ButtonSmallProps {
    className?: string;
    onClick?: (e?: React.MouseEvent) => void;
    type?: "submit" | "reset" | "button";
    children: React.ReactNode;
}

function ButtonSmall({ className, onClick, type = "button", children }: ButtonSmallProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center gap-1 rounded-lg text-white text-base 2xl:text-lg ${className}`}
        >
            {children}
        </button>
    );
}

export default ButtonSmall;
