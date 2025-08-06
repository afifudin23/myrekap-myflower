import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "@/components/atoms/Button";
import MainLayout from "@/components/templates/MainLayout";
import { BG_COLORS } from "@/constants/colors";

function PaymentFailedPage() {
    return (
        <MainLayout className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
            <AiOutlineCloseCircle className="text-red-500 text-6xl" />
            <h1 className="text-3xl font-bold">Pembayaran Gagal</h1>
            <p className="text-gray-600 text-base max-w-md">
                Maaf, terjadi kesalahan saat memproses pembayaran Anda. Silakan coba lagi atau hubungi layanan pelanggan
                kami.
            </p>
            <Button
                type="button"
                onClick={() => (window.location.href = "http://localhost:5174/products")}
                className={`mt-4 px-6 py-2 text-white rounded-md ${BG_COLORS.primary}`}
            >
                Kembali Belanja
            </Button>
        </MainLayout>
    );
}

export default PaymentFailedPage;
