import Badge from "@/components/atoms/Badge";
import SmallButton from "@/components/atoms/SmallButton";
import formatters from "@/utils/formatters";
import { getOrderCookies, setOrderCookies } from "@/utils/orderCookies";
import { RiEdit2Fill } from "react-icons/ri";
import { HiPhoto } from "react-icons/hi2";
import { IoReceiptSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AlertInfo } from "@/components/molecules/Alert";
import axiosInstance from "@/utils/axiosInstance";
import { TbReceiptFilled } from "react-icons/tb";
import { useForm } from "react-hook-form";
import InputFinishedProduct from "@/components/molecules/InputFinishedProduct";
import Loading from "@/components/atoms/Loading";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "@/components/organisms/Receipt";
import { backgorundCardColor, badgeColorOrderStatus, badgeColorPaymentStatus } from "@/utils/colorCard";
import InputDropdown from "@/components/molecules/InputDropdown";
import { DataOrderStatus } from "@/constants/DataCategory";

function OrderSummaryCard() {
    const [orderData, setOrderData] = useState(getOrderCookies());
    if (!orderData) return <h1 className="text-4xl font-semibold text-center mt-20">Data Tidak Ditemukan</h1>;
    const field = formatters.formatDataOrderSummary(orderData);
    const navigate = useNavigate();
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isOpenPaymentProof, setIsOpenPaymentProof] = useState<boolean>(false);
    const [isOpenFinishedProduct, setIsOpenFinishedProduct] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { finishedProduct, isPaid, orderStatus, paymentProof, orderDate, ...dataReceipt }: any = field;
    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            finishedProduct: field.finishedProduct?.secureUrl,
            orderStatus: field.orderStatus,
        },
    });
    const orderStatusWatch = watch("orderStatus");
    // console.log(field)
    useEffect(() => {
        const state = location.state as { alertMessage?: string };

        if (state?.alertMessage) {
            setAlertMessage(state.alertMessage);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            navigate(location.pathname, { replace: true });
        }
    }, []);

    useEffect(() => {
        async function handleOrderStatus() {
            const response = await axiosInstance.put(`order-summaries/${field.id}/order-status`, {
                orderStatus: formatters.parseCapital(orderStatusWatch),
            });
            const updatedOrder = { ...orderData, ...response.data.data };
            setOrderCookies(updatedOrder);
            setOrderData(updatedOrder);
        }
        handleOrderStatus();
    }, [orderStatusWatch]);

    const handleFinishedProduct = async (data: any) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("finishedProduct", data.finishedProduct);
            const response = await axiosInstance.post(`finished-products/${field.id}`, formData);
            const updatedOrder = { ...orderData, finishedProduct: response.data.data };
            setOrderCookies(updatedOrder);
            setOrderData(updatedOrder);
            setShowAlert(true);
            setAlertMessage("Foto produk telah berhasil diunggah");
            reset({
                finishedProduct: updatedOrder.finishedProduct?.secureUrl,
                orderStatus: formatters.formatCapital(updatedOrder.orderStatus),
            });
        } catch (error: any) {
            if (error.response.status === 500) {
                setShowAlert(true);
                setAlertMessage("Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya");
            } else {
                setShowAlert(true);
                setAlertMessage(error.response.data.message);
            }
        } finally {
            setTimeout(() => setShowAlert(false), 3000);
            setIsLoading(false);
            setIsOpenFinishedProduct(false);
        }
    };

    return (
        <>
            <div
                className={`w-full rounded-lg p-9 2xl:p-14 flex flex-col gap-5 text-xl mb-32 ${backgorundCardColor(
                    field.paymentStatus
                )}`}
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-base 2xl:text-xl px-4 py-1 rounded-md text-slate-50 bg-slate-800 bg-opacity-40">
                            #{field.invoiceNumber}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Badge
                            className={`${badgeColorPaymentStatus(field.paymentStatus)}`}
                            field={field.paymentStatus}
                        />
                        <Badge className={`${badgeColorOrderStatus(field.orderStatus)}`} field={field.orderStatus} />
                        <Badge className="bg-[#609393]" field={field.customerCategory} />
                    </div>
                </div>
                <h1 className="text-3xl 2xl:text-4xl font-semibold py-1 2xl:py-3">{field.customerName}</h1>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-5 w-2/3 text-lg 2xl:text-xl">
                        <div className="border-b-2 border-stone-800 w-full pb-3">
                            Kategori Bunga : {field.flowerCategory}
                        </div>
                        <div className="border-b-2 border-stone-800 w-full pb-3">Jumlah Pesan : {field.quantity}</div>
                    </div>
                    <div className="text-4xl 2xl:text-5xl font-semibold">{field.price}</div>
                </div>
                <div className="border-b-2 border-stone-800 w-full pb-3 text-lg 2xl:text-xl">
                    Pesan Ucapan : {field.greetingMessage}
                </div>
                <div className="border-b-2 border-stone-800 w-full pb-3 text-lg 2xl:text-xl">
                    Alamat Pengiriman: {field.deliveryAddress}
                </div>
                <div className="border-b-2 border-stone-800 w-full pb-3 text-lg 2xl:text-xl">
                    Biaya Pengiriman : <span className="font-semibold">{field.shippingCost}</span>
                </div>
                <div className="border-b-2 border-stone-800 w-full pb-3 inline-flex justify-between text-lg 2xl:text-xl">
                    <p>
                        Metode Pembayaran : <span className="font-semibold">{field.paymentMethod}</span>
                    </p>
                    {field.paymentMethod === "Transfer" && (
                        <button
                            className="inline-flex text-blue-600 items-center gap-1 font-medium"
                            onClick={() => setIsOpenPaymentProof(true)}
                        >
                            <TbReceiptFilled />
                            Bukti Pembayaran
                        </button>
                    )}
                </div>
                <div className="flex gap-2 border-b-2 border-stone-800 w-full pb-3 text-lg 2xl:text-xl">
                    <div className="py-1 px-2 font-medium 2xl:font-semibold bg-opacity-80 rounded-md text-slate-50 bg-indigo-500">
                        Dipesan: {field.orderDate}
                    </div>
                    <div className="py-1 px-2 font-medium 2xl:font-semibold bg-opacity-80 rounded-md text-slate-50 bg-indigo-500">
                        Dikirim: {field.deliveryDate}
                    </div>
                </div>
                <div className="flex items-start mt-5 gap-4">
                    <SmallButton
                        className="bg-orange-400 hover:bg-orange-500 px-5 py-1 2xl:py-2 font-semibold"
                        onClick={() => navigate(`/order-summary/edit/${field.id}`)}
                    >
                        <RiEdit2Fill />
                        Edit
                    </SmallButton>
                    <SmallButton
                        className="bg-blue-600 hover:bg-blue-700 py-1 2xl:py-2 px-4 font-semibold"
                        onClick={() => setIsOpenFinishedProduct(!isOpenFinishedProduct)}
                    >
                        <HiPhoto /> Produk
                    </SmallButton>

                    <SmallButton className="bg-cyan-500 hover:bg-cyan-600 py-1 2xl:py-2 px-4 font-semibold">
                        <PDFDownloadLink
                            document={<Receipt data={dataReceipt} />}
                            fileName={`receipt-order-${field.invoiceNumber}.pdf`}
                            className="flex items-center justify-center gap-1"
                        >
                            <IoReceiptSharp /> Kwitansi
                        </PDFDownloadLink>
                    </SmallButton>

                    <InputDropdown
                        label="Status Pesanan"
                        name="orderStatus"
                        control={control}
                        formInput={false}
                        width="w-52"
                        className="py-1 2xl:py-2 px-4 text-base 2xl:text-xl"
                        options={DataOrderStatus.filter((item) => item !== "Semua")}
                    />
                </div>
            </div>

            {/* Alert */}
            <AnimatePresence>
                {showAlert && alertMessage && (
                    <AlertInfo message={alertMessage} handleAlert={() => setShowAlert(false)} />
                )}
            </AnimatePresence>

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
                            src={field.paymentProof?.secureUrl}
                            alt={`Bukti pembayaran atas nama ${field.customerName}`}
                            className="max-w-[90vw] max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}

            {isOpenFinishedProduct && (
                <InputFinishedProduct
                    control={control}
                    handleSubmit={handleSubmit}
                    handleFinishedProduct={handleFinishedProduct}
                    setIsOpenFinishedProduct={setIsOpenFinishedProduct}
                    errors={errors}
                    finishedProduct={field.finishedProduct?.secureUrl}
                />
            )}

            {/* Loading */}
            {isLoading && <Loading />}
        </>
    );
}

export default OrderSummaryCard;
