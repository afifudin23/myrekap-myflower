// src/components/organisms/products/ProductReviewSection.tsx
import SectionTitle from "@/components/atoms/SectionTitle";
import ReviewItem from "@/components/molecules/ReviewItem";
import StarRating from "@/components/molecules/StarRating";

// interface Review {
//     id: string;
//     user: string;
//     rating: number;
//     comment: string;
// }

// interface ProductReviewSectionProps {
//     reviews: Review[];
// }

const ProductReviewSection = ({ reviews }: any) => {
    const averageRating = reviews.length > 0 ? reviews.reduce((total: number, review: any) => total + review.rating, 0) / reviews.length : 0;
    return (
        <section className="space-y-6">
            <div>
                <SectionTitle>Ulasan Produk</SectionTitle>

                <div className="flex items-center gap-2 mt-2">
                    <StarRating value={averageRating} />
                    <span className="text-gray-600 text-sm">
                        {averageRating.toFixed(1)} dari 5 ({reviews.length} ulasan)
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p className="text-base text-gray-700">Belum ada ulasan.</p>
                ) : (
                    reviews.map((review: any) => (
                        <ReviewItem
                            key={review.id}
                            id={review.id}
                            user={review.user}
                            rating={review.rating}
                            comment={review.comment}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductReviewSection;
