import React from "react";

function SmallButton({
    className,
    onClick,
    type = "button",
    bolder = "font-semibold",
    children,
    colors,
}: {
    className?: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    bolder?: string;
    children?: React.ReactNode;
    colors: { primary: string; hover: string };
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center py-1 2xl:py-2 px-4 gap-1 rounded-lg text-white text-base 2xl:text-lg ${bolder} ${className}`}
            style={{ backgroundColor: colors.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
        >
            {children}
        </button>
    );
}

export default SmallButton;