interface ButtonProps {
    type: "submit" | "reset" | "button";
    width?: string;
    className?: string;
    children: React.ReactNode;
}

function Button({ type, className, width = "w-[15rem] 2xl:w-[20rem] p-1 2xl:p-2", children }: ButtonProps) {
    return (
        <button
            type={type}
            className={`bg-[#2a78d1] rounded-2xl font-poppins text-lg transition-colors duration-100 font-semibold text-white hover:bg-[#2465af] mx-auto ${width} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
