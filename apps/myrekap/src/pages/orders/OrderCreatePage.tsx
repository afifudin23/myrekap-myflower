import { TitlePage } from "@/components/molecules";
import MainLayout from "@/components/templates/MainLayout";
import { useRef, useState } from "react";
import { OrderForm } from "@/components/organisms/orders";
import { axiosInstance, removeOrderCookies } from "@/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

function OrderCreatePage() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    let loadingTimer: NodeJS.Timeout | null = null;

// model Order {
//   id        String @id @default(cuid())
//   source    Source @map("source")
//   orderCode String @unique @map("order_code")
//   userId    String @map("user_id")

//   // Customer
//   customerName     String           @map("customer_name")
//   customerCategory CustomerCategory @default(UMUM) @map("customer_category")
//   phoneNumber      String           @map("phone_number")
//   deliveryOption   DeliveryOption   @map("delivery_option")
//   readyDate        DateTime         @map("ready_date")

//   // Delivery
//   shippingCost    Int?    @map("shipping_cost")
//   deliveryAddress String? @map("delivery_address")

//   // Payment
//   totalPrice      Int            @map("total_price")
//   paymentMethod   PaymentMethod? @map("payment_method")
//   paymentProvider String?        @map("payment_provider")

//   // Status
//   paymentStatus         PaymentStatus  @map("payment_status")
//   previousPaymentStatus PaymentStatus? @map("previous_payment_status")
//   orderStatus           OrderStatus    @default(IN_PROCESS) @map("order_status")
//   orderDate             DateTime       @default(now()) @map("order_date")

//   // Relation
//   paymentProof    PaymentProof?
//   finishedProduct FinishedProduct?
//   user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
//   items           OrderItem[]

//   @@map("orders")
// }

    // Type Any, Next Fixing
    const {
        handleSubmit,
        control,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm<any>({
        // resolver: zodResolver(createOrderSchema),
        defaultValues: {
            customerName: "",
            customerCategory: "",
            phoneNumber: "",
            items: [{ productId: "", quantity: 1, message: "" }],
            deliveryOption: "",
            deliveryAddress: "",
            readyDate: "",
            paymentMethod: "",
            paymentProof: [],
        },
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        return false;
        loadingTimer = setTimeout(() => {
            setIsLoading(true);
        }, 500);
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, (data as Record<string, any>)[key]);
            }
            await axiosInstance.post("order-summaries", formData);

            if (loadingTimer) {
                // clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            setIsLoading(false);
            setShowAlert(true);
            setAlertMessage("Pesanan baru telah berhasil disimpan");
            // reset(defaultValuesAddOrderSummary);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error: any) {
            setShowAlert(true);
            if (error.response.status === 500) {
                setAlertMessage("Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya");
            } else {
                setAlertMessage(error.response.data.message);
            }
        } finally {
            if (loadingTimer) {
                // clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            setIsLoading(false);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    return (
        <MainLayout>
            <div className="flex justify-between">
                <TitlePage title="Tambah Order" subtitle="Menginput Order Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate("/orders");
                        removeOrderCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <OrderForm
                onSubmit={handleSubmit(onSubmit)}
                fieldRefs={fieldRefs}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                alertMessage={alertMessage}
                isLoading={isLoading}
                errors={errors}
            />
        </MainLayout>
    );
}

export default OrderCreatePage;
