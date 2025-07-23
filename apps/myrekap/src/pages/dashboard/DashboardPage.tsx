import MainLayout from "@/components/templates/MainLayout";
import "react-datepicker/dist/react-datepicker.css";
import { InputMonthYear } from "@/components/molecules";
import { DashboardChart } from "@/components/organisms/dashboard";
import { useOrders } from "@/hooks";
import { useEffect, useState } from "react";
import { OrderList } from "@/components/organisms/orders";
import { axiosInstance } from "@/utils";
import { useSearchParams } from "react-router-dom";

function DashboardPage() {
    const [monthYear, setMonthYear] = useState<Date>(new Date());
    const { orders, setOrders } = useOrders(monthYear);
    const [_, setSearchParams] = useSearchParams();

    // Get 6 Orders, Refac Next Project
    const ordersSix = orders.slice(0, 6);
    useEffect(() => {
        const fetchOrders = async () => {
            const month = monthYear ? monthYear.getMonth() + 1 : new Date().getMonth() + 1; // getMonth() is zero-based
            const year = monthYear ? monthYear.getFullYear() : new Date().getFullYear();
            console.log(month, year);
            const params = {
                month: month.toString().padStart(2, "0"),
                year: year.toString(),
            };
            const ordersFilter = await axiosInstance.get("/orders/admin", { params });
            setSearchParams(params);
            setOrders(ordersFilter.data.data);
        };
        fetchOrders();
    }, [monthYear]);

    return (
        <MainLayout>
            <InputMonthYear monthYear={monthYear} setMonthYear={setMonthYear} />
            <DashboardChart monthYear={monthYear} orders={orders} />

            {ordersSix.length > 0 ? (
                <OrderList orders={ordersSix} />
            ) : (
                <h1 className="text-center text-2xl my-16">Data Pesanan Tidak Ditemukan</h1>
            )}
        </MainLayout>
    );
}

export default DashboardPage;
