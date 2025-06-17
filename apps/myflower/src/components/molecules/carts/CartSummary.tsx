import Button from "@/components/atoms/Button";
import { COLORS } from "@/constants/colorConstant";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface CartSummaryProps {
    totalPrice: number;
    onClick: () => void;
}

function CartSummary({ totalPrice, onClick }: CartSummaryProps) {
    return (
        <div className="flex justify-between">
            <Link to="/products" className="text-slate-600 flex gap-3 items-center text-base md:text-xl md:gap-5">
                <FaArrowLeftLong /> Kembali ke Produk
            </Link> 
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center lg:gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 text-center gap-1 font-semibold text-base lg:text-lg">
                    <p>Total Harga:</p>
                    <p>Rp {totalPrice.toLocaleString()}</p>
                </div>
                <Button type="button" colors={COLORS} onClick={onClick} className="px-10 py-2 w-full">
                    Checkout
                </Button>
            </div>
        </div>
    );
}

export default CartSummary;
