import StarRating from "@/components/molecules/StarRating";

interface ReviewItemProps {
    id: string;
    user: string;
    rating: number;
    comment: string;
}

function ReviewItem({ id, user, rating, comment }: ReviewItemProps) {
    return (
        <div key={id} className="bg-gray-50 p-4 rounded-md shadow-sm">
            <p className="font-semibold text-sm">{user}</p>
            <StarRating value={rating} />
            <p className="text-sm text-gray-700">{comment}</p>
        </div>
    );
}

export default ReviewItem;
