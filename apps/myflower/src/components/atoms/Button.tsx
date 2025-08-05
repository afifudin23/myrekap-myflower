

export default function Button({ type, className, children, onClick, disabled }: any) {
    return (
        <button
            type={type}
            className={`flex items-center justify-center gap-2 font-poppins font-semibold ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
