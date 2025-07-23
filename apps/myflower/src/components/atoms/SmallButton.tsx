// interface SmallButtonProps {
//     className?: string;
//     onClick?: (e?: React.MouseEvent) => void;
//     type?: "submit" | "reset" | "button";
//     children?: React.ReactNode;
//     colors: { primary: string; hover: string };
// }
function SmallButton({ className = "py-2 font-semibold rounded-md", onClick, type = "button", children, colors }: any) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center px-3 gap-1 text-white text-base 2xl:text-lg bg-[] hover:bg-[] ${className}`}
            style={{ backgroundColor: colors.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
        >
            {children}
        </button>
    );
}

export default SmallButton;
