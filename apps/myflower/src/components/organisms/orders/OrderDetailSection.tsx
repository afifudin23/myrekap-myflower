import SectionTitle from "@/components/atoms/SectionTitle";
import SmallButton from "@/components/atoms/SmallButton";
import OrderReceipt from "@/components/organisms/orders/OrderReceipt";
import { formatters } from "@/utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoReceiptSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function OrderDetailSection({ order }: any) {
    const handleClickReview = (index: number) => {
        localStorage.setItem("productDetail", JSON.stringify(order.items[index].product));
    };

    return (
        <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-3 bg-slate-50 p-4 rounded-md shadow-sm text-sm 2xl:text-xl">
                <SectionTitle className="text-xl 2xl:text-3xl font-semibold">Informasi Pesanan</SectionTitle>
                <div className="">Status Pesanan: {order.orderStatus?.split("_").join(" ")}</div>
                <div className="">Status Pembayaran: {order.paymentStatus?.split("_").join(" ")}</div>
                <div className="">Nama Penerima: {order.customerName}</div>
                <div className="">Opsi Pengiriman: {order.deliveryOption}</div>
                <div className="">Alamat Pengiriman: {order.deliveryAddress || "-"}</div>
                <div className="">Tanggal Pesan: {formatters.isoDateToStringDateTime(order.orderDate)}</div>
                <div className="">Tanggal Siap: {formatters.isoDateToStringDateTime(order.readyDate)}</div>
                <div className="">Metode Pembayaran: {order.paymentMethod?.split("_").join(" ") || "-"}</div>
                <div className="">Provider: {order.paymentProvider?.split("_").join(" ") || "-"}</div>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-md shadow-sm text-sm 2xl:text-xl">
                <SectionTitle className="text-xl 2xl:text-3xl font-semibold">Daftar Pesanan</SectionTitle>
                {order.items?.map((item: any, index: number) => (
                    <div key={item.id}>
                        <div className="flex justify-between">
                            <span>
                                {item.quantity}x {item.product.name}
                            </span>
                            <span>Rp {item.totalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-500">{item.message || "-"}</p>
                        {order.orderStatus === "COMPLETED" && (
                            <Link
                                to={`/products/${item.productId}`}
                                className="text-sm text-blue-500"
                                onClick={() => handleClickReview(index)}
                            >
                                Beri Nilai dan Ulasan
                            </Link>
                        )}
                    </div>
                ))}
                <div className="font-medium border-t pt-2 mt-2">
                    <div className="flex justify-between">
                        <span>Biaya Pengiriman</span>
                        <span>{order.shippingCost ? formatters.formatRupiah(order.shippingCost) : "-"}</span>
                    </div>
                </div>
                <div className="font-semibold">
                    <div className="flex justify-between">
                        <span>Total Pembayaran</span>
                        <span>{formatters.formatRupiah(order.totalPrice + order.shippingCost)}</span>
                    </div>
                </div>
                {["PAID", "UNPAID"].includes(order.paymentStatus) && (
                    <SmallButton
                        type="button"
                        colors={{ primary: "#3e84da", hover: "#336aaf" }}
                        className="w-48 py-1 font-medium rounded-md "
                    >
                        <PDFDownloadLink
                            document={<OrderReceipt data={order} />}
                            fileName={`receipt-order-${order.orderCode}.pdf`}
                            className="flex items-center justify-center gap-1"
                        >
                            <IoReceiptSharp /> Nota Transaksi
                        </PDFDownloadLink>
                    </SmallButton>
                )}
            </div>
        </div>
    );
}

export default OrderDetailSection;
