import ProductCard from "@/components/molecules/products/ProductCard";
import { axiosInstance } from "@/utils";
import { useNavigate } from "react-router-dom";

// interface Product {
//     id: string;
//     name: string;
//     images: any[];
//     price: number;
//     stock: number;
// }

// interface ProductListProps {
//     products: Product[];
// }
function ProductList({ products }: any) {
    const navigate = useNavigate();
    const handleClick = (product: any) => {
        localStorage.setItem("productDetail", JSON.stringify(product));
        navigate(`/products/${product.id}`);
    };
    const handleAddToCart = async (productId: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        console.log(productId);
        try {
            await axiosInstance.post("/carts", { productId });
            alert("Produk berhasil ditambahkan ke keranjang.");
        } catch (error) {
            alert("Produk gagal ditambahkan ke keranjang.");
        }
    };
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product: any) => (
                <div className="cursor-pointer" key={product.id} onClick={() => handleClick(product)}>
                    <ProductCard
                        product={product}
                        handleAddToCart={(e: React.MouseEvent) => handleAddToCart(product.id, e)}
                    />
                </div>
            ))}
        </div>
    );
}

export default ProductList;
