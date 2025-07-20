import { OrderCard } from "@/components/molecules";
import { Link } from "react-router-dom";

function OrderList({ orders }: any) {
    const handleClick = (order: any) => {
        localStorage.setItem("orderDetail", JSON.stringify(order));
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {orders.map((order: any) => (
                <Link to={`/orders/${order.id}`} onClick={() => handleClick(order)} key={order.id}>
                    <OrderCard order={order} />
                </Link>
            ))}
        </div>
    );
}

export default OrderList;
