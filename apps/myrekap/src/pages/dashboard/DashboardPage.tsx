import MainLayout from "@/components/templates/MainLayout";
import "react-datepicker/dist/react-datepicker.css";
import { InputMonthYear, OrderCard } from "@/components/molecules";
import { DashboardChart } from "@/components/organisms/dashboard";
import { useOrders } from "@/hooks";
import { useState } from "react";

function DashboardPage() {
    const [monthYear, setMonthYear] = useState<Date>(new Date());
    const { orders } = useOrders(monthYear);

    // Get 6 Orders, Refac Next Project
    const ordersSix = orders.slice(0, 6);

    return (
        <MainLayout>
            <InputMonthYear monthYear={monthYear} setMonthYear={setMonthYear} />
            <DashboardChart monthYear={monthYear} orders={orders} />

            {ordersSix.length > 0 ? (
                <OrderCard filteredOrders={ordersSix} />
            ) : (
                <h1 className="text-center text-2xl my-16">Data Pesanan Tidak Ditemukan</h1>
            )}
        </MainLayout>
    );
}

export default DashboardPage;
