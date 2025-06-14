import { SidebarButton } from "@/components/molecules/SidebarButton";
import sidebarMenu from "@/constants/SidebarMenu";
import axiosInstance from "@/utils/axiosInstance";
import { removeUserCookies } from "@/utils/userCookies";
import { RiLogoutCircleFill, RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            axiosInstance.post("auth/logout");
            removeUserCookies();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <div className="min-h-full bg-white list-none border px-6 pt-3 text-xl 2xl:text-2xl font-fredoka">
            <nav className="flex flex-col 2xl:gap-8 mt-5 gap-5">
                {sidebarMenu.map((menu) => {
                    return <SidebarButton key={menu.path} name={menu.name} path={menu.path} icons={menu.icons} />;
                })}
            </nav>
            <Link
                to="/login"
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
