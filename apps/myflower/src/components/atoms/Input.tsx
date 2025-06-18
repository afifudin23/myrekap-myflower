interface InputProps {
    type: string;
    placeholder: string;
    className?: string;
}

function Input({ type, placeholder, className }: InputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full border border-slate-200 rounded-md ${className}`}
        />
    );
}

export default Input;
