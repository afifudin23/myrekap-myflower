// molecules/RatingSelector.tsx
import { AiFillStar } from "react-icons/ai";

interface RatingSelectorProps {
    rating: number;
    onSelect: (value: number) => void;
}

const RatingSelector = ({ rating, onSelect }: RatingSelectorProps) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button" onClick={() => onSelect(value)}>
                <AiFillStar className={value <= rating ? "text-yellow-400" : "text-gray-300"} size={24} />
            </button>
        ))}
    </div>
);

export default RatingSelector;
