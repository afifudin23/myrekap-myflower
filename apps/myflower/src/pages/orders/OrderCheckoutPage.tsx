import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";
import InputText from "@/components/molecules/inputs/InputText";
import OrderForm from "@/components/organisms/orders/OrderForm";
import MainLayout from "@/components/templates/MainLayout";
import { orderFormSchema } from "@/schemas/orderSchema";
import { axiosInstance, formatters } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function OrderCheckoutPage() {
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const totalItem = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total: number, item: any) => total + item.product.price * item.quantity, 0);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "");
        document.body.appendChild(script);
    }, []);

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            deliveryOption: "",
            deliveryAddress: "",
            readyDate: undefined,
            paymentMethod: "",
            items: cartItems.map((item: any) => ({
                productId: item.product.id,
                quantity: item.quantity,
                message: "",
            })),
        },
    });

    const shippingCost = watch("deliveryOption") === "Delivery" ? totalPrice * 0.1 : 0;
    const { fields } = useFieldArray({
        control,
        name: "items",
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            let createOrder = order;
            if (!createOrder) {
                const response = await axiosInstance.post("/orders/customer", data);
                createOrder = response.data.data;
                setOrder(response.data.data);
            }

            if (data.paymentMethod === "COD") {
                await axiosInstance.delete("/carts");
                await axiosInstance.post("/orders/customer/notification", createOrder);
                alert("Pesanan berhasil dibuat. Silahkan melakukan pembayaran melalui metode COD.");
                navigate("/products");
                return true;
            }

            const currentOrderCode = createOrder.orderCode;
            const snapResponse = await axiosInstance.post("/transactions/create", { orderCode: currentOrderCode });
            const snapToken = snapResponse.data.data.token;

            window.snap.pay(snapToken, {
                onSuccess: async () => {
                    // Send WhatsApp message
                    await axiosInstance.post("/orders/customer/notification", createOrder);
                    await axiosInstance.delete("/carts");
                    localStorage.removeItem("snapToken");
                    setOrder(null);
                },
                onPending: async () => {
                    await axiosInstance.delete("/carts");
                    localStorage.setItem("snapToken", snapToken);
                    window.location.href = "/orders";
                },
                onError: async (error: any) => {
                    console.error("Payment Failed:", error);
                    await axiosInstance.delete("/orders/customer/" + currentOrderCode);
                    setOrder(null);
                    alert("Terjadi kesalahan saat pembayaran.");
                },
                onClose: async () => {
                    await axiosInstance.delete("/orders/customer/" + currentOrderCode);
                    setOrder(null);
                },
            });
        } catch (error: any) {
            console.log(error);
            const axiosError = error as AxiosError;
            if (axiosError.code === "ERR_NETWORK") {
                alert("Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda");
            } else {
                alert("Gagal Membuat Pesanan. Silahkan Periksa Kembali");
            }
        }
    });

    return (
        <MainLayout className="w-full space-y-6 max-w-7xl mx-auto mb-32">
            <BackButton>Kembali ke Keranjang</BackButton>
            <SectionTitle className="text-3xl font-bold">Checkout</SectionTitle>

            <form className="grid md:grid-cols-2 gap-6" onSubmit={onSubmit}>
                {/* Informasi Pengiriman */}
                <div className="space-y-4">
                    <SectionTitle>Informasi Pengiriman</SectionTitle>
                    <OrderForm control={control} errors={errors} watch={watch} />
                </div>

                {/* Ringkasan Pesanan */}
                <div className="space-y-4">
                    <SectionTitle>Ringkasan Pesanan</SectionTitle>
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm space-y-2">
                        <div className="space-y-3">
                            {fields.map((field: any, index: number) => (
                                <div key={field.id} className="flex flex-col gap-2">
                                    <p className="flex justify-between">
                                        <span className="font-medium">
                                            {cartItems[index]?.product?.name} ({cartItems[index]?.quantity}x)
                                        </span>
                                        <span className="ml-2">Rp {cartItems[index].product.price}</span>
                                    </p>
                                    <InputText
                                        name={`items.${index}.message`}
                                        label="Pesan Untuk Produk (Opsional)"
                                        formInput={false}
                                        control={control}
                                        error={errors.items?.[index]?.message}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <span>Total Item</span>
                            <span>{totalItem}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Biaya Pengiriman</span>
                            <span>{formatters.formatRupiah(shippingCost)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total Harga</span>
                            <span>{formatters.formatRupiah(totalPrice + shippingCost)}</span>
                        </div>
                    </div>

                    <Button type="submit" colors={{ primary: "#8f40f6", hover: "#773dc4" }} className="w-full p-2">
                        Bayar Sekarang
                    </Button>
                </div>
            </form>
        </MainLayout>
    );
}

export default OrderCheckoutPage;
