import Card from "@/components/atoms/Card";
import ProductImage from "@/components/atoms/products/ProductImage";
import SmallButton from "@/components/atoms/SmallButton";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }: any) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };
    const handleAddToCart = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        console.log(123);
    };
    return (
        <Card className="group flex flex-col gap-3 cursor-default" onClick={handleCardClick}>
            <ProductImage src={product.image} alt={product.name} />
            <div className="flex justify-between items-end gap-2">
                <div className="font-semibold">
                    <p className="text-slate-500">STOK: {product.stock}</p>
                    <h3 className="text-base line-clamp-1">{product.name}</h3>
                    <p>Rp {product.price.toLocaleString()}</p>
                </div>
                <div>
                    <SmallButton
                        type="button"
                        colors={{ primary: "#8f40f6", hover: "#773dc4" }}
                        onClick={handleAddToCart}
                    >
                        <PiShoppingCartSimpleBold />
                    </SmallButton>
                </div>
            </div>
        </Card>
    );
}

export default ProductCard;
