import MainLayout from "@/components/templates/MainLayout";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { InputMonthYear, OrderPagination } from "@/components/molecules";

const orders = [
    {
        id: "cmcz1mb8j0009w4z4og59d5hq",
        orderCode: "ORD-7CMCZ1MB8J-58BFFF",
        userId: "cmcz15gnm0000w4z4vebw21ya",
        customerName: "Afifudin N",
        customerCategory: "UMUM",
        deliveryOption: "PICKUP",
        deliveryAddress: null,
        deliveryDate: null,
        readyDate: "2025-10-03T00:00:00.000Z",
        totalPrice: 200000,
        shippingCost: null,
        paymentMethod: "EWALLET",
        paymentProvider: "dana",
        paymentStatus: "PAID",
        previousPaymentStatus: null,
        orderStatus: "IN_PROCESS",
        orderDate: "2025-07-11T16:40:34.916Z",
        items: [
            {
                id: "cmcz1mb8j000aw4z4tkyaqobf",
                orderId: "cmcz1mb8j0009w4z4og59d5hq",
                productId: "cmcz1ej100001w4z4fvsf8ag1",
                quantity: 1,
                greetingMessage: "Halo Apeepp",
                unitPrice: 100000,
                totalPrice: 100000,
                product: {
                    id: "cmcz1ej100001w4z4fvsf8ag1",
                    name: "Krans",
                    price: 100000,
                    stock: 21,
                    description: "Ini Krans",
                    isActive: true,
                    images: [
                        {
                            id: "cmcz1ej100002w4z40hwshe6u",
                            fileName: "onoy.png",
                            size: 1085669,
                            publicId: "myflower-myrekap/produk/Krans/1752251666915-onoy.png",
                            secureUrl:
                                "https://res.cloudinary.com/dwt5ano0z/image/upload/v1752251669/myflower-myrekap/produk/Krans/1752251666915-onoy.png.png",
                            productId: "cmcz1ej100001w4z4fvsf8ag1",
                        },
                    ],
                },
            },
            {
                id: "cmcz1mb8j000aw4z4tkyaqobf",
                orderId: "cmcz1mb8j0009w4z4og59d5hq",
                productId: "cmcz1ej100001w4z4fvsf8ag1",
                quantity: 1,
                greetingMessage: "Halo Apeepp",
                unitPrice: 100000,
                totalPrice: 100000,
                product: {
                    id: "cmcz1ej100001w4z4fvsf8ag1",
                    name: "Krans",
                    price: 100000,
                    stock: 21,
                    description: "Ini Krans",
                    isActive: true,
                    images: [
                        {
                            id: "cmcz1ej100002w4z40hwshe6u",
                            fileName: "onoy.png",
                            size: 1085669,
                            publicId: "myflower-myrekap/produk/Krans/1752251666915-onoy.png",
                            secureUrl:
                                "https://res.cloudinary.com/dwt5ano0z/image/upload/v1752251669/myflower-myrekap/produk/Krans/1752251666915-onoy.png.png",
                            productId: "cmcz1ej100001w4z4fvsf8ag1",
                        },
                    ],
                },
            },
            {
                id: "cmcz1mb8j000aw4z4tkyaqobf",
                orderId: "cmcz1mb8j0009w4z4og59d5hq",
                productId: "cmcz1ej100001w4z4fvsf8ag1",
                quantity: 1,
                greetingMessage: "Halo Apeepp",
                unitPrice: 100000,
                totalPrice: 100000,
                product: {
                    id: "cmcz1ej100001w4z4fvsf8ag1",
                    name: "Krans",
                    price: 100000,
                    stock: 21,
                    description: "Ini Krans",
                    isActive: true,
                    images: [
                        {
                            id: "cmcz1ej100002w4z40hwshe6u",
                            fileName: "onoy.png",
                            size: 1085669,
                            publicId: "myflower-myrekap/produk/Krans/1752251666915-onoy.png",
                            secureUrl:
                                "https://res.cloudinary.com/dwt5ano0z/image/upload/v1752251669/myflower-myrekap/produk/Krans/1752251666915-onoy.png.png",
                            productId: "cmcz1ej100001w4z4fvsf8ag1",
                        },
                    ],
                },
            },
            {
                id: "cmcz1mb8j000bw4z4a0euv2ay",
                orderId: "cmcz1mb8j0009w4z4og59d5hq",
                productId: "cmcz1f2tb0003w4z4bh5zizw2",
                quantity: 1,
                greetingMessage: "Halo Adekk",
                unitPrice: 100000,
                totalPrice: 100000,
                product: {
                    id: "cmcz1f2tb0003w4z4bh5zizw2",
                    name: "Bouquet",
                    price: 100000,
                    stock: 21,
                    description: "Ini Bouquet",
                    isActive: true,
                    images: [
                        {
                            id: "cmcz1f2tb0004w4z4vfk6i36c",
                            fileName: "onoy.png",
                            size: 1085669,
                            publicId: "myflower-myrekap/produk/Bouquet/1752251693773-onoy.png",
                            secureUrl:
                                "https://res.cloudinary.com/dwt5ano0z/image/upload/v1752251695/myflower-myrekap/produk/Bouquet/1752251693773-onoy.png.png",
                            productId: "cmcz1f2tb0003w4z4bh5zizw2",
                        },
                    ],
                },
            },
        ],
    },
    {
        id: "cmd00syxo0000w44gqrj0ogoc",
        orderCode: "ORD-7FMD00SYXM-B5D706",
        userId: "cmcz15gnm0000w4z4vebw21ya",
        customerName: "Afifudin N1",
        customerCategory: "UMUM",
        deliveryOption: "PICKUP",
        deliveryAddress: null,
        deliveryDate: null,
        readyDate: "2025-10-03T00:00:00.000Z",
        totalPrice: 200000,
        shippingCost: null,
        paymentMethod: "BANK_TRANSFER",
        paymentProvider: "bni",
        paymentStatus: "PAID",
        previousPaymentStatus: null,
        orderStatus: "IN_PROCESS",
        orderDate: "2025-07-12T09:05:32.124Z",
        items: [
            {
                id: "cmd00syxp0001w44g2bpz659f",
                orderId: "cmd00syxo0000w44gqrj0ogoc",
                productId: "cmcz1ej100001w4z4fvsf8ag1",
                quantity: 1,
                greetingMessage: "Halo Apeepp",
                unitPrice: 100000,
                totalPrice: 100000,
                product: {
                    id: "cmcz1ej100001w4z4fvsf8ag1",
                    name: "Krans",
                    price: 100000,
                    stock: 21,
                    description: "Ini Krans",
                    isActive: true,
                    images: [
                        {
                            id: "cmcz1ej100002w4z40hwshe6u",
                            fileName: "onoy.png",
                            size: 1085669,
                            publicId: "myflower-myrekap/produk/Krans/1752251666915-onoy.png",
                            secureUrl:
                                "https://res.cloudinary.com/dwt5ano0z/image/upload/v1752251669/myflower-myrekap/produk/Krans/1752251666915-onoy.png.png",
                            productId: "cmcz1ej100001w4z4fvsf8ag1",
                        },
                    ],
                },
            },
            {
                id: "cmd00syxp0002w44gu8nd2r8m",
                orderId: "cmd00syxo0000w44gqrj0ogoc",
                productId: "cmcz1f2tb0003w4z4bh5zizw2",
                quantity: 1,
                greetingMessage: "Halo Adekk",
                unitPrice: 100000,
                totalPrice: 100000,
                product: {
                    id: "cmcz1f2tb0003w4z4bh5zizw2",
                    name: "Bouquet",
                    price: 100000,
                    stock: 21,
                    description: "Ini Bouquet",
                    isActive: true,
                    images: [
                        {
                            id: "cmcz1f2tb0004w4z4vfk6i36c",
                            fileName: "onoy.png",
                            size: 1085669,
                            publicId: "myflower-myrekap/produk/Bouquet/1752251693773-onoy.png",
                            secureUrl:
                                "https://res.cloudinary.com/dwt5ano0z/image/upload/v1752251695/myflower-myrekap/produk/Bouquet/1752251693773-onoy.png.png",
                            productId: "cmcz1f2tb0003w4z4bh5zizw2",
                        },
                    ],
                },
            },
        ],
    },
    {
        id: "cmd00y51d0003w44g9j1hdna3",
        orderCode: "ORD-98MD00Y51B-507089",
        userId: "cmcz15gnm0000w4z4vebw21ya",
        customerName: "Afifudin N2",
        customerCategory: "UMUM",
        deliveryOption: "PICKUP",
        deliveryAddress: null,
        deliveryDate: null,
        readyDate: "2025-10-03T00:00:00.000Z",
        totalPrice: 200000,
        shippingCost: null,
        paymentMethod: "CSTORE",
        paymentProvider: "alfamart",
        paymentStatus: "PAID",
        previousPaymentStatus: null,
        orderStatus: "IN_PROCESS",
        orderDate: "2025-07-12T09:09:33.313Z",
        items: [
            {
                id: "cmd00y51d0004w44gl8peds0j",
                orderId: "cmd00y51d0003w44g9j1hdna3",
                productId: "cmcz1ej100001w4z4fvsf8ag1",
                quantity: 1,
                greetingMessage: "Halo Apeepp",
                unitPrice: 100000,
                totalPrice: 100000,
                product: {
                    id: "cmcz1ej100001w4z4fvsf8ag1",
                    name: "Krans",
                    price: 100000,
                    stock: 21,
                    description: "Ini Krans",
                    isActive: true,
                    images: [
                        {
                            id: "cmcz1ej100002w4z40hwshe6u",
                            fileName: "onoy.png",
                            size: 1085669,
                            publicId: "myflower-myrekap/produk/Krans/1752251666915-onoy.png",
                            secureUrl:
                                "https://res.cloudinary.com/dwt5ano0z/image/upload/v1752251669/myflower-myrekap/produk/Krans/1752251666915-onoy.png.png",
                            productId: "cmcz1ej100001w4z4fvsf8ag1",
                        },
                    ],
                },
            },
            {
                id: "cmd00y51d0005w44gimx33766",
                orderId: "cmd00y51d0003w44g9j1hdna3",
                productId: "cmcz1f2tb0003w4z4bh5zizw2",
                quantity: 1,
                greetingMessage: "Halo Adekk",
                unitPrice: 100000,
                totalPrice: 100000,
                product: {
                    id: "cmcz1f2tb0003w4z4bh5zizw2",
                    name: "Bouquet",
                    price: 100000,
                    stock: 21,
                    description: "Ini Bouquet",
                    isActive: true,
                    images: [
                        {
                            id: "cmcz1f2tb0004w4z4vfk6i36c",
                            fileName: "onoy.png",
                            size: 1085669,
                            publicId: "myflower-myrekap/produk/Bouquet/1752251693773-onoy.png",
                            secureUrl:
                                "https://res.cloudinary.com/dwt5ano0z/image/upload/v1752251695/myflower-myrekap/produk/Bouquet/1752251693773-onoy.png.png",
                            productId: "cmcz1f2tb0003w4z4bh5zizw2",
                        },
                    ],
                },
            },
        ],
    },
];

function DashboardPage() {
    const [monthYear, setMonthYear] = useState<Date>(new Date());
    // const { orders, setOrders } = useOrders(monthYear);
    console.log(orders);
    // const [_, setSearchParams] = useSearchParams();

    // const [searchTerm, setSearchTerm] = useState("");
    // const [filterCustomer, setFilterCustomer] = useState("Customer");
    // const [filterPayment, setFilterPayment] = useState("Pembayaran");
    // const [filterOrder, setFilterOrder] = useState("Pesanan");
    const filteredOrders = orders.filter(
        (order) => order
        // filterSearch(order, searchTerm)
        // filterCustomerCategory(order, filterCustomer) &&
        // filterPaymenrtStatus(order, filterPayment) &&
        // filterOrderStatus(order, filterOrder)
    );
    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         const month = monthYear ? monthYear.getMonth() + 1 : new Date().getMonth() + 1; // getMonth() is zero-based
    //         const year = monthYear ? monthYear.getFullYear() : new Date().getFullYear();
    //         const params = {
    //             month: month.toString().padStart(2, "0"),
    //             year: year.toString(),
    //         };
    //         const ordersFilter = await axiosInstance.get("/admin/orders", { params });
    //         setSearchParams(params);
    //         // setOrders(ordersFilter.data.data);
    //     };
    //     fetchOrders();
    // }, [monthYear]);
    return (
        <MainLayout>
            <InputMonthYear monthYear={monthYear} setMonthYear={setMonthYear} />
            {/* <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCustomer={filterCustomer}
                setFilterCustomer={setFilterCustomer}
                filterFlower={filterFlower}
                setFilterFlower={setFilterFlower}
                filterPayment={filterPayment}
                setFilterPayment={setFilterPayment}
                filterOrder={filterOrder}
                setFilterOrder={setFilterOrder}
            />
            <Chart monthYear={monthYear} orders={orders} />

            */}
            {filteredOrders.length > 0 ? (
                <OrderPagination filteredOrders={filteredOrders} itemsPerPage={10} />
            ) : (
                <h1 className="text-center text-2xl my-16">Data Pesanan Tidak Ditemukan</h1>
            )}
        </MainLayout>
    );
}

export default DashboardPage;
