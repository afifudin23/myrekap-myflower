import { Badge, ButtonSmall } from "@/components/atoms";
import { InputDropdown } from "@/components/molecules";
import OrderReceipt from "@/components/organisms/orders/OrderReceipt";
import { ORDER_STATUS_ITEMS } from "@/constants/category";
import { badgeColorOrderStatus, badgeColorPaymentStatus, formatters } from "@/utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { HiPhoto } from "react-icons/hi2";
import { IoReceiptSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { TbReceiptFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function OrderDetailSection({
    order,
    control,
    isOpenFinishedProduct,
    setIsOpenFinishedProduct,
    setIsOpenPaymentProof,
}: any) {
    const navigate = useNavigate();
    const disabled = order.source === "MYFLOWER";
    return (
        <div className="mb-44">
            <div className="space-y-5">
                <div className="flex justify-between items-start">
                    <p className="font-semibold text-base 2xl:text-xl px-4 py-1 rounded-md text-slate-50 bg-slate-800 bg-opacity-40">
                        #{order.orderCode}
                    </p>
                    <div className="flex gap-2 text-sm">
                        <Badge
                            className={`${badgeColorPaymentStatus(
                                order.paymentStatus
                            )} w-[90px] py-1 text-sm text-white font-semibold`}
                            field={order.paymentStatus}
                        />
                        <Badge
                            className={`${badgeColorOrderStatus(
                                order.orderStatus
                            )} w-[100px] py-1 text-sm text-white font-semibold`}
                            field={order.orderStatus}
                        />
                        <Badge
                            className="bg-[#609393] w-[120px] py-1 text-sm text-white font-semibold"
                            field={order.customerCategory}
                        />
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="font-medium 2xl:font-semibold text-slate-500">
                        {formatters.dateToString(order.orderDate)}
                    </p>
                    <p className="px-2 py-1 rounded-md bg-purple-400 font-medium 2xl:font-semibold text-slate-100">
                        {formatters.formatSource(order.source)}
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
                            <span className="font-medium">{order.paymentMethod?.split("_").join(" ") || "-"}</span>
                        </p>
                        <p className="flex items-center gap-1">
                            Provider :{" "}
                            <span className="font-medium">
                                {order.paymentProvider}{" "}
                                {order.paymentMethod === "BANK_TRANSFER" && order.paymentProof && (
                                    <button
                                        className="inline-flex text-blue-600 items-center gap-1 font-medium"
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
                            Opsi Pengiriman : <span className="font-medium">{order.deliveryOption}</span>
                        </p>
                        <p>
                            Alamat Pengiriman : <span className="font-medium">{order.deliveryAddress || "-"}</span>
                        </p>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Waktu</h1>
                        <p>
                            Tanggal Siap :{" "}
                            <span className="font-medium">{formatters.isoDateToStringDateTime(order.readyDate)}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-start mt-5 gap-4">
                <ButtonSmall
                    className={`${
                        disabled ? "bg-orange-400" : "bg-orange-400 hover:bg-orange-500"
                    } px-5 py-1 2xl:py-2 font-semibold`}
                    onClick={() => {
                        if (disabled) return;
                        navigate(`/orders/${order.id}/edit`);
                    }}
                    disabled={disabled}
                >
                    <RiEdit2Fill />
                    Edit
                </ButtonSmall>
                <ButtonSmall
                    className="bg-blue-600 hover:bg-blue-700 py-1 2xl:py-2 px-4 font-semibold"
                    onClick={() => setIsOpenFinishedProduct(!isOpenFinishedProduct)}
                >
                    <HiPhoto /> Produk
                </ButtonSmall>

                <ButtonSmall className="bg-cyan-500 hover:bg-cyan-600 py-1 2xl:py-2 px-4 font-semibold">
                    <PDFDownloadLink
                        document={<OrderReceipt data={order} />}
                        fileName={`receipt-order-${order.orderCode}.pdf`}
                        className="flex items-center justify-center gap-1"
                    >
                        <IoReceiptSharp /> Nota
                    </PDFDownloadLink>
                </ButtonSmall>

                <div className="w-64">
                    <InputDropdown
                        label="Status Pesanan"
                        name="orderStatus"
                        control={control}
                        formInput={false}
                        className="py-1 2xl:py-2 px-4 text-base 2xl:text-xl"
                        options={ORDER_STATUS_ITEMS.filter((item) => item !== "Semua")}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
}

export default OrderDetailSection;
