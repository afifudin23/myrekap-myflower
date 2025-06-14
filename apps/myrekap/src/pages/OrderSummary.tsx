import Title from "@/components/molecules/Title";
import OrderSummaryCard from "@/components/organisms/OrderSummaryCard";
import MainLayout from "@/components/templates/MainLayout";
import { removeOrderCookies } from "@/utils/orderCookies";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex justify-between items-start">
                <Title title="Order Summary" subtitle="Mengelola Data Order Summary" />
                <button
                    onClick={() => {
                        navigate("/beranda");
                        removeOrderCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <OrderSummaryCard />
        </MainLayout>
    );
}

export default OrderSummary;
