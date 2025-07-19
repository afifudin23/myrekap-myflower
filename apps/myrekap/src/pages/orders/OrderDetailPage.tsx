import { TitlePage } from "@/components/molecules";
import { OrderDetailSection } from "@/components/organisms/orders";
import MainLayout from "@/components/templates/MainLayout";
import { removeOrderCookies } from "@/utils";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function OrderDetailPage() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex justify-between">
                <TitlePage title="Detail Penjualan" subtitle="Mengelola Data Penjualan" />
                <button
                    onClick={() => {
                        navigate("/orders");
                        removeOrderCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <OrderDetailSection />
        </MainLayout>
    );
}

export default OrderDetailPage;
