import ProductCard from "@/components/molecules/ProductCard";

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface ProductListProps {
    products: Product[];
}
function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
