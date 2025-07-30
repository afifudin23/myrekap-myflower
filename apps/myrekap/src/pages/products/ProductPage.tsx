import { ButtonSmall } from "@/components/atoms";
import { AlertInfo, TitlePage } from "@/components/molecules";
import { ProductList } from "@/components/organisms/products";
import MainLayout from "@/components/templates/MainLayout";
import { useProducts } from "@/hooks";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MdAddToPhotos } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function ProductPage() {
    const { products } = useProducts();
    const location = useLocation();
    const [message, setMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        const state = location.state as { message?: string };
        if (state?.message) {
            setMessage(state.message);
            setShowAlert(true);

            const timer = setTimeout(() => {
                setShowAlert(false);
                window.history.replaceState({}, document.title);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [location.key]);

    return (
        <MainLayout>
            <TitlePage title="Produk Saya" subtitle="Mengelola Data Produk Penjualan" />
            <Link to="/products/create" className="inline-block">
                <ButtonSmall className="bg-[#4fcd53] hover:bg-[#42b146] py-1 2xl:py-2 px-4 font-bold mb-8">
                    <MdAddToPhotos /> Tambah
                </ButtonSmall>
            </Link>

            {/* Product List */}
            {products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p className="text-center text-gray-500 text-3xl mt-40">Tidak ada produk</p>
            )}

            {/* Alert */}
            <AnimatePresence>
                {showAlert && message && <AlertInfo message={message} handleAlert={() => setShowAlert(false)} />}
            </AnimatePresence>
        </MainLayout>
    );
}

export default ProductPage;
