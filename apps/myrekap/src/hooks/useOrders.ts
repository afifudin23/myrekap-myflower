import { OrderSummaryType } from "@/types/Data";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useOrders(now = new Date()) {
    const [orders, setOrders] = useState<OrderSummaryType[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const hasFetched = useRef(false);

    useEffect(() => {
        const defaultMonth = (now.getMonth() + 1).toString().padStart(2, "0"); // 2-digit
        const defaultYear = now.getFullYear().toString();

        if (!searchParams.get("month") || !searchParams.get("year")) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev.toString());
                if (!newParams.get("month")) newParams.set("month", defaultMonth);
                if (!newParams.get("year")) newParams.set("year", defaultYear);
                return newParams;
            });
        }
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const params = {
            month: searchParams.get("month"),
            year: searchParams.get("year"),
            flower_category: searchParams.get("flower_category"),
            customer_category: searchParams.get("customer_category"),
            payment_method: searchParams.get("payment_method"),
            payment_status: searchParams.get("payment_status"),
            order_status: searchParams.get("order_status"),
        };
        const getAllOrders = async () => {
            try {
                const response = await axiosInstance.get("/order-summaries", { params });
                setOrders(response.data.data);
            } catch (error: any) {
                if (error.response.status === 500) {
                    setOrders([]);
                } else {
                    setOrders(error.response.data);
                }
            }
        };
        getAllOrders();
    }, []);
    return { orders, setOrders };
}

export default useOrders;
