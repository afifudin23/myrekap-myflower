type ButtonProps = {
    type: "submit" | "reset" | "button";
    width?: string;
    className?: string;
    children: React.ReactNode;
};

export default function Button({
    type,
    className,
    width = "w-[15rem] 2xl:w-[20rem] p-1 2xl:p-2",
    children,
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`bg-[#9f64ec] rounded-2xl font-poppins text-lg transition-colors duration-100 font-semibold text-white hover:bg-[#8a44e5] mx-auto ${width} ${className}`}
        >
            {children}
        </button>
    );
}
