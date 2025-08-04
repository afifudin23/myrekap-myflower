import SmallButton from "@/components/atoms/SmallButton";
import { COLORS } from "@/constants/colors";
import { IoFilterSharp } from "react-icons/io5";

const ProductSearch = () => {
    return (
        <div className="w-9/12 mx-auto items-center">
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Cari berdasarkan nama produk dan deskripsi..."
                    className="border border-gray-300 px-5 py-1 rounded-lg text-base w-full 2xl:py-2"
                />
                <SmallButton
                    className={`text-white py-1 px-1 rounded-lg transitiontext-sm 2xl:text-base`}
                    colors={COLORS}
                >
                    <IoFilterSharp />
                </SmallButton>
            </div>
        </div>
    );
};

export default ProductSearch;
