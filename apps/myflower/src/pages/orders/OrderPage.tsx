import MainLayout from "@/components/templates/MainLayout";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrderCard from "@/components/organisms/orders/OrderCard"; // Misal ada komponen ini
import BackButton from "@/components/atoms/BackButton";

function OrdersPage() {
    const dummyOrders = [
        { id: "INV-250607-131505", date: "2025-06-17", total: 250000, status: "Diproses" },
        { id: "INV-250607-131305", date: "2025-06-15", total: 180000, status: "Selesai" },
    ];

    return (
        <MainLayout className="w-full space-y-6 max-w-4xl mx-auto">
            <BackButton to="/products">Kembali ke Produk</BackButton>
            <SectionTitle className="text-3xl font-bold">Pesanan Saya</SectionTitle>

            <div className="space-y-4">
                {dummyOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </MainLayout>
    );
}

export default OrdersPage;
