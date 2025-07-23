import SectionTitle from "@/components/atoms/SectionTitle";
import { formatters } from "@/utils";
import { Link } from "react-router-dom";

function OrderDetailSection({ order }: any) {
    const handleClickReview = (index: number) => {
        localStorage.setItem("productDetail", JSON.stringify(order.items[index].product));
    };

    return (
        <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-3 bg-slate-50 p-4 rounded-md shadow-sm">
                <SectionTitle className="text-xl font-semibold">Informasi Pesanan</SectionTitle>
                <div className="text-sm">Status: {order.orderStatus?.split("_").join(" ")}</div>
                <div className="text-sm">Nama Penerima: {order.customerName}</div>
                <div className="text-sm">Alamat Pengiriman: {order.deliveryAddress || "-"}</div>
                <div className="text-sm">Tanggal Pesan: {formatters.isoDateToStringDateTime(order.orderDate)}</div>
                <div className="text-sm">Tanggal Siap: {formatters.isoDateToStringDateTime(order.readyDate)}</div>
                <div className="text-sm">Metode Pembayaran: {order.paymentMethod?.split("_").join(" ") || "-"}</div>
                <div className="text-sm">Provider: {order.paymentProvider?.split("_").join(" ") || "-"}</div>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-md shadow-sm">
                <SectionTitle className="text-xl font-semibold">Daftar Pesanan</SectionTitle>
                {order.items?.map((item: any, index: number) => (
                    <div key={item.id}>
                        <div className="flex justify-between text-sm">
                            <span>
                                {item.quantity}x {item.product.name}
                            </span>
                            <span>Rp {item.totalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-500">{item.message || "-"}</p>
                        {order.orderStatus === "COMPLETED" && (
                            <Link to={`/products/${item.productId}`} className="text-sm text-blue-500" onClick={() => handleClickReview(index)}>
                                Beri Nilai dan Ulasan
                            </Link>
                        )}
                    </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>Rp {order.totalPrice?.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailSection;
