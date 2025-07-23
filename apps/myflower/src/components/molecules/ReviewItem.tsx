import StarRating from "@/components/molecules/StarRating";

// interface ReviewItemProps {
//     id: string;
//     user: string;
//     rating: number;
//     comment: string;
// }

function ReviewItem({ id, user, rating, comment }: any) {
    return (
        <div key={id} className="bg-gray-50 p-4 space-y-1 rounded-md shadow-sm">
            <p className="font-semibold text-sm">{user?.fullName}</p>
            <StarRating value={rating} />
            <p className="text-sm text-gray-700">{comment}</p>
        </div>
    );
}

export default ReviewItem;
