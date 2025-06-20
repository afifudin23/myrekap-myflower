import ProductCard from "@/components/molecules/products/ProductCard";
import { Link, useNavigate } from "react-router-dom";

interface Product {
    id: string;
    image: string;
    stock: number;
    name: string;
    price: number;
}

interface ProductListProps {
    products: Product[];
}
function ProductList({ products }: ProductListProps) {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
                <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    onClick={() => navigate(`/products/${product.id}`)}
                >
                    <ProductCard key={product.id} product={product} />
                </Link>
            ))}
        </div>
    );
}

export default ProductList;
