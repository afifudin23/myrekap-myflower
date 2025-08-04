import BackButton from "@/components/atoms/BackButton";
import OrderDetailSection from "@/components/organisms/orders/OrderDetailSection";
import MainLayout from "@/components/templates/MainLayout";
import { axiosInstance } from "@/utils";
import { useEffect, useState } from "react";

function OrderDetailPage() {
    const [order, setOrder] = useState<any>({});
    const [snapToken, setSnapToken] = useState<string | null>("");

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("orderDetail") || "{}");
        setSnapToken(localStorage.getItem("snapToken"));
        setOrder(storedOrder);
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "");
        document.body.appendChild(script);
    }, []);

    const handleCancelOrder = async () => {
        const confirmed = window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?");
        if (!confirmed) return;
        try {
            const response = await axiosInstance.patch(`/orders/customer/${order.id}/cancel`);
            const data = response.data.data;
            setOrder(data);
            localStorage.setItem("orderDetail", JSON.stringify(data));
            alert("Pesanan berhasil dibatalkan.");
        } catch (error: any) {
            console.log(error.response.data);
            alert("Gagal membatalkan pesanan.");
        }
    };
    const handleConfirmOrder = async () => {
        const confirmed = window.confirm("Apakah Anda yakin ingin menerima pesanan ini?");
        if (!confirmed) return;
        try {
            const response = await axiosInstance.patch(`/orders/customer/${order.id}/confirm`);
            const data = response.data.data;
            setOrder(data);
            localStorage.setItem("orderDetail", JSON.stringify(data));
            alert("Pesanan berhasil diterima.");
        } catch (error: any) {
            console.log(error.response.data);
            alert("Gagal menerima pesanan.");
        }
    };

    const handlePay = () => {
        if (snapToken) {
            window.snap.pay(snapToken, {
                onSuccess: async () => {
                    await axiosInstance.delete("/carts");
                    localStorage.removeItem("snapToken");
                    await axiosInstance.post("/orders/customer/notification", order);
                },
                onPending: () => {
                    localStorage.setItem("snapToken", snapToken);
                    window.location.href = "/orders/" + order.id;
                },
                onError: async (error: any) => {
                    console.error("Payment Failed:", error);
                    await axiosInstance.delete("/orders/customer/" + order.orderCode);
                    alert("Terjadi kesalahan saat pembayaran.");
                },
            });
        }
    };

    const handleClickReview = (index: number) => {
        localStorage.setItem("productDetail", JSON.stringify(order.items[index].product));
    };

    return (
        <MainLayout className="w-full max-w-4xl space-y-3 2xl:max-w-7xl mx-auto">
            <BackButton to="/orders">Kembali ke Pesanan</BackButton>

            <OrderDetailSection
                order={order}
                snapToken={snapToken}
                handleCancelOrder={handleCancelOrder}
                handleConfirmOrder={handleConfirmOrder}
                handlePay={handlePay}
                handleClickReview={handleClickReview}
            />
        </MainLayout>
    );
}

export default OrderDetailPage;
