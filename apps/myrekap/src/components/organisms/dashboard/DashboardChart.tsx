import { daysInMonth, getSummaryPerDay } from "@/utils";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Daftarkan elemen chart
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

function DashboardChart({ monthYear, orders }: { monthYear: Date; orders: any[] }) {
    const { salesPerDay, revenuePerDay } = getSummaryPerDay(orders);

    const data = {
        labels: Array.from({ length: daysInMonth(monthYear) }, (_, i) => i + 1), // tanggal 1-30
        datasets: [
            {
                label: "Terjual",
                data: salesPerDay,
                fill: true,
                borderColor: "#2563EB",
                tension: 0.3,
                yAxisID: "y", // Y-axis utama
            },
            {
                label: "Pendapatan",
                data: revenuePerDay,
                fill: true,
                borderColor: "#16A34A",
                tension: 0.3,
                yAxisID: "y1", // Y-axis kedua
            },
        ],
    };

    const options = {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                position: "left" as const,
                ticks: {
                    color: "#2563EB",
                },
                beginAtZero: true,
            },
            y1: {
                type: "linear" as const,
                position: "right" as const,
                grid: {
                    drawOnChartArea: false, // biar gak numpuk gridnya
                },
                ticks: {
                    color: "#16A34A",
                },
                beginAtZero: true,
            },
        },
    };
    return (
        <div className="w-full 2xl:w-3/4 h-[400px] 2xl:h-[500px] mt-3 mx-auto text-center flex justify-center">
            <Line data={data} options={options} />
        </div>
    );
}

export default DashboardChart;
