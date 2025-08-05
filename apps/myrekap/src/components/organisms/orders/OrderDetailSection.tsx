import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderReceipt from "@/components/organisms/orders/OrderReceipt";
import { IoReceiptSharp } from "react-icons/io5";
import { Badge, ButtonSmall } from "@/components/atoms";
import {
    CUSTOMER_CATEGORY_LABELS,
    DELIVERY_OPTION_LABELS,
    ORDER_STATUS_LABELS,
    PAYMENT_METHOD_LABELS,
    PAYMENT_STATUS_LABELS,
    SOURCE_LABELS,
} from "@/constants/category";
import { badgeColorOrderStatus, badgeColorPaymentStatus, formatters } from "@/utils";
import { GrUpdate } from "react-icons/gr";
import { RiEdit2Fill } from "react-icons/ri";
import { TbReceiptFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MdOutlineDownloadForOffline } from "react-icons/md";

function OrderDetailSection({
    order,
    isOpenUpdateProgress,
    setIsOpenUpdateProgress,
    setIsOpenPaymentProof,
    handlePrintPdf,
}: any) {
    const navigate = useNavigate();
    const disabled = order.source === "MYFLOWER" || order.orderStatus === "CANCELED";

    return (
        <div className="mb-44">
            <div className="space-y-5">
                <div className="flex justify-between items-start">
                    <Badge className="text-base font-semibold 2xl:text-xl px-3 py-1 bg-slate-800 bg-opacity-40 text-white">
                        {"#" + order.orderCode}
                    </Badge>
                    <div className="flex gap-2 text-sm">
                        <Badge
                            className={`${badgeColorPaymentStatus(
                                order.paymentStatus
                            )} w-[110px] p-1 text-sm text-white font-semibold`}
                        >
                            {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                        </Badge>

                        <Badge
                            className={`${badgeColorOrderStatus(
                                order.orderStatus
                            )} w-[110px] py-1 text-sm text-white font-semibold`}
                        >
                            {ORDER_STATUS_LABELS[order.orderStatus]}
                        </Badge>
                        <Badge className="bg-[#609393] w-[120px] py-1 text-sm text-white font-semibold">
                            {CUSTOMER_CATEGORY_LABELS[order.customerCategory]}
                        </Badge>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="font-medium 2xl:font-semibold text-slate-500">
                        {formatters.dateToString(order.orderDate)}
                    </p>
                    <p className="px-2 py-1 rounded-md bg-purple-400 font-medium 2xl:font-semibold text-slate-100">
                        {SOURCE_LABELS[order.source]}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
                <div className="mt-5 p-8 rounded-xl bg-blue-50 bg-opacity-80 space-y-3">
                    <div>
                        <h1 className="text-xl font-semibold 2xl:text-2xl">
                            {formatters.formatCapital(order.customerName)}{" "}
                            <span className="text-lg font-medium capitalize">({order.phoneNumber})</span>
                        </h1>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-lg font-semibold 2xl:text-xl">Produk Terjual</h1>
                        <ul className="text-sm 2xl:text-base space-y-1 w-full border-b-[1px] pb-5 border-slate-700">
                            {order.items.map((item: any, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <img
                                        src={item.product.images[0].secureUrl}
                                        alt={item.product.name}
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                    <div className="flex w-full justify-between">
                                        <div>
                                            <p>
                                                {item.product.name}{" "}
                                                <span className="text-xs font-medium">({item.quantity}x)</span>
                                            </p>
                                            <p>{item.message || "-"}</p>
                                        </div>
                                        <p>{formatters.formatRupiah(item.totalPrice)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <li className="flex justify-between">
                            <p>Biaya Pengiriman</p>
                            <p>{formatters.formatRupiah(order.shippingCost)}</p>
                        </li>
                        <li className="flex justify-between">
                            <p>Total Pembayaran</p>
                            <p>{formatters.formatRupiah(order.totalPrice + order.shippingCost)}</p>
                        </li>
                    </div>
                </div>
                <div className="mt-5 p-8 rounded-xl bg-blue-50 bg-opacity-80 space-y-5">
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Detail Pembayaran</h1>
                        <p>
                            Metode Pembayaran :{" "}
                            <span className="font-medium">
                                {order.paymentMethod ? PAYMENT_METHOD_LABELS[order.paymentMethod] : "-"}
                            </span>
                        </p>
                        <p className="flex flex-wrap items-center gap-1">
                            Provider :{" "}
                            <span className="font-medium whitespace-nowrap">
                                {order.paymentProof || order.paymentProvider
                                    ? order.paymentProvider?.split("_").join(" ")
                                    : "-"}{" "}
                                {order.paymentMethod === "BANK_TRANSFER" && order.paymentProof && (
                                    <button
                                        className="flex w-full text-blue-600 items-center gap-1 font-medium"
                                        onClick={() => setIsOpenPaymentProof(true)}
                                    >
                                        <TbReceiptFilled />
                                        Bukti Pembayaran
                                    </button>
                                )}
                            </span>
                        </p>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Detail Pengiriman</h1>
                        <p>
                            Opsi Pengiriman :{" "}
                            <span className="font-medium">{DELIVERY_OPTION_LABELS[order.deliveryOption]}</span>
                        </p>
                        <p>
                            Alamat Pengiriman : <span className="font-medium">{order.deliveryAddress || "-"}</span>
                        </p>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Waktu</h1>
                        <p>
                            Tanggal Produk Jadi :{" "}
                            <span className="font-medium">{formatters.isoDateToStringDateTime(order.readyDate)}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-start mt-5 gap-4">
                <ButtonSmall
                    disabled={disabled}
                    className={`${
                        disabled ? "bg-orange-400" : "bg-orange-400 hover:bg-orange-500"
                    } px-5 py-1 2xl:py-2 font-semibold`}
                    onClick={() => {
                        if (disabled) return;
                        navigate(`/orders/${order.id}/edit`);
                    }}
                >
                    <RiEdit2Fill />
                    Edit
                </ButtonSmall>
                <ButtonSmall
                    className="bg-blue-600 hover:bg-blue-700 py-1 2xl:py-2 px-4 font-semibold"
                    onClick={() => setIsOpenUpdateProgress(!isOpenUpdateProgress)}
                >
                    <GrUpdate />
                    Progress
                </ButtonSmall>

                <ButtonSmall
                    className={`${
                        order.orderStatus === "CANCELED" ? "" : "hover:bg-cyan-600"
                    } bg-cyan-500 py-1 2xl:py-2 px-4 font-semibold`}
                    disabled={order.orderStatus === "CANCELED"}
                >
                    {order.orderStatus === "CANCELED" ? (
                        <span className="flex items-center justify-center gap-1">
                            <MdOutlineDownloadForOffline size={20} /> Unduh Nota
                        </span>
                    ) : (
                        <PDFDownloadLink
                            document={<OrderReceipt data={order} />}
                            fileName={`receipt-order-${order.orderCode}.pdf`}
                            className="flex items-center justify-center gap-1"
                        >
                            <MdOutlineDownloadForOffline size={20} /> Unduh Nota
                        </PDFDownloadLink>
                    )}
                </ButtonSmall>
                <ButtonSmall
                    className={`${
                        order.orderStatus === "CANCELED" ? "" : "hover:bg-purple-600"
                    } bg-purple-500  py-1 2xl:py-2 px-4 font-semibold`}
                    onClick={handlePrintPdf}
                    disabled={order.orderStatus === "CANCELED"}
                >
                    <IoReceiptSharp /> Cetak Nota
                </ButtonSmall>
            </div>
        </div>
    );
}

export default OrderDetailSection;
