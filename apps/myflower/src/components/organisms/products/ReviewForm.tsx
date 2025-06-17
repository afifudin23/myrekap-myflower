// molecules/ReviewForm.tsx
import { useState } from "react";
import TextArea from "@/components/atoms/TextArea";
import RatingSelector from "@/components/molecules/RatingSelector";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";

interface ReviewFormProps {
    onSubmit: (rating: number, comment: string, productId: number) => void;
    className?: string;
}

const ReviewForm = ({ onSubmit, className }: ReviewFormProps) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (rating > 0 && comment.trim()) {
            onSubmit(rating, comment.trim(), 123);
            setRating(0);
            setComment("");
        } else {
            alert("Tolong isi rating dan komentar.");
        }
    };

    return (
        <section className={`space-y-3 ${className}`}>
            <SectionTitle>Beri Ulasan</SectionTitle>
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
        </section>
    );
};

export default ReviewForm;
