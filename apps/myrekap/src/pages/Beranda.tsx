import Search from "@/components/molecules/Search";
import Chart from "@/components/organisms/Chart";
import MainLayout from "@/components/templates/MainLayout";
import "react-datepicker/dist/react-datepicker.css";
import useOrders from "@/hooks/useOrders";
import {
    filterCustomerCategory,
    filterFlowerCategory,
    filterOrderStatus,
    filterPaymenrtStatus,
    filterSearch,
} from "@/utils/filterSearch";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import InputMonthYear from "@/components/molecules/InputMonthYear";
import Pagination from "@/components/molecules/Pagination";

function Beranda() {
    const [monthYear, setMonthYear] = useState<Date>(new Date());
    const { orders, setOrders } = useOrders(monthYear);
    const [_, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterCustomer, setFilterCustomer] = useState("Customer");
    const [filterFlower, setFilterFlower] = useState("Bunga");
    const [filterPayment, setFilterPayment] = useState("Pembayaran");
    const [filterOrder, setFilterOrder] = useState("Pesanan");
    const filteredOrders = orders.filter(
        (order) =>
            filterSearch(order, searchTerm) &&
            filterCustomerCategory(order, filterCustomer) &&
            filterFlowerCategory(order, filterFlower) &&
            filterPaymenrtStatus(order, filterPayment) &&
            filterOrderStatus(order, filterOrder)
    );
    useEffect(() => {
        const fetchOrders = async () => {
            const month = monthYear ? monthYear.getMonth() + 1 : new Date().getMonth() + 1; // getMonth() is zero-based
            const year = monthYear ? monthYear.getFullYear() : new Date().getFullYear();
            const params = {
                month: month.toString().padStart(2, "0"),
                year: year.toString(),
            };
            const ordersFilter = await axiosInstance.get("/order-summaries", { params });
            setSearchParams(params);
            setOrders(ordersFilter.data.data);
        };
        fetchOrders();
    }, [monthYear]);
    return (
        <MainLayout>
            <InputMonthYear monthYear={monthYear} setMonthYear={setMonthYear} />
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCustomer={filterCustomer}
                setFilterCustomer={setFilterCustomer}
                filterFlower={filterFlower}
                setFilterFlower={setFilterFlower}
                filterPayment={filterPayment}
                setFilterPayment={setFilterPayment}
                filterOrder={filterOrder}
                setFilterOrder={setFilterOrder}
            />
            <Chart monthYear={monthYear} orders={orders} />

            {filteredOrders.length > 0 ? (
                <Pagination filteredOrders={filteredOrders} itemsPerPage={10} />
            ) : (
                <h1 className="text-center text-2xl my-16">Data Pesanan Tidak Ditemukan</h1>
            )}
        </MainLayout>
    );
}

export default Beranda;
