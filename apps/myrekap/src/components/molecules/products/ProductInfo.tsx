import { formatters } from "@/utils";

interface Product {
    name: string;
    price: number;
    stock: number;
    description?: string;
}
interface ProductInfoProps {
    product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    const { name, price, stock, description } = product;
    return (
        <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h1>
            <p className="text-xl font-semibold text-purple-700">{formatters.formatRupiah(price)}</p>
            <p className="text-sm text-gray-500">Stok tersedia: {stock}</p>
            {description && (
                <>
                    <p className="text-lg font-semibold text-gray-800">Deskripsi produk :</p>
                    <p className="text-gray-700 mt-4 text-justify">
                        {description}
                    </p>
                </>
            )}
        </div>
    );
};

export default ProductInfo;
