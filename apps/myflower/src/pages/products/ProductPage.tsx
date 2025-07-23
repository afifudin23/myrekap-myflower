import ProductList from "@/components/organisms/products/ProductList";
// import ProductSearch from "@/components/organisms/products/ProductSearch";
import MainLayout from "@/components/templates/MainLayout";
import { useProducts } from "@/hooks";

function ProductsPage() {
    const { products } = useProducts();
    return (
        <MainLayout>
            <div className="flex flex-col gap-10">
                {/* <ProductSearch /> */}
                <ProductList products={products} />
            </div>
        </MainLayout>
    );
}

export default ProductsPage;
