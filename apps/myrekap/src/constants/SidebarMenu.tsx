import { BiBookAdd, BiSolidBookAdd } from "react-icons/bi";
import { HiHome, HiOutlineHome } from "react-icons/hi2";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa6";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { MdAdminPanelSettings, MdOutlineAdminPanelSettings } from "react-icons/md";

const sidebarMenu = [
    {
        name: "Beranda",
        path: "beranda",
        icons: { active: <HiHome />, inactive: <HiOutlineHome /> },
    },
    {
        name: "Input Order",
        path: "input-order",
        icons: { active: <BiSolidBookAdd />, inactive: <BiBookAdd /> },
    },
    {
        name: "Produk Saya",
        path: "products",
        icons: { active: <AiFillProduct />, inactive: <AiOutlineProduct /> },
    },
    {
        name: "Customer",
        path: "customers",
        icons: { active: <FaUserCircle />, inactive: <FaRegUserCircle /> },
    },
    {
        name: "Cetak Rekap",
        path: "order-summary/print",
        icons: { active: <FaFilePdf />, inactive: <FaRegFilePdf /> },
    },
    {
        name: "Admin",
        path: "administrator",
        icons: { active: <MdAdminPanelSettings />, inactive: <MdOutlineAdminPanelSettings /> },
    },
];

export default sidebarMenu;
