import SmallButton from "@/components/atoms/SmallButton";
import { COLORS } from "@/constants/colorConstant";
import { badgeColorUser } from "@/utils/colors";
import { memo } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { RiFlowerLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = memo(function () {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleOrderClick = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        navigate("/orders");
    };
    const handleProfileClick = () => {
        navigate("/profile");
    };
    const handleCartClick = (e?: React.MouseEvent) => {
        e?.stopPropagation();
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

            <div onClick={handleProfileClick} className="flex gap-3 items-center cursor-pointer">
                <SmallButton
                    type="button"
                    colors={COLORS}
                    className="text-lg rounded-lg py-1"
                    onClick={handleOrderClick}
                >
                    Pesanan
                </SmallButton>
                <SmallButton
                    type="button"
                    colors={COLORS}
                    className="py-2 text-lg rounded-lg relative"
                    onClick={handleCartClick}
                >
                    <PiShoppingCartSimpleBold />
                    {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center font-nunito font-bold rounded-full">
                        {cartItems.length}
                    </span> */}
                </SmallButton>
                <div className="flex flex-col items-center">
                    <div className="text-lg font-nunito leading-none">{user.username}</div>
                    <div
                        className={`text-sm relative font-semibold capitalize tracking-wide px-3 rounded-lg bg-opacity-30 ${badgeColorUser(user.role)} `}
                    >
                        {user.role}
                    </div>
                </div>
                <FaRegUserCircle size={35} />
            </div>
        </nav>
    );
});

export default Navbar;
