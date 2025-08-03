import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface BackButtonProps {
    children?: React.ReactNode;
    to?: string;
    className?: string;
    onClick?: () => void;
}
function BackButton({ children = "Kembali", to = "/products", className, onClick }: BackButtonProps) {
    return (
        <Link to={to} className={`text-slate-600 flex items-center gap-3 text-base md:text-lg lg:text-xl ${className}`} onClick={onClick}>
            <FaArrowLeftLong className="shrink-0" /> {children}
        </Link>
    );
}

export default BackButton;
