import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface BackButtonProps {
    className?: string;
}
function BackButton({ className }: BackButtonProps) {
    return (
        <Link to="/products" className={`text-slate-600 flex items-center gap-3 text-base md:text-xl md:gap-5 ${className}`}>
            <FaArrowLeftLong /> Kembali ke Produk
        </Link>
    );
}

export default BackButton;
