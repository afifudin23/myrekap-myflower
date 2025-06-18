import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";

interface OrderCardProps {
    order: {
        id: string;
        date: string;
        total: number;
        status: string;
    };
}

function OrderCard({ order }: OrderCardProps) {
    const navigate = useNavigate();

    const handleDetailClick = () => {
        navigate(`/orders/${order.id}`);
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Pesanan #{order.id}</h3>
                <span className="text-sm text-gray-500">{order.date}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="font-medium capitalize">{order.status}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-semibold">Rp {order.total.toLocaleString()}</span>
            </div>

            <div className="pt-2">
                <Button
                    type="button"
                    className="w-full"
                    colors={{ primary: "#8f40f6", hover: "#773dc4" }}
                    onClick={handleDetailClick}
                >
                    Lihat Detail
                </Button>
            </div>
        </div>
    );
}

export default OrderCard;
