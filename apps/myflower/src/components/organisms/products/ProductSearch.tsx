import ButtonSmall from "@/components/atoms/ButtonSmall";
import { BG_COLORS } from "@/constants/colors";
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
                <ButtonSmall
                    className={`text-white py-1 px-1 rounded-lg transitiontext-sm 2xl:text-base ${BG_COLORS.primary}`}
                >
                    <IoFilterSharp />
                </ButtonSmall>
            </div>
        </div>
    );
};

export default ProductSearch;
