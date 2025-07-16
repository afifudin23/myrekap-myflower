import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { TbLogout2 } from "react-icons/tb";
import { ProductDetailSection } from "@/components/organisms/products";
import { TitlePage } from "@/components/molecules";

// interface Product {
//     id: string;
//     name: string;
//     description: string;
//     image: string;
//     price: number;
//     stock: number;
// }

function ProductDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any | null>(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("productDetail") || "{}");
        console.log(data)
        if (data.id === id) {
            setProduct((data));
        } else {
            navigate("/products");
        }
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <MainLayout>
            <div className="flex justify-between">
                <TitlePage title="Detail Produk" subtitle="Mengelola Data Produk Penjualan" />
                <button
                    onClick={() => {
                        navigate("/products");
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <div className="space-y-10 w-full ">
                <ProductDetailSection product={product} />
            </div>
        </MainLayout>
    );
}

export default ProductDetailPage;
