import MainLayout from "@/components/templates/MainLayout";
import SectionTitle from "@/components/atoms/SectionTitle";
import BackButton from "@/components/atoms/BackButton";
import useOrders from "@/hooks/useOrders";
import OrderList from "@/components/organisms/orders/OrderList";

function OrdersPage() {
    
    const { orders, loading } = useOrders();
    console.log(orders);
    if (loading) return <div>Loading...</div>;
    return (
        <MainLayout className="w-full space-y-6 max-w-4xl mx-auto">
            <BackButton to="/products">Kembali ke Produk</BackButton>
            <SectionTitle className="text-3xl font-bold">Pesanan Saya</SectionTitle>

            <OrderList orders={orders} />
        </MainLayout>
    );
}

export default OrdersPage;
