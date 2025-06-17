import { AiFillStar } from "react-icons/ai";

function StarIcon({ filled }: { filled: boolean }) {
    return <AiFillStar className={filled ? "text-yellow-400" : "text-gray-300"} />;
}

export default StarIcon;
