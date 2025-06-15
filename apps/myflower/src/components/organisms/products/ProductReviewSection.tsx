// src/components/organisms/products/ProductReviewSection.tsx
import { AiFillStar } from "react-icons/ai";

interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
}

interface ProductReviewSectionProps {
    averageRating: number;
    reviews: Review[];
}

const ProductReviewSection = ({ averageRating, reviews }: ProductReviewSectionProps) => {
    return (
        <section className="mt-10 space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Ulasan Produk</h2>
                
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <AiFillStar
                                key={i}
                                className={i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}
                            />
                        ))}
                    </span>
                    <span className="text-gray-600 text-sm">
                        {averageRating.toFixed(1)} dari 5 ({reviews.length} ulasan)
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p className="text-sm text-gray-500">Belum ada ulasan.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                            <p className="font-semibold text-sm">{review.user}</p>
                            <div className="flex items-center text-yellow-500 text-sm mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <AiFillStar
                                        key={i}
                                        className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-700">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductReviewSection;
