import OrderCard from "@/components/organisms/orders/OrderCard";

function OrderList({ orders }: any) {
    return (
        <div className="space-y-4">
            {orders.map((order: any) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}

export default OrderList;
