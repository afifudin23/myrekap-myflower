import { BiBookAdd, BiSolidBookAdd } from "react-icons/bi";
import { HiHome, HiOutlineHome } from "react-icons/hi2";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa6";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";

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
        name: "Cetak Rekap",
        path: "order-summary/print",
        icons: { active: <FaFilePdf />, inactive: <FaRegFilePdf /> },
    },
    {
        name: "Administrator",
        path: "administrator",
        icons: { active: <FaUserCircle />, inactive: <FaRegUserCircle /> },
    },
];

export default sidebarMenu;
