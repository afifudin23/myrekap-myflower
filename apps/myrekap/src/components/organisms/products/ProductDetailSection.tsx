// import Button from "@/components/atoms/Button";
import Image from "@/components/atoms/Image";
import SmallButton from "@/components/atoms/SmallButton";
import ProductInfo from "@/components/molecules/products/ProductInfo";
import { FaTrashCan } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface ProductDetailSectionProps {
    product: {
        id: string;
        name: string;
        image: string;
        price: number;
        stock: number;
        description?: string;
    };
}

const ProductDetailSection = ({ product }: ProductDetailSectionProps) => {
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        alert("Delete clicked");
    }
    return (
        <section className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
            <Image src={product.image} alt={product.name} className="w-full max-w-72" />
            <div className="flex flex-col gap-5 min-w-60">
                <ProductInfo product={product} />
                <div className="flex gap-2 flex-col md:flex-row font-semibold">
                    <SmallButton
                        className="bg-orange-400 hover:bg-orange-500 py-1 2xl:py-2 px-4"
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                    >
                        <RiEdit2Fill /> Edit
                    </SmallButton>
                    <SmallButton
                        className="bg-red-500 hover:bg-red-600 py-1 2xl:py-2 px-4"
                        onClick={handleDeleteClick}
                    >
                        <FaTrashCan /> Hapus
                    </SmallButton>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailSection;
