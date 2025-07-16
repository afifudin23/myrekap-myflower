import { ButtonSmall } from "@/components/atoms";
import { TitlePage } from "@/components/molecules";
import { ReportOrderTable } from "@/components/organisms/reports";
import MainLayout from "@/components/templates/MainLayout";
import { axiosInstance, formatters } from "@/utils";
import { useEffect, useState } from "react";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router-dom";

function ReportOrderResultPage() {
    const [searchParams] = useSearchParams();
    const [orderFilter, setOrderFilter] = useState([]);
    const navigate = useNavigate();

    const params = {
        from_date: searchParams.get("from_date"),
        to_date: searchParams.get("to_date"),
        customer_category: searchParams.get("customer_category"),
        payment_method: searchParams.get("payment_method"),
        payment_status: searchParams.get("payment_status"),
        order_status: searchParams.get("order_status"),
    };

    useEffect(() => {
        const getOrderFilter = async () => {
            try {
                const response = await axiosInstance.get("/orders/admin", { params });
                console.log(response.data.data);
                const data = response.data.data.map((order: any) => formatters.formatReportOrder(order));
                setOrderFilter(data);
            } catch (error) {
                console.error("Error fetching order filter:", error);
            }
        };

        getOrderFilter();
    }, [searchParams]);

    const handleUnduhPDF = async () => {
        const rawHtml = document.getElementById("table-report-orders")?.innerHTML;
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

            const response = await axiosInstance.post("/admin/orders/pdf", { html }, { responseType: "blob" });
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const disposition = response.headers["content-disposition"];
            let fileName = "Laporan_Penjualan.pdf";

            if (disposition && disposition.includes("filename=")) {
                const matches = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (matches?.[1]) {
                    fileName = matches[1].replace(/['"]/g, ""); // hilangkan tanda kutip
                }
            }

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <div className="flex justify-between items-center">
                <TitlePage title="Hasil Cetak Rekap" subtitle="Mencetak Laporan Penjualan Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate("/reports/orders");
                        localStorage.removeItem("orderFilter");
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>

            {orderFilter.length > 0 ? (
                <>
                    <ButtonSmall className="bg-purple-500 hover:bg-purple-600 py-1 2xl:py-2 px-4 font-semibold" onClick={() => handleUnduhPDF()}>
                        <MdOutlineDownloadForOffline size={20} /> Unduh PDF
                    </ButtonSmall>
                    <ReportOrderTable orderFilter={orderFilter} />
                </>
            ) : (
                <h1 className="text-center text-2xl my-56">Data Pesanan Tidak Ditemukan</h1>
            )}
        </MainLayout>
    );
}

export default ReportOrderResultPage;
