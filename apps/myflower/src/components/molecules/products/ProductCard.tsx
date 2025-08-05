import Card from "@/components/atoms/Card";
import Image from "@/components/atoms/Image";
import ButtonSmall from "@/components/atoms/ButtonSmall";
import { BG_COLORS } from "@/constants/colors";
import { HiOutlineShoppingCart } from "react-icons/hi";

function ProductCard({ product, handleClick, handleAddToCart }: any) {
    return (
        <Card className="group flex flex-col gap-3 cursor-pointer" onClick={handleClick}>
            <div className="overflow-hidden rounded-xl group">
                <Image
                    src={product.images[0].secureUrl}
                    alt={product.name}
                    className="w-full transition-all duration-300 ease-in-out group-hover:scale-110"
                />
            </div>
            <div className="flex justify-between items-end gap-2">
                <div className="font-semibold">
                    <p className="text-slate-500">STOK: {product.stock}</p>
                    <h3 className="text-base line-clamp-1">{product.name}</h3>
                    <p>Rp {product.price.toLocaleString()}</p>
                </div>
                <div>
                    <ButtonSmall
                        type="button"
                        className={`${BG_COLORS.primary} py-2 px-4 font-semibold rounded-md`}
                        onClick={handleAddToCart}
                    >
                        <HiOutlineShoppingCart size={20} />
                    </ButtonSmall>
                </div>
            </div>
        </Card>
    );
}

export default ProductCard;
