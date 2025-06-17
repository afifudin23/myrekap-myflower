import StarIcon from "@/components/atoms/StarIcon";

function StarRating({ value }: { value: number }) {
    return (
        <span className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < Math.floor(value)} />
            ))}
        </span>
    );
}

export default StarRating;
