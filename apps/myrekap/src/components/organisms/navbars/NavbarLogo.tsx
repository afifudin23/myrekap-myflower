import { RiFlowerLine } from "react-icons/ri";

function NavbarLogo() {
    return (
        <div className="flex items-center gap-5 justify-center">
            <h1 className="text-2xl 2xl:text-3xl font-bold">MyRekap</h1>
            <b className="flex items-center text-sm gap-1 font-semibold 2xl:text-xl">
                <RiFlowerLine />
                <span>Karangan Bunga Anda</span>
            </b>
        </div>
    );
}

export default NavbarLogo;
