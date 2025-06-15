// molecules/ReviewForm.tsx
import { useState } from "react";
import TextArea from "@/components/atoms/TextArea";
import RatingSelector from "@/components/molecules/RatingSelector";
import Button from "@/components/atoms/Button";

interface ReviewFormProps {
    onSubmit: (rating: number, comment: string) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (rating > 0 && comment.trim()) {
            onSubmit(rating, comment.trim());
            setRating(0);
            setComment("");
        } else {
            alert("Tolong isi rating dan komentar.");
        }
    };

    return (
        <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold">Beri Ulasan</h3>
            <RatingSelector rating={rating} onSelect={setRating} />
            <TextArea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tulis ulasan Anda..." />
            <Button
                type="button"
                colors={{ primary: "#8f40f6", hover: "#773dc4" }}
                onClick={handleSubmit}
                className="w-[10rem] p-1"
            >
                Kirim Ulasan
            </Button>
        </div>
    );
};

export default ReviewForm;
