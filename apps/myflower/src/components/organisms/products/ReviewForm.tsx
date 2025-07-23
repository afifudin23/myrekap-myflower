// molecules/ReviewForm.tsx
import TextArea from "@/components/atoms/TextArea";
import RatingSelector from "@/components/molecules/RatingSelector";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";
import { Controller } from "react-hook-form";

// interface ReviewFormProps {
//     onSubmit: (rating: number, comment: string, productId: number) => void;
//     className?: string;
// }

const ReviewForm = ({ onSubmit, control, isUpdate, hasPurchased, className }: any) => {
    return (
        <form className={`space-y-3 ${className}`} onSubmit={onSubmit}>
            <SectionTitle>Beri Ulasan</SectionTitle>

            {/* Rating */}
            <Controller
                name="rating"
                control={control}
                render={({ field: { onChange, value } }) => <RatingSelector rating={value} onSelect={onChange} disabled={!hasPurchased} />}
            />

            {/* Comment */}
            <Controller
                name="comment"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextArea value={value} onChange={onChange} disabled={!hasPurchased} placeholder={hasPurchased ? "Tulis ulasanmu disini" : "Anda belum membeli produk ini"} />
                )}
            />

            <Button type="submit" colors={{ primary: "#8f40f6", hover: "#773dc4" }} className="w-[10rem] p-1" disabled={!hasPurchased}>
                {isUpdate ? "Edit Ulasan" : "Beri Ulasan"}
            </Button>
        </form>
    );
};

export default ReviewForm;
