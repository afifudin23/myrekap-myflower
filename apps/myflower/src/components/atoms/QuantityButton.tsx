interface QuantityButtonProps {
    children: React.ReactNode,
    onClick: () => void
}

function QuantityButton({children, onClick}: QuantityButtonProps) {
    return (
        <button onClick={onClick} className="w-7 h-7 text-sm bg-gray-200 rounded hover:bg-gray-300">
            {children}
        </button>
    );
}

export default QuantityButton;
