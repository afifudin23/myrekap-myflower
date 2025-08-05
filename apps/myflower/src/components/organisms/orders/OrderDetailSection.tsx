import Badge from "@/components/atoms/Badge";
import SectionTitle from "@/components/atoms/SectionTitle";
import ButtonSmall from "@/components/atoms/ButtonSmall";
import OrderReceipt from "@/components/organisms/orders/OrderReceipt";
import {
    DELIVERY_OPTION_LABELS,
    ORDER_STATUS_LABELS,
    PAYMENT_METHOD_LABELS,
    PAYMENT_STATUS_LABELS,
} from "@/constants/category";
import { badgeColorOrderStatus, badgeColorPaymentStatus } from "@/constants/colors";
import { formatters } from "@/utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoBagCheck, IoReceiptSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { BsCashStack } from "react-icons/bs";

function OrderDetailSection({
    order,
    snapToken,
    handleCancelOrder,
    handleConfirmOrder,
    handlePay,
    handleClickReview,
    handlePrintPdf,
}: any) {
    console.log(order);
    const disabledStatus = order.orderStatus !== "IN_PROCESS";
    const disabledNota = order.orderStatus === "CANCELED" || order.paymentStatus === "PENDING";
    return (
        <div className="flex flex-col gap-5">
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
                            } w-fit px-5 py-1 text-sm text-white font-semibold`}
                        >
                            {ORDER_STATUS_LABELS[order.orderStatus]}
                        </Badge>
                    </div>
                </div>
                <p className="font-medium 2xl:font-semibold text-slate-500">
                    Dipesan pada: {formatters.dateToString(order.orderDate)}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-5">
                    <div className="space-y-4">
                        <SectionTitle className="text-xl 2xl:text-2xl font-semibold">Informasi Pesanan</SectionTitle>
                        <div className="flex justify-between">
                            <p>Nama Penerima</p>
                            <p className="font-semibold">{order.customerName}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Opsi Pengiriman</p>
                            <p className="font-semibold">{DELIVERY_OPTION_LABELS[order.deliveryOption]}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Alamat Pengiriman</p>
                            <p className="font-semibold">{order.deliveryAddress || "-"}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <SectionTitle className="text-xl 2xl:text-2xl font-semibold">Informasi Pembayaran</SectionTitle>
                        <div className="flex justify-between">
                            <p>Metode Pembayaran</p>
                            <p className="font-semibold">{PAYMENT_METHOD_LABELS[order.paymentMethod] || "-"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Provider</p>
                            <p className="font-semibold">{order.paymentProvider?.split("_").join(" ") || "-"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tanggal Produk Jadi</p>
                            <p className="font-semibold">{formatters.isoDateToStringDateTime(order.readyDate)}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <SectionTitle className="text-xl 2xl:text-2xl font-semibold">Daftar Pesanan</SectionTitle>
                    {order.items?.map((item: any, index: number) => (
                        <div key={item.id}>
                            <div className="flex justify-between">
                                <div className="flex gap-3">
                                    <img
                                        src={item.product.images[0].secureUrl}
                                        alt={item.product.name}
                                        className="w-16 h-16"
                                    />
                                    <div>
                                        <span>
                                            {item.quantity}x {item.product.name}
                                        </span>
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
                                </div>
                                <span className="font-semibold">{formatters.formatRupiah(item.totalPrice)}</span>
                            </div>
                        </div>
                    ))}
                    <div className="font-semibold border-t pt-2 mt-2">
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
                    {order.paymentStatus === "PENDING" && snapToken && (
                        <ButtonSmall
                            onClick={handlePay}
                            className="bg-blue-600 font-medium py-2 rounded-lg px-3 2xl:px-4 gap-2"
                        >
                            <BsCashStack /> <span>Lanjutkan Pembayaran</span>
                        </ButtonSmall>
                    )}
                </div>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                <ButtonSmall
                    type="button"
                    className={`py-2 px-2 2xl:px-4 font-medium rounded-md flex-col lg:flex-row gap-1 xl:gap-2 flex-wrap bg-[#af3c55] ${
                        disabledStatus ? "" : "hover:bg-[#af3c55]/80"
                    }`}
                    onClick={handleCancelOrder}
                    disabled={disabledStatus}
                >
                    <MdCancel className="text-xl" /> <span>Batalkan Pesanan</span>
                </ButtonSmall>
                <ButtonSmall
                    type="button"
                    className={`py-2 px-2 2xl:px-4 font-medium rounded-md flex-col lg:flex-row gap-1 xl:gap-2 flex-wrap bg-[#435a64] ${
                        disabledStatus || order.paymentStatus === "PENDING" ? "" : "hover:bg-[#435a64]/80"
                    }`}
                    onClick={handleConfirmOrder}
                    disabled={disabledStatus || order.paymentStatus === "PENDING"}
                >
                    <IoBagCheck className="text-xl" /> <span>Terima Pesanan</span>
                </ButtonSmall>

                <PDFDownloadLink
                    document={<OrderReceipt data={order} />}
                    fileName={`receipt-order-${order.orderCode}.pdf`}
                    className={`font-medium text-white flex items-center justify-center`}
                >
                    <button
                        type="button"
                        disabled={true}
                        className={`flex items-center justify-center flex-col lg:flex-row gap-1 xl:gap-2 w-full h-full rounded-md bg-[#3c4166] ${
                            disabledNota ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3c4166]/80"
                        }`}
                    >
                        <IoMdDownload className="text-xl" /> <span>Nota Transaksi</span>
                    </button>
                </PDFDownloadLink>

                <ButtonSmall
                    className={`py-2 px-2 2xl:px-4 font-medium rounded-md flex-col lg:flex-row gap-1 xl:gap-2 flex-wrap bg-[#5e6441] ${
                        disabledNota ? "" : "hover:bg-[#5e6441]/80"
                    }`}
                    onClick={handlePrintPdf}
                    disabled={disabledNota}
                >
                    <IoReceiptSharp className="text-xl" /> <span>Cetak Nota</span>
                </ButtonSmall>
            </div>
        </div>
    );
}

export default OrderDetailSection;
