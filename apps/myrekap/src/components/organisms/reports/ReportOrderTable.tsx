import { formatters } from "@/utils";
import { FaSquarePollVertical } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

function ReportOrderTable({ orderFilter }: any) {
    const [searchParams] = useSearchParams();
    const fromDate = formatters.isoDateToStringDate(searchParams.get("from_date"));
    const toDate = formatters.isoDateToStringDate(searchParams.get("to_date"));
    const totalRevenue = orderFilter.reduce((acc: number, order: any) => acc + order.totalPrice, 0);
    return (
        <div
            id="table-report-orders"
            className="text-sm text-gray-700 bg-blue-300 mt-5 bg-opacity-10 p-4 2xl:p-6 rounded-lg shadow-md"
        >
            <div className=" text-gray-700 mt-3">
                <div className=" flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-semibold mb-2">Penjualan Toko Bunga Anda</h1>
                    <p className="text-sm text-gray-600 mb-2 flex flex-col items-center">
                        <span>Toko Bunga Anda | +62 812 3456 789 | email123@gmail.com</span>
                        <span>
                            Jl. Jend. Sudirman No.44, Pekauman, Kec. Tegal Barat, Kota Tegal, Jawa Tengah, 52125
                        </span>
                    </p>
                </div>
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                        <FaSquarePollVertical size={25} />
                        <h1 className="text-2xl font-medium">Laporan Penjualan</h1>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="pr-2 ">Dicetak pada</td>
                                <td className="px-2 ">:</td>
                                <td className="px-2 font-semibold">
                                    {formatters.isoDateToStringDate(new Date().toISOString())}
                                </td>
                            </tr>
                            <tr>
                                <td className="pr-2 ">Periode</td>
                                <td className="px-2 ">:</td>
                                <td className="px-2 font-semibold">
                                    {fromDate} - {toDate}
                                </td>
                            </tr>
                            <tr>
                                <td className="pr-2 ">Jumlah Transaksi</td>
                                <td className="px-2 ">:</td>
                                <td className="px-2 font-semibold">{orderFilter.length}</td>
                            </tr>
                            <tr>
                                <td className="pr-2 ">Total Revenue</td>
                                <td className="px-2 ">:</td>
                                <td className="px-2 font-semibold">{formatters.formatRupiah(totalRevenue)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <table className="w-full text-xs text-gray-700 border-collapse border-[1px] border-slate-700">
                    <thead>
                        <tr>
                            <th className="border p-2 border-slate-500 bg-blue-300">No.</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Tanggal</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Order Code</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Nama</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Kategori</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Telepon</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Metode</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Provider</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Status</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Pesanan</th>
                            <th className="border p-2 border-slate-500 bg-blue-300">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderFilter.map((order: any, index: number) => (
                            <tr key={index}>
                                <td className="border p-2 border-slate-700 text-center">{index + 1}</td>
                                <td className="border p-2 border-slate-700">{order.orderDate}</td>
                                <td className="border p-2 border-slate-700">{order.orderCode}</td>
                                <td className="border p-2 border-slate-700">{order.customerName}</td>
                                <td className="border p-2 border-slate-700">{order.customerCategory}</td>
                                <td className="border p-2 border-slate-700">{order.phoneNumber}</td>
                                <td className="border p-2 border-slate-700">{order.paymentMethod}</td>
                                <td className="border p-2 border-slate-700">{order.paymentProvider}</td>
                                <td className="border p-2 border-slate-700">{order.paymentStatus}</td>
                                <td className="border p-2 border-slate-700">{order.orderStatus}</td>
                                <td className="border p-2 border-slate-700">{formatters.formatRupiah(order.totalPrice)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div></div>
            </div>
        </div>
    );
}

export default ReportOrderTable;
