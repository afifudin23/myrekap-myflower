import { ButtonSmall } from "@/components/atoms";
import { TitlePage } from "@/components/molecules";
import ReportStockTable from "@/components/organisms/reports/ReportStockTable";
import MainLayout from "@/components/templates/MainLayout";
import { axiosInstance } from "@/utils";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router-dom";

function ReportProductStockResultPage() {
    const [searchParams] = useSearchParams();
    const [reportStock, setReportStock] = useState([]);
    const navigate = useNavigate();

    const params = {
        month: searchParams.get("month"),
        year: searchParams.get("year"),
        type: searchParams.get("type"),
    };

    useEffect(() => {
        const getOrderFilter = async () => {
            try {
                const response = await axiosInstance.get("/products/stock-report", { params });
                const data = response.data.data;
                setReportStock(data);
            } catch (error) {
                console.error("Error fetching order filter:", error);
            }
        };

        getOrderFilter();
    }, [searchParams]);

    const handleUnduhPDF = async () => {
        const rawHtml = document.getElementById("table-report-stocks")?.innerHTML;
        if (!rawHtml) return;
        try {
            const html = `
                <html>
                <head>
                    <meta charset="utf-8" />
                    <script src="https://cdn.tailwindcss.com"></script>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
                    <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        font-size: 8px;
                    }
                    </style>
                </head>
                <body>
                    ${rawHtml}
                </body>
                </html>
            `;

            let fileName = "Laporan_Stok_Produk.pdf";
            const response = await axiosInstance.post("/reports/pdf", { html, fileName }, { responseType: "blob" });

            const disposition = response.headers["content-disposition"];
            if (disposition && disposition.includes("filename=")) {
                const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (match?.[1]) {
                    fileName = match[1].replace(/['"]/g, ""); // hapus tanda kutip
                }
            }

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error: any) {
            console.log(error.response.data);
        }
    };
    const handleCetakLangsung = () => {
        const rawHtml = document.getElementById("table-report-stocks")?.innerHTML;
        if (!rawHtml) return;

        const html = `
            <html>
            <head>
                <meta charset="utf-8" />
                <title>Laporan Penjualan Produk</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
                <style>
                    @media print {
                        @page {
                            size: A4 landscape;
                            margin: 20mm;
                        }
                    }

                    body {
                        font-family: 'Poppins', sans-serif;
                        font-size: 8px;
                    }
                </style>
            </head>
            <body onload="window.print(); window.close();">
                ${rawHtml}
            </body>
            </html>
        `;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.open();
        printWindow.document.writeln(html);
        printWindow.document.close();
    };

    return (
        <MainLayout>
            <div className="flex justify-between items-center">
                <TitlePage title="Hasil Cetak Rekap" subtitle="Mencetak Laporan Penjualan Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate("/reports");
                        localStorage.removeItem("reportStock");
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>

            {reportStock.length > 0 ? (
                <div>
                    <div className="flex gap-3">
                        <ButtonSmall
                            className="bg-purple-500 hover:bg-purple-600 py-1 2xl:py-2 px-4 font-medium"
                            onClick={() => handleUnduhPDF()}
                        >
                            <MdOutlineDownloadForOffline size={20} /> Unduh PDF
                        </ButtonSmall>
                        <ButtonSmall
                            className="bg-blue-400 hover:bg-blue-500 py-1 2xl:py-2 px-4 font-medium"
                            onClick={() => handleCetakLangsung()}
                        >
                            <FaRegFilePdf /> Cetak PDF
                        </ButtonSmall>
                    </div>
                    <ReportStockTable reportStock={reportStock} />
                </div>
            ) : (
                <h1 className="text-center text-2xl my-56">Data Pesanan Tidak Ditemukan</h1>
            )}
        </MainLayout>
    );
}

export default ReportProductStockResultPage;
