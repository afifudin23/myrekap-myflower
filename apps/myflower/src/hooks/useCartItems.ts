import { axiosInstance } from "@/utils";
import { useEffect, useRef, useState } from "react";

function useCartItems() {
    const [cartItems, setCartItems] = useState([]);
    const hasFetched = useRef(false);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const getAllData = async () => {
            try {
                const response = await axiosInstance.get(`/carts`);
                setCartItems(response.data.data);
                localStorage.setItem("cartItems", JSON.stringify(response.data.data));
            } catch (error: any) {
                setCartItems(error.response.data);
            }
        };
        getAllData();
    }, []);

    return { cartItems, setCartItems };
}

export default useCartItems;
