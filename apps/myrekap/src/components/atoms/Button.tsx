function Button({ type, className, children, onClick, colors, disabled }: any) {
    return (
        <button
            type={type}
            className={`mx-auto w-[15rem] 2xl:w-[20rem] p-1 2xl:p-2 rounded-2xl font-poppins text-lg transition-colors duration-100 font-semibold text-white ${className} ${
                disabled ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={disabled}
            onClick={onClick}
            style={{ backgroundColor: colors.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
        >
            {children}
        </button>
    );
}

export default Button;
