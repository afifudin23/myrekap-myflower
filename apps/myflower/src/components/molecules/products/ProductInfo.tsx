import SectionTitle from "@/components/atoms/SectionTitle";

// interface Product {
//     name: string;
//     price: number;
//     stock: number;
//     description?: string;
// }
// interface ProductInfoProps {
//     product: Product;
// }

const ProductInfo = ({ product }: any) => {
    return (
        <div className="space-y-2">
            <SectionTitle className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</SectionTitle>
            <p className="text-xl font-semibold text-purple-700">Rp {product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Stok tersedia: {product.stock}</p>
            {product.description && (
                <>
                    <p className="text-lg font-semibold text-gray-800">Deskripsi produk :</p>
                    <p className="text-gray-700 mt-4 text-justify">{product.description}</p>
                </>
            )}
        </div>
    );
};

export default ProductInfo;
