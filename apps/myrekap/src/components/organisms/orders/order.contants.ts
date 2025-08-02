import {
    CUSTOMER_CATEGORY_ITEMS,
    CUSTOMER_CATEGORY_LABELS,
    DELIVERY_OPTION_ITEMS,
    DELIVERY_OPTION_LABELS,
    PAYMENT_METHOD_ITEMS,
    PAYMENT_METHOD_LABELS,
} from "@/constants/category";

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
        options: CUSTOMER_CATEGORY_ITEMS.filter((item) => item.label !== "Semua"),
        optionLabel: CUSTOMER_CATEGORY_LABELS,
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
        options: DELIVERY_OPTION_ITEMS.filter((item) => item.label !== "Semua"),
        optionLabel: DELIVERY_OPTION_LABELS,
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
        options: PAYMENT_METHOD_ITEMS.filter((item) => ["BANK_TRANSFER", "CASH"].includes(item.value)),
        optionLabel: PAYMENT_METHOD_LABELS,
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
