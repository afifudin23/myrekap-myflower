type ButtonProps = {
    type: "submit" | "reset" | "button";
    width?: string;
    className?: string;
    children: React.ReactNode;
    colors: { primary: string; hover: string };
};

export default function Button({
    type,
    className,
    width = "w-[15rem] 2xl:w-[20rem] p-1 2xl:p-2",
    children,
    colors,
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`rounded-2xl font-poppins text-lg transition-colors duration-100 font-semibold text-white mx-auto ${width} ${className}`}
            style={{ backgroundColor: colors.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
        >
            {children}
        </button>
    );
}
