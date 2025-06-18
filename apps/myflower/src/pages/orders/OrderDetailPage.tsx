import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";
import CountdownTimer from "@/components/molecules/CountdownTimer";
import MainLayout from "@/components/templates/MainLayout";

function OrderDetailPage() {
    const order = {
        id: "INV-250607-131505",
        customerName: "John Doe",
        orderDate: "2025-06-15",
        deliveryDate: "2025-06-17",
        deliveryAddress: "Jl. Raya No. 1, Jakarta, Indonesia",
        paymentMethod: "Transfer Bank",
        items: [
            { name: "Bouquet A", quantity: 1, greetingMessage: "Selamat Ulang Tahun", price: 100000 },
            {
                name: "Bouquet B",
                quantity: 2,
                greetingMessage: "Selamat Ulang Menempuh Jenjang Pendidikan Halo bandung Ibu KOta Kemerdekaan",
                price: 75000,
            },
        ],
        notes: "Catatan tambahan untuk pesanan ini",
        total: 250000,
        status: "Diproses",
    };

    return (
        <MainLayout className="w-full space-y-5 max-w-4xl mx-auto">
            <BackButton to="/orders">Kembali ke Pesanan</BackButton>
            <div className="">
                <SectionTitle className="text-3xl font-bold">Detail Pesanan</SectionTitle>
                <h3 className="text-lg font-semibold text-slate-500">#{order.id}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-3 bg-slate-50 p-4 rounded-md shadow-sm">
                    <SectionTitle className="text-xl font-semibold">Informasi Pesanan</SectionTitle>
                    <div className="text-sm">Status: {order.status}</div>
                    <div className="text-sm">Nama Penerima: {order.customerName}</div>
                    <div className="text-sm">Alamat Pengiriman: {order.deliveryAddress}</div>
                    <div className="text-sm">Tanggal Pesan: {order.orderDate}</div>
                    <div className="text-sm">Tanggal Pengiriman: {order.deliveryDate}</div>
                    <div className="text-sm">Catatan: {order.notes}</div>
                    <div className="text-sm">Metode Pembayaran: {order.paymentMethod}</div>
                </div>

                <div className="space-y-3 bg-gray-50 p-4 rounded-md shadow-sm">
                    <SectionTitle className="text-xl font-semibold">Daftar Pesanan</SectionTitle>
                    {order.items.map((item, index) => (
                        <div>
                            <div key={index} className="flex justify-between text-sm">
                                <span>
                                    {item.quantity}x {item.name}
                                </span>
                                <span>Rp {item.price.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-gray-500">{item.greetingMessage}</p>
                        </div>
                    ))}
                    <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>Rp {order.total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <CountdownTimer endTime={900}>Pesanan dapat dibatalkan dalam:</CountdownTimer>
            <Button type="button" colors={{ primary: "#8f40f6", hover: "#773dc4" }} className="w-full py-1 mx-auto">
                Batalkan Pesanan
            </Button>
        </MainLayout>
    );
}

export default OrderDetailPage;
