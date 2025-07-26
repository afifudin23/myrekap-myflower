import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import { formatters } from "@/utils";

// interface OrderCardProps {
//     order: {
//         id: string;
//         date: string;
//         total: number;
//         status: string;
//     };
// }

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
                <span>Pesanan:</span>
                <span className="font-medium capitalize">{order.orderStatus.split("_").join(" ")}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Pembayaran:</span>
                <span className="font-medium capitalize">{order.paymentStatus.split("_").join(" ")}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Total Pembayaran:</span>
                <span className="font-semibold">{formatters.formatRupiah(order.totalPrice + order.shippingCost)}</span>
            </div>

            <div className="pt-2">
                <Button
                    type="button"
                    className="w-full py-1 mx-auto"
                    colors={{ primary: "#b086e7", hover: "#7856a3" }}
                    onClick={handleDetailClick}
                >
                    Lihat Detail
                </Button>
            </div>
        </div>
    );
}

export default OrderCard;
