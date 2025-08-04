import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";
import SmallButton from "@/components/atoms/SmallButton";
import OrderReceipt from "@/components/organisms/orders/OrderReceipt";
import { DELIVERY_OPTION_LABELS, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/constants/category";
import { badgeColorOrderStatus, badgeColorPaymentStatus } from "@/constants/colors";
import { formatters } from "@/utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoReceiptSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function OrderDetailSection({
    order,
    snapToken,
    handleCancelOrder,
    handleConfirmOrder,
    handlePay,
    handleClickReview,
}: any) {
    return (
        <div className="space-y-5">
            <div className="space-y-3">
                <SectionTitle className="text-2xl 2xl:text-3xl font-bold">Detail Pesanan</SectionTitle>
                <div className="flex justify-between items-center">
                    <Badge className="w-fit text-sm font-semibold 2xl:text-base px-3 py-1 bg-slate-800 bg-opacity-40 text-white">
                        {"#" + order.orderCode}
                    </Badge>
                    <div className="flex gap-3">
                        <Badge
                            className={`${
                                badgeColorPaymentStatus[order.paymentStatus]
                            } w-[110px] p-1 text-sm text-white font-semibold`}
                        >
                            {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                        </Badge>

                        <Badge
                            className={`${
                                badgeColorOrderStatus[order.orderStatus]
                            } w-fit px-2 py-1 text-sm text-white font-semibold`}
                        >
                            {ORDER_STATUS_LABELS[order.orderStatus]}
                        </Badge>
                    </div>
                </div>
                <p className="font-medium 2xl:font-semibold text-slate-500">
                    Dipesan pada: {formatters.dateToString(order.orderDate)}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-3 bg-blue-50 p-4 rounded-md shadow-sm text-sm 2xl:text-lg">
                    <SectionTitle className="text-xl 2xl:text-2xl font-semibold">Informasi Pesanan</SectionTitle>
                    <div className="">Nama Penerima: {order.customerName}</div>
                    <div className="">Opsi Pengiriman: {DELIVERY_OPTION_LABELS[order.deliveryOption]}</div>
                    <div className="">Alamat Pengiriman: {order.deliveryAddress || "-"}</div>
                    <div className="">Metode Pembayaran: {order.paymentMethod?.split("_").join(" ") || "-"}</div>
                    <div className="">Provider: {order.paymentProvider?.split("_").join(" ") || "-"}</div>
                    <div className="">Deadline: {formatters.isoDateToStringDateTime(order.readyDate)}</div>
                </div>

                <div className="space-y-3 bg-blue-50 p-4 rounded-md shadow-sm text-sm 2xl:text-lg">
                    <SectionTitle className="text-xl 2xl:text-2xl font-semibold">Daftar Pesanan</SectionTitle>
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

            <div className="flex gap-3 w-2/3 m-auto">
                <Button
                    type="button"
                    colors={{ primary: "#be3636", hover: "#912a2a" }}
                    className="w-full py-1 mx-auto"
                    onClick={handleCancelOrder}
                >
                    Batalkan Pesanan
                </Button>
                <Button
                    type="button"
                    colors={{ primary: "#8f40f6", hover: "#773dc4" }}
                    className="w-full py-1 mx-auto"
                    onClick={handleConfirmOrder}
                >
                    Terima Pesanan
                </Button>
                {order.paymentStatus === "PENDING" && snapToken && (
                    <button onClick={handlePay} className="btn btn-primary mt-4">
                        Lanjutkan Pembayaran
                    </button>
                )}
            </div>
        </div>
    );
}

export default OrderDetailSection;
