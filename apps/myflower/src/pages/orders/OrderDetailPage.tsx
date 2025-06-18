import BackButton from "@/components/atoms/BackButton";
import SectionTitle from "@/components/atoms/SectionTitle";
import MainLayout from "@/components/templates/MainLayout";

function OrderDetailPage() {
    const order = {
        id: "1",
        date: "2025-06-17",
        items: [
            { name: "Bouquet A", quantity: 1, price: 100000 },
            { name: "Bouquet B", quantity: 2, price: 75000 },
        ],
        total: 250000,
        status: "Diproses",
    };

    return (
        <MainLayout className="space-y-6 max-w-4xl mx-auto">
            <BackButton to="/orders">Kembali ke Pesanan</BackButton>
            <SectionTitle className="text-3xl font-bold">Detail Pesanan #{order.id}</SectionTitle>

            <div className="space-y-2">
                <div className="text-sm">Tanggal: {order.date}</div>
                <div className="text-sm">Status: {order.status}</div>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-md shadow-sm">
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                        <span>
                            {item.quantity}x {item.name}
                        </span>
                        <span>Rp {item.price.toLocaleString()}</span>
                    </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>Rp {order.total.toLocaleString()}</span>
                </div>
            </div>
        </MainLayout>
    );
}

export default OrderDetailPage;
