import { Badge, ButtonSmall } from "@/components/atoms";
import { badgeColorOrderStatus, badgeColorPaymentStatus, formatters } from "@/utils";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { HiPhoto } from "react-icons/hi2";
import { IoReceiptSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";

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
                    name: "Krans 2",
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

function OrderDetailSection() {
    const field = orders[0];
    return (
        <>
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <p className="font-semibold text-base 2xl:text-xl px-4 py-1 rounded-md text-slate-50 bg-slate-800 bg-opacity-40">
                        #{field.orderCode}
                    </p>
                    <div className="flex gap-2 text-sm">
                        <Badge
                            className={`${badgeColorPaymentStatus(
                                field.paymentStatus
                            )} text-sm text-white font-semibold`}
                            field={field.paymentStatus}
                            size="w-[90px]"
                        />
                        <Badge
                            className={`${badgeColorOrderStatus(field.orderStatus)} text-sm text-white font-semibold`}
                            field={field.orderStatus}
                            size="w-[90px]"
                        />
                        <Badge
                            className="bg-[#609393] text-sm text-white font-semibold"
                            field={field.customerCategory}
                            size="w-[90px]"
                        />
                    </div>
                </div>
                <div className="flex gap-2 text-sm items-center">
                    <p className="font-medium 2xl:font-semibold text-slate-500">
                        {formatters.dateToString(field.orderDate)}
                    </p>
                    <p className="px-2 py-1 rounded-md bg-purple-400 font-medium 2xl:font-semibold text-slate-100">
                        MyRekap
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
                <div className="mt-5 p-8 rounded-xl bg-blue-50 bg-opacity-80 space-y-3">
                    <div>
                        <h1 className="text-xl font-semibold 2xl:text-2xl">
                            {formatters.formatCapital(field.customerName)}{" "}
                            <span className="text-lg font-medium capitalize">(08975836972)</span>
                        </h1>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-lg font-semibold 2xl:text-xl">Produk Terjual</h1>
                        <ul className="text-sm 2xl:text-base space-y-1 w-full border-b-[1px] pb-5 border-slate-700">
                            {field.items.map((item: any, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <img
                                        src={item.product.images[0].secureUrl}
                                        alt={item.product.name}
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                    <div className="flex w-full justify-between">
                                        <div>
                                            <p>
                                                {item.product.name}{" "}
                                                <span className="text-xs font-medium">({item.quantity}x)</span>
                                            </p>
                                            <p>{item.greetingMessage}</p>
                                        </div>
                                        <p>{formatters.formatRupiah(item.totalPrice)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <li className="flex justify-between">
                            <p>Biaya Pengiriman</p>
                            <p>Rp 10.000</p>
                        </li>
                        <li className="flex justify-between">
                            <p>Total Pembayaran</p>
                            <p>Rp 100.000</p>
                        </li>
                    </div>
                </div>
                <div className="mt-5 p-8 rounded-xl bg-blue-50 bg-opacity-80">
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Detail Pembayaran</h1>
                        <p>
                            Metode Pembayaran : <span className="font-medium">{formatters.formatCapital(field.paymentMethod)}</span>
                        </p>
                        <p>
                            Provider : <span className="font-medium">{formatters.formatCapital(field.paymentProvider)}</span>
                        </p>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Detail Pengiriman</h1>
                        <p>
                            Opsi Pengiriman : <span className="font-medium">{formatters.formatCapital(field.deliveryOption)}</span>
                        </p>
                        <p>
                            Alamat Pengiriman :{" "}
                            <span className="font-medium">Jl. Gatot Subroto Gg.4 Rt4/Rw9 Kel. Kejambon</span>
                        </p>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold 2xl:text-xl">Waktu</h1>
                        <p>
                            Tanggal Siap :{" "}
                            <span className="font-medium">{formatters.isoDateToStringDateTime(field.readyDate)}</span>
                        </p>
                        <p>
                            Tanggal Pengiriman :{" "}
                            <span className="font-medium">
                                {formatters.isoDateToStringDateTime(field.deliveryDate)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-start mt-5 gap-4">
                    <ButtonSmall
                        className="bg-orange-400 hover:bg-orange-500 px-5 py-1 2xl:py-2 font-semibold"
                        // onClick={() => navigate(`/order-summary/edit/${field.id}`)}
                    >
                        <RiEdit2Fill />
                        Edit
                    </ButtonSmall>
                    <ButtonSmall
                        className="bg-blue-600 hover:bg-blue-700 py-1 2xl:py-2 px-4 font-semibold"
                        // onClick={() => setIsOpenFinishedProduct(!isOpenFinishedProduct)}
                    >
                        <HiPhoto /> Produk
                    </ButtonSmall>

                    <ButtonSmall className="bg-cyan-500 hover:bg-cyan-600 py-1 2xl:py-2 px-4 font-semibold">
                        {/* <PDFDownloadLink
                            document={<Receipt data={field} />}
                            fileName={`receipt-order-${field.orderCode}.pdf`}
                            className="flex items-center justify-center gap-1"
                        > */}
                            <IoReceiptSharp /> Kwitansi
                        {/* </PDFDownloadLink> */}
                    </ButtonSmall>

                    {/* <InputDropdown
                        label="Status Pesanan"
                        name="orderStatus"
                        control={control}
                        formInput={false}
                        width="w-52"
                        className="py-1 2xl:py-2 px-4 text-base 2xl:text-xl"
                        options={DataOrderStatus.filter((item) => item !== "Semua")}
                    /> */}
                </div>
        </>
    );
}

export default OrderDetailSection;
