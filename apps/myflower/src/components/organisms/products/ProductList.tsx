import ProductCard from "@/components/molecules/products/ProductCard";

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
}

interface ProductListProps {
    products: Product[];
}
function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
