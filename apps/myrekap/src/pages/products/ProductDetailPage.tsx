import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import ProductDetailSection from "@/components/organisms/products/ProductDetailSection";
import Title from "@/components/molecules/Title";

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
}

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Simulasi fetch data
        const fakeData: Product = {
            id: "1",
            name: "Bunga Mawar Merah",
            description: "Bunga mawar merah segar dan harum untuk berbagai momen spesial.",
            image: "/assets/images/test.jpg",
            price: 50000,
            stock: 10,
        };
        setProduct(fakeData);
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <MainLayout>
            <Title title="Detail Produk" subtitle="Mengelola Data Produk Penjualan" />
            <div className="space-y-10 w-full ">
                <ProductDetailSection product={product} />
            </div>
        </MainLayout>
    );
}

export default ProductDetailPage;
