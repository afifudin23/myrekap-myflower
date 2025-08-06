import { AiOutlineCheckCircle } from "react-icons/ai";
import Button from "@/components/atoms/Button";
import MainLayout from "@/components/templates/MainLayout";
import { BG_COLORS } from "@/constants/colors";

function PaymentSuccessPage() {
    return (
        <MainLayout className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
            <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            <h1 className="text-3xl font-bold">Pembayaran Berhasil!</h1>
            <p className="text-gray-600 text-base max-w-md">
                Terima kasih telah melakukan pembayaran. Pesanan Anda sedang kami proses dan akan segera dikirim.
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

export default PaymentSuccessPage;
