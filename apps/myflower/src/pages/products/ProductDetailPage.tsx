import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import ProductDetailSection from "@/components/organisms/products/ProductDetailSection";
import ProductReviewSection from "@/components/organisms/products/ProductReviewSection";
import ReviewForm from "@/components/organisms/products/ReviewForm";
import BackButton from "@/components/atoms/BackButton";
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
                <BackButton className="mb-5">Kembali ke Produk</BackButton>
                <div className="max-w-4xl space-y-10 mx-auto">
                    <ProductDetailSection product={product} />
                    <ReviewForm
                        onSubmit={(rating, comment, productId) => {
                            console.log("Rating:", rating, "Komentar:", comment);
                            console.log(productId);
                        }}
                    />
                    <ProductReviewSection
                        reviews={[
                            { id: "1", user: "Budi", rating: 5, comment: "Produknya bagus banget!" },
                            { id: "2", user: "Sari", rating: 4, comment: "Sesuai deskripsi. Fast respon seller!" },
                            { id: "3", user: "Sari", rating: 3, comment: "Sesuai deskripsi. Fast respon seller!" },
                            { id: "4", user: "Sari", rating: 1, comment: "Sesuai deskripsi. Fast respon seller!" },
                            { id: "5", user: "Sari", rating: 4, comment: "Sesuai deskripsi. Fast respon seller!" },
                        ]}
                    />
                </div>
        </MainLayout>
    );
}

export default ProductDetailPage;
