import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import ProductDetailSection from "@/components/organisms/products/ProductDetailSection";
import ProductReviewSection from "@/components/organisms/products/ProductReviewSection";
import ReviewForm from "@/components/organisms/products/ReviewForm";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"
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
            <div className="grid grid-cols-5">
                <Link to="/products" className="text-slate-600 col-span-1">
                    <IoArrowBack size={70} />
                </Link>
                <div className="max-w-4xl space-y-10 col-span-4">
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
            </div>
        </MainLayout>
    );
}

export default ProductDetailPage;
