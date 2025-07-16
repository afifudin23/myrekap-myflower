import { ButtonSmall } from "@/components/atoms";
import { TitlePage } from "@/components/molecules";
import { ProductList } from "@/components/organisms/products";
import MainLayout from "@/components/templates/MainLayout";
import { useProducts } from "@/hooks";
import { MdAddToPhotos } from "react-icons/md";
import { Link } from "react-router-dom";

function ProductPage() {
    const { products } = useProducts();
    return (
        <MainLayout>
            <TitlePage title="Produk Saya" subtitle="Mengelola Data Produk Penjualan" />
            <Link to="/products/create" className="inline-block">
                <ButtonSmall className="bg-[#4fcd53] hover:bg-[#42b146] py-1 2xl:py-2 px-4 font-bold mb-8">
                    <MdAddToPhotos /> Tambah
                </ButtonSmall>
            </Link>
            <ProductList products={products} />
        </MainLayout>
    );
}

export default ProductPage;
