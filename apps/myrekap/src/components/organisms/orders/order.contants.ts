import { CUSTOMER_CATEGORY_ITEMS, PAYMENT_METHOD_ITEMS } from "@/constants/category";

export const ORDER_FORM_ITEMS = [
    {
        label: "Nama Customer",
        type: "text",
        name: "customerName",
    },
    {
        label: "Kategori Bunga",
        type: "text",
        name: "flowerCategory",
    },
    {
        label: "Jumlah Pesan",
        type: "text",
        name: "quantity",
    },
    {
        label: "Pesan Ucapan",
        type: "text",
        name: "greetingMessage",
    },
    {
        label: "Tanggal Pengiriman",
        type: "date",
        name: "deliveryDate",
    },
    {
        label: "Alamat Pengiriman",
        type: "text",
        name: "deliveryAddress",
    },
    {
        label: "Kategori Customer",
        type: "dropdown",
        name: "customerCategory",
        options: CUSTOMER_CATEGORY_ITEMS.filter((item) => item !== "Semua"),
    },
    {
        label: "Harga",
        type: "money",
        name: "price",
    },
    {
        label: "Biaya Pengiriman",
        type: "money",
        name: "shippingCost",
    },
    {
        label: "Status Pembayaran",
        type: "checkbox",
        name: "isPaid",
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
