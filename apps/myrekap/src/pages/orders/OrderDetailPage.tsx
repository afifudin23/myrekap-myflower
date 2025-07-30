import { ButtonSmall, Loading } from "@/components/atoms";
import { AlertInfo, InputDropdown, InputFinishedProduct, TitlePage } from "@/components/molecules";
import { OrderDetailSection } from "@/components/organisms/orders";
import MainLayout from "@/components/templates/MainLayout";
import { ORDER_STATUS_ITEMS, ORDER_STATUS_LABELS } from "@/constants/category";
import { axiosInstance } from "@/utils";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function OrderDetailPage() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(JSON.parse(localStorage.getItem("orderDetail") || "{}"));
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isOpenUpdateProgress, setIsOpenUpdateProgress] = useState(false);
    const [isOpenPaymentProof, setIsOpenPaymentProof] = useState(false);
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            finishedProduct: order.finishedProduct?.secureUrl,
            orderStatus: order.orderStatus,
        },
    });

    const handleFinishedProduct = async (data: any) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("orderStatus", data.orderStatus);
            formData.append("finishedProduct", data.finishedProduct);
            const response = await axiosInstance.patch(`orders/admin/${order.id}/update-progress`, formData);
            const resData = response.data.data;
            const updatedOrder = {
                ...order,
                finishedProduct: resData.finishedProduct,
                orderStatus: resData.orderStatus,
            };

            localStorage.setItem("orderDetail", JSON.stringify(updatedOrder));
            setOrder(updatedOrder);
            setShowAlert(true);
            setMessage("Progres berhasil diperbarui");
            reset({
                finishedProduct: updatedOrder.finishedProduct?.secureUrl,
                orderStatus: updatedOrder.orderStatus,
            });
        } catch (error: any) {
            console.log(error.response.data);
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
            setIsOpenUpdateProgress(false);
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
                isOpenUpdateProgress={isOpenUpdateProgress}
                setIsOpenUpdateProgress={setIsOpenUpdateProgress}
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

            {/* Input Update Progress */}
            {isOpenUpdateProgress && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsOpenUpdateProgress(false)}
                >
                    <form
                        onSubmit={handleSubmit(handleFinishedProduct)}
                        className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-4/5 space-y-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <InputDropdown
                            label="Status Pesanan"
                            name="orderStatus"
                            control={control}
                            className="py-1 2xl:py-2 px-4 text-base 2xl:text-xl"
                            options={ORDER_STATUS_ITEMS.filter((item) => {
                                const excludedLabels = ["Semua"];
                                if (order.deliveryOption === "PICKUP") excludedLabels.push("Pengiriman");
                                return !excludedLabels.includes(item.label);
                            })}
                            optionLabel={ORDER_STATUS_LABELS}
                        />
                        <InputFinishedProduct
                            control={control}
                            handleSubmit={handleSubmit}
                            handleFinishedProduct={handleFinishedProduct}
                            setIsOpenUpdateProgress={setIsOpenUpdateProgress}
                            errors={errors}
                            finishedProduct={order.finishedProduct?.secureUrl}
                        />
                        <ButtonSmall
                            type="submit"
                            className="w-1/6 mx-auto py-1 2xl:py-2 px-4 font-semibold bg-blue-600 hover:bg-blue-700"
                        >
                            Simpan
                        </ButtonSmall>
                    </form>
                </div>
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
