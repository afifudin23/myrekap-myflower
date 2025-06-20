import Title from "@/components/molecules/Title";
import ProductForm from "@/components/organisms/products/ProductForm";
import MainLayout from "@/components/templates/MainLayout";
import { useForm } from "react-hook-form";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function ProductEditPage() {
    const navigate = useNavigate();
    const { control } = useForm();
    return (
        <MainLayout>
            <div className="flex justify-between">
                <Title title="Edit Produk" subtitle="Mengelola Data Produk Penjualan" />
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <ProductForm control={control} />
        </MainLayout>
    );
}

export default ProductEditPage;
