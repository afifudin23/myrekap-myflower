import { Badge } from "@/components/atoms";
import { badgeColorOrderStatus, badgeColorPaymentStatus, bgColorOrderCard, formatters, setOrderCookies } from "@/utils";
import { Link } from "react-router-dom";

const OrderCard = ({ filteredOrders }: { filteredOrders: any[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {filteredOrders.map((field, index) => (
                <Link
                    to={`/orders/${field.id}`}
                    onClick={() => setOrderCookies(field)}
                    key={index}
                    className={`${bgColorOrderCard(
                        field.paymentStatus
                    )} border hover:border-slate-400 p-4 rounded-2xl justify-between group cursor-pointer hover:shadow-lg transition-all duration-200 ease-in-out flex flex-col gap-3`}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center gap-2">
                        <p className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-800 bg-opacity-40 text-white">
                            #{field.orderCode}
                        </p>
                        <div className="flex gap-2">
                            <Badge
                                className={`${badgeColorPaymentStatus(
                                    field.paymentStatus
                                )} text-xs text-white font-semibold`}
                                size="w-[90px]"
                                field={field.paymentStatus}
                            />
                            <Badge
                                className={`${badgeColorOrderStatus(
                                    field.orderStatus
                                )} text-xs text-white font-semibold`}
                                size="w-[90px]"
                                field={field.orderStatus}
                            />
                        </div>
                    </div>

                    {/* Customer Info & Product List */}
                    <div>
                        <h1 className="text-lg font-semibold capitalize truncate">
                            {field.customerName.length > 15
                                ? formatters.formatCapital(field.customerName).slice(0, 15) + "..."
                                : formatters.formatCapital(field.customerName)}
                        </h1>

                        <div className="flex justify-between items-start mt-2">
                            <ul className="text-sm space-y-1">
                                {field.items.map(
                                    (item: any, idx: number) =>
                                        idx < 2 && (
                                            // Show only the first 3 items
                                            <li key={idx}>
                                                • {item.product.name} x{item.quantity}
                                            </li>
                                        )
                                )}
                                {field.items.length > 2 && (
                                    <li className="italic text-gray-500">Tampilkan lebih banyak</li>
                                )}
                            </ul>
                            <p className="text-xl font-bold text-right">{formatters.formatRupiah(field.totalPrice)}</p>
                        </div>
                    </div>

                    {/* Dates & Category */}
                    <div className="flex justify-between items-end gap-2">
                        <div className="text-xs space-y-1">
                            <p className="bg-red-900 bg-opacity-40 text-white py-1 px-2 rounded-md font-semibold">
                                Dipesan: {formatters.isoDateToStringDateTime(field.orderDate)}
                            </p>
                            <p className="bg-red-900 bg-opacity-40 text-white py-1 px-2 rounded-md font-semibold">
                                Dikirim: {formatters.isoDateToStringDateTime(field.readyDate)}
                            </p>
                        </div>
                        <Badge
                            className="bg-[#609393] text-white text-xs font-semibold"
                            size="w-[90px]"
                            field={field.customerCategory}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default OrderCard;
