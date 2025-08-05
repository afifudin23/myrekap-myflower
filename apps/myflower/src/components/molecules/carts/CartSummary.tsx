import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import { BG_COLORS } from "@/constants/colors";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
    totalPrice: number;
    onClick: () => void;
}

function CartSummary({ totalPrice, onClick }: CartSummaryProps) {
    const navigate = useNavigate();
    const disabled = totalPrice === 0;
    return (
        <div className="flex justify-between">
            <BackButton onClick={() => navigate("/products")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center justify-center lg:gap-3">
                <div className="grid grid-cols-1 2xl:grid-cols-2  text-center gap-0 font-semibold text-base lg:text-lg">
                    <p>Total Harga:</p>
                    <p>Rp {totalPrice.toLocaleString()}</p>
                </div>
                <Button
                    type="button"
                    onClick={onClick}
                    className={`px-10 py-2 w-full rounded-md text-white ${
                        disabled ? "bg-[#8f40f6]" : BG_COLORS.primary
                    } `}
                    disabled={disabled}
                >
                    Checkout
                </Button>
            </div>
        </div>
    );
}

export default CartSummary;
