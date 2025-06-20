import React from "react";

function SmallButton({
    className,
    onClick,
    type = "button",
    children,
}: {
    className?: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    bolder?: string;
    children?: React.ReactNode;
}) {
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

export default SmallButton;
