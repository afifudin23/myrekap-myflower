import { axiosInstance } from "@/utils";
import { useEffect, useRef, useState } from "react";

function useProducts() {
    const [products, setProducts] = useState([]);
    const hasFetched = useRef(false);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const getAllProducts = async () => {
            try {
                const response = await axiosInstance.get(`/products`);
                setProducts(response.data.data);
            } catch (error: any) {
                setProducts(error.response.data);
            }
        };
        getAllProducts();
    }, []);

    return { products, setProducts };
}

export default useProducts;