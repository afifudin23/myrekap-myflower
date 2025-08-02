import { TitlePage } from "@/components/molecules";
import MainLayout from "@/components/templates/MainLayout";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDroprightCircle } from "react-icons/io";

function ReportPage() {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="space-y-6">
                <TitlePage title="Cetak Rekap" subtitle="Mencetak Rekap Laporan" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <button
                        onClick={() => navigate("/reports/orders")}
                        className="border border-gray-400 rounded-lg p-6 text-left text-lg hover:bg-slate-100 flex justify-between items-center"
                    >
                        <div className="flex items-center gap-3">
                            <img src="assets/images/chart.png" alt="" className="w-12" />
                            <div className="flex flex-col gap-1">
                                <p className="flex items-center text-xl font-semibold">Laporan Penjualan</p>
                                <p className="text-sm text-gray-500 font-medium">Melihat ringkasan transaksi penjualan</p>
                            </div>
                        </div>
                        <div>
                            <IoMdArrowDroprightCircle className="text-gray-600 text-4xl" />
                        </div>
                    </button>
                    <button
                        onClick={() => navigate("/reports/products")}
                        className="border border-gray-400 rounded-lg p-6 text-left text-lg hover:bg-slate-100 flex justify-between items-center"
                    >
                        <div className="flex items-center gap-4">
                            <img src="assets/images/product.png" alt="" className="w-10" />
                            <div className="flex flex-col gap-1">
                                <p className="flex items-center gap-2 text-xl font-semibold">Laporan Stok Produk</p>
                                <p className="text-sm text-gray-500 font-medium">Cek ketersediaan dan jumlah stok produk</p>
                            </div>
                        </div>
                        <div>
                            <IoMdArrowDroprightCircle className="text-gray-600 text-4xl" />
                        </div>
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}

export default ReportPage;
