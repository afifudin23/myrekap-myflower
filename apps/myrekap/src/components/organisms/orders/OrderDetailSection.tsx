import { Badge, ButtonSmall } from "@/components/atoms";
import { badgeColorOrderStatus, badgeColorPaymentStatus, formatters, getOrderCookies } from "@/utils";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { HiPhoto } from "react-icons/hi2";
import { IoReceiptSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function OrderDetailSection() {
    const field = getOrderCookies();
    const navigate = useNavigate();
    return (
        <>
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <p className="font-semibold text-base 2xl:text-xl px-4 py-1 rounded-md text-slate-50 bg-slate-800 bg-opacity-40">
                        #{field.orderCode}
                    </p>
                    <div className="flex gap-2 text-sm">
                        <Badge
                            className={`${badgeColorPaymentStatus(
                                field.paymentStatus
                            )} text-sm text-white font-semibold`}
                            field={field.paymentStatus}
                            size="w-[90px]"
                        />
                        <Badge
                            className={`${badgeColorOrderStatus(field.orderStatus)} text-sm text-white font-semibold`}
                            field={field.orderStatus}
                            size="w-[90px]"
                        />
                        <Badge
                            className="bg-[#609393] text-sm text-white font-semibold"
                            field={field.customerCategory}
                            size="w-[90px]"
                        />
                    </div>
                </div>
                <div className="flex gap-2 text-sm items-center">
                    <p className="font-medium 2xl:font-semibold text-slate-500">
                        {formatters.dateToString(field.orderDate)}
                    </p>
                    <p className="px-2 py-1 rounded-md bg-purple-400 font-medium 2xl:font-semibold text-slate-100">
                        {formatters.formatSource(field.source)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
                <div className="mt-5 p-8 rounded-xl bg-blue-50 bg-opacity-80 space-y-3">
                    <div>
                        <h1 className="text-xl font-semibold 2xl:text-2xl">
                            {formatters.formatCapital(field.customerName)}{" "}
                            <span className="text-lg font-medium capitalize">({field.phoneNumber})</span>
                        </h1>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-lg font-semibold 2xl:text-xl">Produk Terjual</h1>
                        <ul className="text-sm 2xl:text-base space-y-1 w-full border-b-[1px] pb-5 border-slate-700">
                            {field.items.map((item: any, idx: number) => (
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
                                            <p>{item.greetingMessage || "-"}</p>
                                        </div>
                                        <p>{formatters.formatRupiah(item.totalPrice)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <li className="flex justify-between">
                            <p>Biaya Pengiriman</p>
                            <p>{formatters.formatRupiah(field.shippingCost)}</p>
                        </li>
                        <li className="flex justify-between">
                            <p>Total Pembayaran</p>
                            <p>{formatters.formatRupiah(field.totalPrice)}</p>
                        </li>
                    </div>
                </div>
                <div className="mt-5 p-8 rounded-xl bg-blue-50 bg-opacity-80">
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Detail Pembayaran</h1>
                        <p>
                            Metode Pembayaran :{" "}
                            <span className="font-medium">{formatters.formatCapital(field.paymentMethod)}</span>
                        </p>
                        <p>
                            Provider :{" "}
                            <span className="font-medium">{formatters.formatCapital(field.paymentProvider)}</span>
                        </p>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Detail Pengiriman</h1>
                        <p>
                            Opsi Pengiriman :{" "}
                            <span className="font-medium">{formatters.formatCapital(field.deliveryOption)}</span>
                        </p>
                        <p>
                            Alamat Pengiriman :{" "}
                            <span className="font-medium">Jl. Gatot Subroto Gg.4 Rt4/Rw9 Kel. Kejambon</span>
                        </p>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Waktu</h1>
                        <p>
                            Tanggal Siap :{" "}
                            <span className="font-medium">{formatters.isoDateToStringDateTime(field.readyDate)}</span>
                        </p>
                        <p>
                            Tanggal Pengiriman :{" "}
                            <span className="font-medium">
                                {field.deliveryDate ? formatters.isoDateToStringDateTime(field.deliveryDate) : "-"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-start mt-5 gap-4">
                <ButtonSmall
                    className="bg-orange-400 hover:bg-orange-500 px-5 py-1 2xl:py-2 font-semibold"
                    onClick={() => navigate(`/orders/${field.id}/edit`)}
                >
                    <RiEdit2Fill />
                    Edit
                </ButtonSmall>
                <ButtonSmall
                    className="bg-blue-600 hover:bg-blue-700 py-1 2xl:py-2 px-4 font-semibold"
                    // onClick={() => setIsOpenFinishedProduct(!isOpenFinishedProduct)}
                >
                    <HiPhoto /> Produk
                </ButtonSmall>

                <ButtonSmall className="bg-cyan-500 hover:bg-cyan-600 py-1 2xl:py-2 px-4 font-semibold">
                    {/* <PDFDownloadLink
                            document={<Receipt data={field} />}
                            fileName={`receipt-order-${field.orderCode}.pdf`}
                            className="flex items-center justify-center gap-1"
                        > */}
                    <IoReceiptSharp /> Kwitansi
                    {/* </PDFDownloadLink> */}
                </ButtonSmall>

                {/* <InputDropdown
                        label="Status Pesanan"
                        name="orderStatus"
                        control={control}
                        formInput={false}
                        width="w-52"
                        className="py-1 2xl:py-2 px-4 text-base 2xl:text-xl"
                        options={DataOrderStatus.filter((item) => item !== "Semua")}
                    /> */}
            </div>
        </>
    );
}

export default OrderDetailSection;
