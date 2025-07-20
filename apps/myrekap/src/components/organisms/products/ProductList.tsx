import { ProductCard } from "@/components/molecules";
import { Link } from "react-router-dom";

// interface Product {
//     id: string;
//     image: string;
//     stock: number;
//     name: string;
//     price: number;
// }

// interface ProductListProps {
//     products: Product[];
// }

function ProductList({ products }: any) {
    const handleClick = (product: any) => {
        localStorage.setItem("productDetail", JSON.stringify(product));
    };
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product: any) => (
                <Link key={product.id} to={`/products/${product.id}`} onClick={() => handleClick(product)}>
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    );
}

export default ProductList;
