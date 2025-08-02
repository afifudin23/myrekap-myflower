import { BiBookAdd, BiSolidBookAdd } from "react-icons/bi";
import { HiHome, HiOutlineHome } from "react-icons/hi2";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa6";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { MdAdminPanelSettings, MdOutlineAdminPanelSettings } from "react-icons/md";

export const SIDEBAR_ITEMS = [
    {
        label: "Dashboard",
        path: "dashboard",
        icons: { active: <HiHome />, inactive: <HiOutlineHome /> },
    },
    {
        label: "Penjualan",
        path: "orders",
        icons: { active: <BiSolidBookAdd />, inactive: <BiBookAdd /> },
    },
    {
        label: "Produk Saya",
        path: "products",
        icons: { active: <AiFillProduct />, inactive: <AiOutlineProduct /> },
    },
    {
        label: "Cetak Rekap",
        path: "reports",
        icons: { active: <FaFilePdf />, inactive: <FaRegFilePdf /> },
    },
    {
        label: "Admin",
        path: "users/admin",
        icons: { active: <MdAdminPanelSettings />, inactive: <MdOutlineAdminPanelSettings /> },
    },
    {
        label: "Customer",
        path: "users/customer",
        icons: { active: <FaUserCircle />, inactive: <FaRegUserCircle /> },
    },
];
