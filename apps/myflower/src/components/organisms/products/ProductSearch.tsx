import SmallButton from "@/components/atoms/SmallButton";
import { COLORS } from "@/constants/colorConstant";
import { IoFilterSharp } from "react-icons/io5";

const ProductSearch = () => {
    return (
        <div className="w-9/12 mx-auto items-center">
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Cari berdasarkan invoice, nama, harga, alamat pengiriman..."
                    className="border border-gray-300 px-5 py-1 rounded-lg text-base w-full 2xl:py-2"
                />
                <SmallButton
                    className={`text-white py-1 px-1 rounded-lg transition gap-2`}
                    bolder="font-medium"
                    colors={COLORS}
                >
                    <IoFilterSharp />
                </SmallButton>
            </div>
        </div>
    );
};

export default ProductSearch;
