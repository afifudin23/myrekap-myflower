import { memo } from "react";
import { RiFlowerLine } from "react-icons/ri";

const Navbar = memo(function () {
    return (
        <nav className="fixed top-0 left-0 z-20 shadow-md p-3 px-10 w-full flex justify-between bg-white items-center">
            <div className="flex items-center gap-5 justify-center">
                <h1 className="text-2xl 2xl:text-3xl font-bold">MyFlower</h1>
                <b className="flex items-center text-sm gap-1 font-semibold 2xl:text-xl">
                    <RiFlowerLine />
                    <span>Karangan Bunga Anda</span>
                </b>
            </div>

            <div className=" flex gap-1 items-center cursor-default">
                <div className="flex flex-col items-center">
                    <div className="text-lg font-nunito leading-none">zhanka</div>
                    <div
                        className={`text-sm relative font-semibold capitalize tracking-wide px-3 rounded-lg bg-opacity-30  text-[#8a50db] bg-[#aa71ef] `}
                    >
                        CUSTOMER
                    </div>
                </div>
                <img src="/assets/images/profile.jpg" alt="Profile" className="w-14 h-14 rounded-full" />
            </div>
        </nav>
    );
});

export default Navbar;
