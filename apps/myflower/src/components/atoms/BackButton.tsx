import { FaArrowLeftLong } from "react-icons/fa6";

interface BackButtonProps {
    children?: React.ReactNode;
    to?: string;
    className?: string;
    onClick?: () => void;
}
function BackButton({ children = "Kembali", className, onClick }: BackButtonProps) {
    return (
        <button className={`text-slate-600 flex items-center gap-3 text-base md:text-lg lg:text-xl ${className}`} onClick={onClick}>
            <FaArrowLeftLong className="shrink-0" /> {children}
        </button>
    );
}

export default BackButton;
