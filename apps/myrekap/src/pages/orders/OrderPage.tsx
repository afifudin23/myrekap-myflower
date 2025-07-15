import { ButtonSmall } from "@/components/atoms";
import { InputMonthYear, OrderPagination, TitlePage } from "@/components/molecules";
import Search from "@/components/molecules/orders/OrderSearch";
import MainLayout from "@/components/templates/MainLayout";
import { useOrders } from "@/hooks";
import { axiosInstance, filterCustomerCategory, filterOrderStatus, filterPaymenrtStatus, filterSearch } from "@/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function OrderPage() {
    const [monthYear, setMonthYear] = useState<Date>(new Date());
    const { orders, setOrders } = useOrders(monthYear);
    const [_, setSearchParams] = useSearchParams();

    // Filter
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCustomer, setFilterCustomer] = useState("Customer");
    const [filterPayment, setFilterPayment] = useState("Pembayaran");
    const [filterOrder, setFilterOrder] = useState("Pesanan");
    const filteredOrders = orders.filter(
        (order: any) =>
            filterSearch(order, searchTerm) &&
            filterCustomerCategory(order, filterCustomer) &&
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
            const ordersFilter = await axiosInstance.get("/admin/orders", { params });
            setSearchParams(params);
            setOrders(ordersFilter.data.data);
        };
        fetchOrders();
    }, [monthYear]);
    return (
        <MainLayout>
            <TitlePage title="Daftar Penjualan" subtitle="Menampilkan Data Penjualan Yang Terdaftar" />
            <InputMonthYear monthYear={monthYear} setMonthYear={setMonthYear} />
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCustomer={filterCustomer}
                setFilterCustomer={setFilterCustomer}
                filterPayment={filterPayment}
                setFilterPayment={setFilterPayment}
                filterOrder={filterOrder}
                setFilterOrder={setFilterOrder}
            />

            <ButtonSmall
                children="Tambah Pesanan"
                className="bg-blue-600 text-white mt-5 py-1 px-1 2xl:py-2 2xl:px-4 font-medium rounded-lg hover:bg-blue-700 transition font-fredoka gap-2"
                onClick={() => (window.location.href = "/orders/create")}
            />

            {filteredOrders.length > 0 ? (
                <OrderPagination filteredOrders={filteredOrders} itemsPerPage={10} />
            ) : (
                <h1 className="text-center text-2xl my-16">Data Pesanan Tidak Ditemukan</h1>
            )}
        </MainLayout>
    );
}

export default OrderPage;
