import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface BackButtonProps {
    children?: React.ReactNode;
    to?: string;
    className?: string;
}
function BackButton({ children = "Kembali", to = "/products", className }: BackButtonProps) {
    return (
        <Link to={to} className={`text-slate-600 flex items-center gap-3 text-base md:text-lg lg:text-xl ${className}`}>
            <FaArrowLeftLong className="shrink-0" /> {children}
        </Link>
    );
}

export default BackButton;
