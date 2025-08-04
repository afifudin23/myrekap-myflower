import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import { COLORS } from "@/constants/colors";

interface CartSummaryProps {
    totalPrice: number;
    onClick: () => void;
}

function CartSummary({ totalPrice, onClick }: CartSummaryProps) {
    return (
        <div className="flex justify-between">
            <BackButton />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center justify-center lg:gap-3">
                <div className="grid grid-cols-1 2xl:grid-cols-2  text-center gap-0 font-semibold text-base lg:text-lg">
                    <p>Total Harga:</p>
                    <p>Rp {totalPrice.toLocaleString()}</p>
                </div>
                <Button type="button" colors={COLORS} onClick={onClick} className="px-10 py-2 w-full" disabled={totalPrice === 0}>
                    Checkout
                </Button>
            </div>
        </div>
    );
}

export default CartSummary;
