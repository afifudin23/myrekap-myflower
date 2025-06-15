import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import ProductDetailSection from "@/components/organisms/products/ProductDetailSection";
import ProductReviewSection from "@/components/organisms/products/ProductReviewSection";
import ReviewForm from "@/components/organisms/products/ReviewForm";
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
        setProduct(fakeData); // Ganti dengan fetch API real di production
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto p-4">
                <ProductDetailSection product={product} />
                <ReviewForm
                    onSubmit={(rating, comment) => {
                        console.log("Rating:", rating, "Komentar:", comment);
                    }}
                />
                <ProductReviewSection
                    averageRating={4.2}
                    reviews={[
                        { id: "1", user: "Budi", rating: 5, comment: "Produknya bagus banget!" },
                        { id: "2", user: "Sari", rating: 4, comment: "Sesuai deskripsi. Fast respon seller!" },
                    ]}
                />
            </div>
        </MainLayout>
    );
}

export default ProductDetailPage;
