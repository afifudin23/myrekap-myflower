import ButtonSmall from "@/components/atoms/ButtonSmall";
import { badgeColorUser, BG_COLORS } from "@/constants/colors";
import { memo } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiFlowerLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = memo(function () {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleOrderClick = () => {
        navigate("/orders");
    };
    const handleProfileClick = () => {
        navigate("/profile");
    };
    const handleCartClick = () => {
        navigate("/carts");
    };
    return (
        <nav className="fixed top-0 left-0 h-20 z-20 shadow-md p-3 px-10 w-full flex justify-between bg-white items-center">
            <div className="flex items-center gap-5 justify-center">
                <h1 className="text-2xl 2xl:text-3xl font-bold">MyFlower</h1>
                <b className="flex items-center p-1 text-base gap-1 font-semibold 2xl:text-xl">
                    <RiFlowerLine className="shrink-0" />
                    <span className="line-clamp-1">Karangan Bunga Anda</span>
                </b>
            </div>

            <div className="flex gap-3 items-center cursor-pointer">
                <ButtonSmall
                    type="button"
                    className={`text-lg rounded-md px-4 py-1 ${BG_COLORS.primary}`}
                    onClick={handleOrderClick}
                >
                    Pesanan
                </ButtonSmall>
                <ButtonSmall
                    type="button"
                    className={`text-lg rounded-md px-4 py-2 ${BG_COLORS.primary}`}
                    onClick={handleCartClick}
                >
                    <HiOutlineShoppingCart size={20} />
                </ButtonSmall>
                <div className="flex gap-2 items-center" onClick={handleProfileClick}>
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-nunito leading-none">{user.username}</div>
                        <div
                            className={`text-sm relative font-semibold capitalize tracking-wide px-3 rounded-md bg-opacity-30 ${
                                badgeColorUser[user.role]
                            } `}
                        >
                            {user.role}
                        </div>
                    </div>
                    <FaRegUserCircle size={35} />
                </div>
            </div>
        </nav>
    );
});

export default Navbar;
