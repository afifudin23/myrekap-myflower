import { axiosInstance } from "@/utils";
import { useEffect, useRef, useState } from "react";

function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const getAllData = async () => {
            try {
                const response = await axiosInstance.get(`/orders/customer`);
                setOrders(response.data.data);
            } catch (error: any) {
                setOrders(error.response.data);
            } finally {
                setLoading(false);
            }
        };
        getAllData();
    }, []);
    return { orders, setOrders, loading };
}

export default useOrders;
