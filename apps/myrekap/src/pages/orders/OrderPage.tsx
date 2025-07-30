import { ButtonSmall } from "@/components/atoms";
import { AlertInfo, InputMonthYear, OrderPagination, TitlePage } from "@/components/molecules";
import Search from "@/components/molecules/orders/OrderSearch";
import MainLayout from "@/components/templates/MainLayout";
import { useOrders } from "@/hooks";
import { axiosInstance, filterCustomerCategory, filterOrderStatus, filterPaymenrtStatus, filterSearch } from "@/utils";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function OrderPage() {
    const [monthYear, setMonthYear] = useState<Date>(new Date());
    const { orders, setOrders } = useOrders();
    const [_, setSearchParams] = useSearchParams();

    // Alert
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>();
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        const state = location.state as { message?: string };
        if (state?.message) {
            setMessage(state.message);
            setShowAlert(true);

            const timer = setTimeout(() => {
                setShowAlert(false);
                window.history.replaceState({}, document.title);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [location.key]);

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

    // Get Order By Month Year Periode
    useEffect(() => {
        const fetchOrders = async () => {
            const month = monthYear ? monthYear.getMonth() + 1 : new Date().getMonth() + 1; // getMonth() is zero-based
            const year = monthYear ? monthYear.getFullYear() : new Date().getFullYear();
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
    console.log(filteredOrders)
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
                className="bg-blue-600 text-white mt-5 py-1 px-3 2xl:py-2 2xl:px-4 font-medium rounded-lg hover:bg-blue-700 transition font-fredoka gap-2"
                onClick={() => navigate("/orders/create")}
            />

            {filteredOrders.length > 0 ? (
                <OrderPagination orders={filteredOrders} itemsPerPage={10} />
            ) : (
                <h1 className="text-center text-2xl my-16">Data Pesanan Tidak Ditemukan</h1>
            )}

            {/* Alert */}
            <AnimatePresence>
                {showAlert && message && <AlertInfo message={message} handleAlert={() => setShowAlert(false)} />}
            </AnimatePresence>
        </MainLayout>
    );
}

export default OrderPage;
