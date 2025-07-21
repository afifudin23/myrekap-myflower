import { axiosInstance } from "@/utils";
import { useEffect, useRef, useState } from "react";

function useUsers(role: "admin" | "customer") {
    const [users, setUsers] = useState([]);
    const hasFetched = useRef(false);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const getAllUsers = async () => {
            try {
                const response = await axiosInstance.get(`/users/${role}`);
                console.log(response.data.data);
                setUsers(response.data.data);
            } catch (error: any) {
                setUsers(error.response.data);
            }
        };
        getAllUsers();
    }, []);

    return { users, setUsers };
}

export default useUsers;
