import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useRef, useState } from "react";

function usePaymentProof(orderSummaryId: string) {
    const [paymentProof, setPaymentProof] = useState<any>(null);
    const hasFetched = useRef(false);
    useEffect(() => {
        if (!orderSummaryId) {
            setPaymentProof(null);
            return;
        }
        if (hasFetched.current) return;
        hasFetched.current = true;
        const getPaymentProofById = async () => {
            try {
                const response = await axiosInstance.get(`/payment-proofs/${orderSummaryId}`);
                setPaymentProof(response.data.data);
            } catch (error: any) {
                setPaymentProof(error.response.data);
            }
        };
        getPaymentProofById();
    }, []);

    return { paymentProof, setPaymentProof };
}

export default usePaymentProof;
