import MainLayout from "@/components/templates/MainLayout";
import SectionTitle from "@/components/atoms/SectionTitle";
import BackButton from "@/components/atoms/BackButton";
import useOrders from "@/hooks/useOrders";
import OrderList from "@/components/organisms/orders/OrderList";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
    const { orders } = useOrders();
    const navigate = useNavigate();
    return (
        <MainLayout className="w-full flex flex-col gap-3 max-w-4xl mx-auto">
            <BackButton onClick={() => navigate("/products")}>Kembali ke Produk</BackButton>
            <SectionTitle className="text-3xl font-bold">Pesanan Saya</SectionTitle>

            {orders.length > 0 ? (
                <OrderList orders={orders} />
            ) : (
                <p className="text-center mt-40 text-2xl">Belum ada pesanan.</p>
            )}
        </MainLayout>
    );
}

export default OrdersPage;
