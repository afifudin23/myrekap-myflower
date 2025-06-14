import {
    DataCustomerCategory,
    DataFlowerCategory,
    DataOrderStatus,
    DataPaymentMethod,
    DataPaymentStatus,
} from "@/constants/DataCategory";

export const InputCetakRekap = [
    {
        label: "Kategori Bunga",
        name: "flowerCategory",
        options: DataFlowerCategory,
    },
    {
        label: "Kategori Customer",
        name: "customerCategory",
        options: DataCustomerCategory,
    },
    {
        label: "Metode Pembayaran",
        name: "paymentMethod",
        options: DataPaymentMethod,
    },
    {
        label: "Status Pembayaran",
        name: "paymentStatus",
        options: DataPaymentStatus,
    },
    {
        label: "Status Pesanan",
        name: "orderStatus",
        options: DataOrderStatus,
    },
];

export const defaultValueCetakRekap = {
    flowerCategory: "Semua",
    customerCategory: "Semua",
    paymentMethod: "Semua",
    paymentStatus: "Semua",
    orderStatus: "Semua",
};
