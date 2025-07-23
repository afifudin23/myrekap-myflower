import { axiosInstance } from "@/utils";
import { useEffect, useRef, useState } from "react";

function useReviews(productId?: string) {
    const [reviews, setReviews] = useState<any[]>([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!productId) return;
        if (hasFetched.current) return;
        hasFetched.current = true;
        const getAllData = async () => {
            try {
                const response = await axiosInstance.get(`/products/${productId}/reviews`);
                setReviews(response.data.data);
            } catch (error: any) {
                setReviews([]);
            }
        };
        getAllData();
    }, [productId]);
    return { reviews, setReviews };
}

export default useReviews;
