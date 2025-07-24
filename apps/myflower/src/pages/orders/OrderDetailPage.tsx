import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrderDetailSection from "@/components/organisms/orders/OrderDetailSection";
import MainLayout from "@/components/templates/MainLayout";
import { axiosInstance } from "@/utils";
import { useEffect, useState } from "react";

function OrderDetailPage() {
    const [order, setOrder] = useState<any>({});

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("orderDetail") || "{}");
        setOrder(storedOrder);
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

    return (
        <MainLayout className="w-full space-y-3 2xl:space-y-10 max-w-4xl 2xl:max-w-7xl mx-auto">
            <BackButton to="/orders">Kembali ke Pesanan</BackButton>
            <div className="">
                <SectionTitle className="text-2xl 2xl:text-3xl font-bold">Detail Pesanan</SectionTitle>
                <h3 className="text-lg font-semibold text-slate-500">#{order?.orderCode}</h3>
            </div>

            <OrderDetailSection order={order} />

            {/* <CountdownTimer endTime={900}>Pesanan dapat dibatalkan dalam:</CountdownTimer> */}
            <div className="flex gap-3 w-2/3 m-auto">
                <Button
                    type="button"
                    colors={{ primary: "#be3636", hover: "#912a2a" }}
                    className="w-full py-1 mx-auto"
                    onClick={handleCancelOrder}
                >
                    Batalkan Pesanan
                </Button>
                <Button
                    type="button"
                    colors={{ primary: "#8f40f6", hover: "#773dc4" }}
                    className="w-full py-1 mx-auto"
                    onClick={handleConfirmOrder}
                >
                    Terima Pesanan
                </Button>
            </div>
        </MainLayout>
    );
}

export default OrderDetailPage;
