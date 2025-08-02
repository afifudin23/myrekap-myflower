import { TYPE_STOCK_REPORT_LABELS } from "@/constants/category";
import { formatters } from "@/utils";
import { FaSquarePollVertical } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

function ReportStockTable({ reportStock }: any) {
    const [searchParams] = useSearchParams();
    const month = searchParams.get("month") || "0";
    const year = searchParams.get("year") || "0";
    const type = searchParams.get("type") || "0";

    return (
        <div
            id="table-report-stocks"
            className="text-sm text-gray-700 bg-blue-300 mt-5 bg-opacity-10 p-4 2xl:p-6 rounded-lg shadow-md"
        >
            <div className=" text-gray-700 mt-3">
                <div className=" flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-semibold mb-2">Laporan Stok Produk Toko Bunga Anda</h1>
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
                        <h1 className="text-2xl font-medium">Laporan Stok Produk</h1>
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
                                    {month} - {year}
                                </td>
                            </tr>
                            <tr>
                                <td className="pr-2 ">Tipe Laporan</td>
                                <td className="px-2 ">:</td>
                                <td className="px-2 font-semibold">{TYPE_STOCK_REPORT_LABELS[type]}</td>
                            </tr>
                            <tr>
                                <td className="pr-2 ">Jumlah</td>
                                <td className="px-2 ">:</td>
                                <td className="px-2 font-semibold">{reportStock.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <table className="w-full text-xs text-gray-700 border-collapse border-[1px] border-slate-700">
                    <thead>
                        {type === "summary" ? (
                            <tr>
                                <th className="border p-2 border-slate-500 bg-blue-300">No.</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Kode Produk</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Nama Produk</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Stok Awal</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Stok Masuk</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Stok Keluar</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Stock Akhir</th>
                            </tr>
                        ) : (
                            <tr>
                                <th className="border p-2 border-slate-500 bg-blue-300">No.</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Tanggal</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Kode Produk</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Nama Produk</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Jumlah</th>
                                <th className="border p-2 border-slate-500 bg-blue-300">Note</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {type === "summary"
                            ? reportStock.map((stock: any, index: number) => (
                                <tr key={index}>
                                    <td className="border p-2 border-slate-700 text-center">{index + 1}</td>
                                    <td className="border p-2 border-slate-700">{stock.productCode}</td>
                                    <td className="border p-2 border-slate-700">{stock.productName}</td>
                                    <td className="border p-2 border-slate-700">{stock.initialStock}</td>
                                    <td className="border p-2 border-slate-700">{stock.stockIn}</td>
                                    <td className="border p-2 border-slate-700">{stock.stockOut}</td>
                                    <td className="border p-2 border-slate-700">{stock.finalStock}</td>
                                </tr>
                            ))
                            : reportStock.map((stock: any, index: number) => (
                                <tr key={index}>
                                    <td className="border p-2 border-slate-700 text-center">{index + 1}</td>
                                    <td className="border p-2 border-slate-700">
                                        {formatters.isoDateToStringDate(stock.createdAt)}
                                    </td>
                                    <td className="border p-2 border-slate-700">{stock.product.productCode}</td>
                                    <td className="border p-2 border-slate-700">{stock.product.name}</td>
                                    <td className="border p-2 border-slate-700">{stock.quantity}</td>
                                    <td className="border p-2 border-slate-700">{stock.note}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div></div>
            </div>
        </div>
    );
}

export default ReportStockTable;
