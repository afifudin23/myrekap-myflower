import Button from "@/components/atoms/Button";
import Image from "@/components/atoms/Image";
import ProductInfo from "@/components/molecules/products/ProductInfo";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

// interface ProductDetailSectionProps {
//     product: {
//         name: string;
//         image: string;
//         price: number;
//         stock: number;
//         description?: string;
//     };
// }

const ProductDetailSection = ({ product }: any) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
            <Image src={product.images?.[0]?.secureUrl} alt={product.name} className="w-80 h-80" />
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
