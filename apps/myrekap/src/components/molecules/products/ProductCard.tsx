import Card from "@/components/atoms/Card";
import Image from "@/components/atoms/Image";

interface Product {
    id: string;
    image: string;
    stock: number;
    name: string;
    price: number;
}

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="group flex flex-col gap-3 cursor-default">
            <div className="overflow-hidden rounded-xl group">
                <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full transition-all duration-300 ease-in-out group-hover:scale-110"
                />
            </div>
            <div className="flex justify-between items-end gap-2">
                <div className="font-semibold">
                    <p className="text-slate-500">STOK: {product.stock}</p>
                    <h3 className="text-base line-clamp-1">{product.name}</h3>
                    <p>Rp. {product.price.toLocaleString()}</p>
                </div>
            </div>
        </Card>
    );
}

export default ProductCard;
