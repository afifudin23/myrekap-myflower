import Button from "@/components/atoms/Button";
import ProductImage from "@/components/atoms/products/ProductImage";
import ProductInfo from "@/components/molecules/products/ProductInfo";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

interface ProductDetailSectionProps {
    product: {
        name: string;
        image: string;
        price: number;
        stock: number;
        description?: string;
    };
}

const ProductDetailSection = ({ product }: ProductDetailSectionProps) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="group">
                <ProductImage src={product.image} alt={product.name} />
            </div>
            <div className="flex flex-col gap-5">
                <ProductInfo product={product} />
                <Button type="button" colors={{ primary: "#8f40f6", hover: "#773dc4" }} className="w-[15rem] p-1">
                    <PiShoppingCartSimpleBold />
                    Tambah Keranjang
                </Button>
            </div>
        </section>
    );
};

export default ProductDetailSection;
