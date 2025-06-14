import { memo } from "react";
import { RiFlowerLine } from "react-icons/ri";

const Navbar = memo(function () {

    return (
        <nav className="p-3 px-10 w-full flex justify-between bg-white items-center">
            <div className="flex items-center gap-5 justify-center">
                <h1 className="text-2xl 2xl:text-3xl font-bold">MyRekap</h1>
                <b className="flex items-center text-sm gap-1 font-semibold 2xl:text-xl">
                    <RiFlowerLine />
                    <span>Karangan Bunga Anda</span>
                </b>
            </div>

            <div className=" flex gap-1 items-center cursor-default">
                <div className="flex flex-col items-center">
                    <div className="text-lg font-nunito leading-none">zhanka</div>
                    {/* <div
                        className={`text-sm relative font-semibold capitalize tracking-wide px-3 rounded-lg bg-opacity-40 ${
                            role === "ADMIN" ? "text-blue-600 bg-blue-300" : "text-yellow-700 bg-yellow-400"
                        }`}
                    >
                        {role}
                    </div> */}
                </div>
                <img src="/assets/images/profile.jpg" alt="Profile" className="w-14 h-14 rounded-full" />
            </div>
        </nav>
    );
});

export default Navbar;
