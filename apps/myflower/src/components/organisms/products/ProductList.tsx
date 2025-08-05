import ProductCard from "@/components/molecules/products/ProductCard";
import { axiosInstance } from "@/utils";
import { useNavigate } from "react-router-dom";

function ProductList({ products }: any) {
    const navigate = useNavigate();
    const handleClick = (product: any) => {
        console.log(product)
        localStorage.setItem("productDetail", JSON.stringify(product));
        navigate(`/products/${product.id}`);
    };
    const handleAddToCart = async (productId: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
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
                <ProductCard
                    key={product.id}
                    product={product}
                    handleClick={() => handleClick(product)}
                    handleAddToCart={(e: React.MouseEvent) => handleAddToCart(product.id, e)}
                />
            ))}
        </div>
    );
}

export default ProductList;
