import { CUSTOMER_CATEGORY_ITEMS, CUSTOMER_CATEGORY_LABELS } from "@/constants/category";

export const LOGIN_FIELDS = [
    {
        name: "username",
        placeholder: "Input Username",
        type: "text",
    },
    {
        name: "password",
        placeholder: "Input Password",
        type: "password",
    },
];

export const REGISTER_FIELDS = [
    {
        name: "fullName",
        placeholder: "Input Nama Lengkap",
        type: "text",
    },
    {
        name: "username",
        placeholder: "Input Username",
        type: "text",
    },
    {
        name: "email",
        placeholder: "Input Email",
        type: "email",
    },
    {
        name: "phoneNumber",
        placeholder: "Input Nomor Telepon",
        type: "text",
    },
    {
        name: "customerCategory",
        placeholder: "Input Kategori Pelanggan",
        type: "dropdown",
        options: CUSTOMER_CATEGORY_ITEMS.filter((item) => ["UMUM", "PEMDA"].includes(item)),
        optionLabel: CUSTOMER_CATEGORY_LABELS,
    },
    {
        name: "password",
        placeholder: "Input Password",
        type: "password",
    },
    {
        name: "confPassword",
        placeholder: "Konfirmasi Password",
        type: "password",
    },
];


export const FORGOT_PASSWORD_FIELDS = [{ name: "email", placeholder: "Input Email", type: "email" }];

export const RESET_PASSWORD_FIELDS = [
    { name: "password", placeholder: "Input Password", type: "password" },
    { name: "confPassword", placeholder: "Input Konfirmasi Password", type: "password" },
];
