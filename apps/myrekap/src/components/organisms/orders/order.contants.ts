import { CUSTOMER_CATEGORY_ITEMS, DELIVERY_OPTION_ITEMS, PAYMENT_METHOD_ITEMS } from "@/constants/category";

export const ORDER_FORM_ITEMS = [
    {
        label: "Nama Pelanggan",
        type: "text",
        name: "customerName",
    },
    {
        label: "Kategori Pelanggan",
        type: "dropdown",
        name: "customerCategory",
        options: CUSTOMER_CATEGORY_ITEMS.filter((item) => item !== "Semua"),
    },
    {
        label: "Nomor Telepon",
        type: "text",
        name: "phoneNumber",
    },
    {
        label: "Produk Item",
        type: "product",
        name: "items",
    },
    {
        label: "Opsi Pengiriman",
        type: "dropdown",
        name: "deliveryOption",
        options: DELIVERY_OPTION_ITEMS.filter((item) => item !== "Semua"),
    },
    {
        label: "Alamat Pengiriman",
        type: "text",
        name: "deliveryAddress",
    },
    {
        label: "Tanggal Produk Jadi",
        type: "date",
        name: "readyDate",
    },
    {
        label: "Metode Pembayaran",
        type: "dropdown",
        name: "paymentMethod",
        options: PAYMENT_METHOD_ITEMS.filter((item) => item !== "Semua"),
    },
    {
        label: "Bukti Pembayaran",
        type: "file",
        name: "paymentProof",
    },
];

export const defaultValuesAddOrderSummary = {
    customerName: "",
    flowerCategory: "",
    quantity: 1,
    greetingMessage: "",
    deliveryDate: new Date(),
    deliveryAddress: "",
    customerCategory: "",
    price: 10000,
    shippingCost: 10000,
    isPaid: false,
    paymentMethod: "Pending",
    paymentProof: null,
};
