import React from "react";

function SmallButton({
    className = "font-semibold rounded-md",
    onClick,
    type = "button",
    children,
    colors,
}: {
    className?: string;
    onClick?: (e?: React.MouseEvent) => void;
    type?: "submit" | "reset" | "button";
    children?: React.ReactNode;
    colors: { primary: string; hover: string };
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center py-2 px-3 gap-1  text-white text-base 2xl:text-lg ${className}`}
            style={{ backgroundColor: colors.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
        >
            {children}
        </button>
    );
}

export default SmallButton;