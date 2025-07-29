import { Loading } from "@/components/atoms";
import { AlertInfo, InputFinishedProduct, TitlePage } from "@/components/molecules";
import { OrderDetailSection } from "@/components/organisms/orders";
import MainLayout from "@/components/templates/MainLayout";
import { axiosInstance, formatters } from "@/utils";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function OrderDetailPage() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(JSON.parse(localStorage.getItem("orderDetail") || "{}"));
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isOpenFinishedProduct, setIsOpenFinishedProduct] = useState(false);
    const [isOpenPaymentProof, setIsOpenPaymentProof] = useState(false);

    const {
        control,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            finishedProduct: order.finishedProduct?.secureUrl,
            orderStatus: formatters.formatCapital(order.orderStatus),
        },
    });
    const orderStatusWatch = watch("orderStatus");
    useEffect(() => {
        async function handleOrderStatus() {
            const response = await axiosInstance.patch(`orders/admin/${order.id}/order-status`, {
                orderStatus: formatters.parseCapital(orderStatusWatch),
            });
            const updatedOrder = { ...order, ...response.data.data };
            localStorage.setItem("orderDetail", JSON.stringify(updatedOrder));
            setOrder(updatedOrder);
        }
        handleOrderStatus();
    }, [orderStatusWatch]);

    const handleFinishedProduct = async (data: any) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("finishedProduct", data.finishedProduct);
            const response = await axiosInstance.post(`orders/admin/${order.id}/finished-product`, formData);
            const updatedOrder = { ...order, finishedProduct: response.data.data };

            localStorage.setItem("orderDetail", JSON.stringify(updatedOrder));
            setOrder(updatedOrder);
            setShowAlert(true);
            setMessage("Foto produk telah berhasil diunggah");
            reset({
                finishedProduct: updatedOrder.finishedProduct?.secureUrl,
                orderStatus: formatters.formatCapital(updatedOrder.orderStatus),
            });
        } catch (error: any) {
            if (error.response.status === 500) {
                setShowAlert(true);
                setMessage("Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya");
            } else {
                setShowAlert(true);
                setMessage(error.response.data.message);
            }
        } finally {
            setTimeout(() => setShowAlert(false), 3000);
            setIsLoading(false);
            setIsOpenFinishedProduct(false);
        }
    };

    return (
        <MainLayout>
            <div className="flex justify-between">
                <TitlePage title="Detail Penjualan" subtitle="Mengelola Data Penjualan" />
                <button
                    onClick={() => {
                        navigate("/orders");
                        localStorage.removeItem("orderDetail");
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <OrderDetailSection
                order={order}
                control={control}
                isOpenFinishedProduct={isOpenFinishedProduct}
                setIsOpenFinishedProduct={setIsOpenFinishedProduct}
                isOpenPaymentProof={isOpenPaymentProof}
                setIsOpenPaymentProof={setIsOpenPaymentProof}
            />

            {/* PaymentProof */}
            {isOpenPaymentProof && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsOpenPaymentProof(false)}
                >
                    <div
                        className="bg-white p-4 rounded-lg shadow-lg max-w-full max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={order.paymentProof?.secureUrl}
                            alt={`Bukti pembayaran atas nama ${order.customerName}`}
                            className="max-w-[90vw] max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}

            {/* Input Finished Product */}
            {isOpenFinishedProduct && (
                <InputFinishedProduct
                    control={control}
                    handleSubmit={handleSubmit}
                    handleFinishedProduct={handleFinishedProduct}
                    setIsOpenFinishedProduct={setIsOpenFinishedProduct}
                    errors={errors}
                    finishedProduct={order.finishedProduct?.secureUrl}
                />
            )}

            {/* Loading */}
            {isLoading && <Loading />}

            {/* Alert */}
            <AnimatePresence>
                {showAlert && message && <AlertInfo message={message} handleAlert={() => setShowAlert(false)} />}
            </AnimatePresence>
        </MainLayout>
    );
}

export default OrderDetailPage;
