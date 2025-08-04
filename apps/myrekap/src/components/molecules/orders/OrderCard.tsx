import { Badge } from "@/components/atoms";
import { CUSTOMER_CATEGORY_LABELS, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/constants/category";
import { badgeColorOrderStatus, badgeColorPaymentStatus, bgColorOrderCard, formatters } from "@/utils";

const OrderCard = ({ order }: any) => {
    return (
        <div
            key={order.id}
            className={`${bgColorOrderCard(
                order.paymentStatus
            )} border hover:border-slate-400 p-4 rounded-2xl justify-between group cursor-pointer hover:shadow-lg transition-all duration-200 ease-in-out flex flex-col gap-5`}
        >
            {/* Header */}
            <div className="2xl:flex justify-between items-center gap-2 hidden">
                <Badge className="text-xs font-semibold px-2 py-1 bg-slate-800 bg-opacity-40 text-white">
                    {"#" + order.orderCode}
                </Badge>
                <div className="flex gap-2">
                    <Badge
                        className={`${badgeColorPaymentStatus(
                            order.paymentStatus
                        )} w-[90px] py-1 text-xs text-white font-semibold`}
                    >
                        {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                    </Badge>
                    <Badge
                        className={`${badgeColorOrderStatus(
                            order.orderStatus
                        )} w-[90px] py-1 text-xs text-white font-semibold`}
                    >
                        {ORDER_STATUS_LABELS[order.orderStatus]}
                    </Badge>
                </div>
            </div>

            <div className="gap-2 flex-col flex 2xl:hidden">
                <p className="w-fit text-xs font-semibold px-2 py-1 rounded-md bg-slate-800 bg-opacity-40 text-white">
                    #{order.orderCode}
                </p>
                <div className="flex gap-2 justify-end">
                    <Badge
                        className={`${badgeColorPaymentStatus(
                            order.paymentStatus
                        )} w-[90px] py-1 text-xs text-white font-semibold`}
                    >
                        {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                    </Badge>
                    <Badge
                        className={`${badgeColorOrderStatus(
                            order.orderStatus
                        )} w-[90px] py-1 text-xs text-white font-semibold`}
                    >
                        {ORDER_STATUS_LABELS[order.orderStatus]}
                    </Badge>
                    <Badge className="bg-[#609393] w-[100px] py-1 text-white text-xs font-semibold">
                        {CUSTOMER_CATEGORY_LABELS[order.customerCategory]}
                    </Badge>
                </div>
            </div>

            {/* Customer Info & Product List */}
            <div>
                <h1 className="text-lg font-semibold capitalize truncate">
                    {order.customerName.length > 15
                        ? formatters.formatCapital(order.customerName).slice(0, 15) + "..."
                        : formatters.formatCapital(order.customerName)}
                </h1>

                <div className="flex justify-between items-start mt-2">
                    <ul className="text-sm space-y-1">
                        {order.items.map(
                            (item: any, idx: number) =>
                                idx < 2 && (
                                    // Show only the first 3 items
                                    <li key={idx}>
                                        • {item.product.name} x{item.quantity}
                                    </li>
                                )
                        )}
                        {order.items.length > 2 && <li className="italic text-gray-500">Tampilkan lebih banyak</li>}
                    </ul>
                    <p className="text-xl font-bold text-right">
                        {formatters.formatRupiah(order.totalPrice + order.shippingCost)}
                    </p>
                </div>
            </div>

            {/* Dates & Category */}
            <div className="flex justify-between items-end gap-2">
                <div className="text-xs space-y-1">
                    <p className="bg-red-900 bg-opacity-40 text-white py-1 px-2 rounded-md font-semibold">
                        Dipesan: {formatters.isoDateToStringDateTime(order.orderDate)}
                    </p>
                    <p className="bg-red-900 bg-opacity-40 text-white py-1 px-2 rounded-md font-semibold">
                        Dikirim: {formatters.isoDateToStringDateTime(order.readyDate)}
                    </p>
                </div>
                <Badge className="bg-[#609393] w-[100px] py-1 text-white text-xs font-semibold hidden 2xl:flex">
                    {CUSTOMER_CATEGORY_LABELS[order.customerCategory]}
                </Badge>
            </div>
        </div>
    );
};

export default OrderCard;
