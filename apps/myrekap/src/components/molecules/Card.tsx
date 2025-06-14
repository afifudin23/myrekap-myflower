import Badge from "@/components/atoms/Badge";
import { OrderSummaryType } from "@/types/Data";
import { backgorundCardColor, badgeColorOrderStatus, badgeColorPaymentStatus } from "@/utils/colorCard";
import formatters from "@/utils/formatters";
import { setOrderCookies } from "@/utils/orderCookies";
import { Link } from "react-router-dom";

const Card = ({ filteredOrders }: { filteredOrders: OrderSummaryType[] }) => {
    
    return (
        <div className="grid grid-cols-2 justify-center gap-7 flex-wrap items-start mt-5 2xl:grid-cols-3">
            {filteredOrders.map((field: OrderSummaryType, index) => (
                <Link
                    to={`/order-summary/${field.id}`}
                    onClick={() => setOrderCookies(field)}
                    key={index}
                    className={`${backgorundCardColor(
                        formatters.formatCapital(field.paymentStatus)
                    )} border hover:border-slate-400 p-4 rounded-lg group cursor-pointer hover:shadow-md transition duration-200 ease-in-out flex flex-col gap-3 2xl:gap-2`}
                >
                    <div className="flex justify-between gap-3">
                        <p className="flex justify-center items-center px-2 py-1 font-semibold rounded-md text-slate-50 bg-slate-800 bg-opacity-40 text-xs">
                            #{field.invoiceNumber}
                        </p>
                        <div className="flex gap-2">
                            <Badge
                                className={`${badgeColorPaymentStatus(formatters.formatCapital(field.paymentStatus))}`}
                                size="w-[90px] text-xs"
                                field={field.paymentStatus}
                            />
                            <Badge
                                className={`${badgeColorOrderStatus(formatters.formatCapital(field.orderStatus))}`}
                                size="w-[90px] text-xs"
                                field={field.orderStatus}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl 2xl:text-2xl font-semibold capitalize">
                            {field.customerName.length > 10
                                ? formatters.formatCapital(field.customerName).slice(0, 10) + "..."
                                : formatters.formatCapital(field.customerName)}
                        </h1>
                        <div className="flex justify-between ">
                            <ul className="text-sm">
                                <li>Jenis Bunga : {formatters.formatCapital(field.flowerCategory)} </li>
                                <li>Jumlah Pesan : {field.quantity}</li>
                            </ul>
                            <p className="text-xl 2xl:text-2xl font-semibold">
                                {formatters.formatRupiah(field.price)}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-end gap-3">
                        <div className="flex flex-col gap-1">
                            <p className="py-1 px-2 font-semibold bg-opacity-40 rounded-md text-slate-50 bg-red-900 text-sm">
                                Dipesan: {formatters.isoDateToStringDateTime(field.orderDate)}
                            </p>
                            {/* py-1 px-2 font-semibold bg-opacity-80 rounded-md text-slate-50 bg-indigo-500 */}
                            <p className="py-1 px-2 font-semibold bg-opacity-40 rounded-md text-slate-50 bg-red-900 text-sm">
                                Dikirim: {formatters.isoDateToStringDateTime(field.deliveryDate)}
                            </p>
                        </div>
                        <Badge className="bg-[#609393]" size="w-[90px] text-xs" field={field.customerCategory} />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Card;
