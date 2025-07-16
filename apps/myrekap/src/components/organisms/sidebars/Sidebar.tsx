import axiosInstance from "@/utils/axiosInstance";
import { RiLogoutCircleFill, RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SIDEBAR_ITEMS } from ".";
import { removeOrderCookies, removeUserCookies, removeUserDetailCookies } from "@/utils";
import { SidebarMenuItem } from "@/components/organisms/sidebars/SidebarMenuItem";

const Sidebar = () => {
    const handleLogout = async () => {
        try {
            removeOrderCookies();
            removeUserDetailCookies();
            removeUserCookies();
            await axiosInstance.post("auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <div className="min-h-full bg-white list-none border px-6 pt-3 text-xl 2xl:text-2xl font-fredoka">
            <nav className="flex flex-col 2xl:gap-8 mt-5 gap-5">
                {SIDEBAR_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.path} name={item.label} path={item.path} icons={item.icons} />
                ))}
            </nav>
            <Link
                to="/auth/login"
                onClick={handleLogout}
                className="flex gap-2 mt-7 ml-4 cursor-pointer items-center group"
            >
                <RiLogoutCircleLine className="transition duration-150 ease-in-out opacity-100 group-hover:opacity-0" />
                <RiLogoutCircleFill className="absolute transition duration-150 ease-in-out opacity-0 group-hover:opacity-100" />
                <div>Logout</div>
            </Link>
        </div>
    );
};

export default Sidebar;
