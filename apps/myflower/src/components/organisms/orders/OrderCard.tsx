import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import { formatters } from "@/utils";
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/constants/category";
import { BG_COLORS, TEXT_COLORS } from "@/constants/colors";


function OrderCard({ order }: any) {
    const navigate = useNavigate();

    const handleDetailClick = () => {
        localStorage.setItem("orderDetail", JSON.stringify(order));
        navigate(`/orders/${order.id}`);
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white space-y-2 font-semibold">
            <div className="flex justify-between items-center">
                <h3 className="text-base">Pesanan #{order.orderCode}</h3>
                <span className="text-sm text-gray-500">{formatters.isoDateToStringDateTime(order.orderDate)}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Status Pesanan:</span>
                <span className="font-medium capitalize">{ORDER_STATUS_LABELS[order.orderStatus]}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Pembayaran:</span>
                <span className="font-medium capitalize">{PAYMENT_STATUS_LABELS[order.paymentStatus]}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Total Pembayaran:</span>
                <span className="font-semibold">{formatters.formatRupiah(order.totalPrice + order.shippingCost)}</span>
            </div>

            <div className="pt-2">
                <Button
                    type="button"
                    className={`w-full py-1 mx-auto rounded-lg text-[#8f40f6] border-2 border-[#8f40f6] ${BG_COLORS.primary2} ${TEXT_COLORS.primary}`}
                    onClick={handleDetailClick}
                >
                    Lihat Detail
                </Button>
            </div>
        </div>
    );
}

export default OrderCard;
