import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { TbLogout2 } from "react-icons/tb";
import { ProductDetailSection } from "@/components/organisms/products";
import { AlertConfirm, AlertInfo, TitlePage } from "@/components/molecules";
import { axiosInstance } from "@/utils";
import { AnimatePresence } from "framer-motion";
import { Loading } from "@/components/atoms";

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<any | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showAlertConfirm, setShowAlertConfirm] = useState<boolean>(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("productDetail") || "{}");
        if (data.id === id) {
            setProduct(data);
        } else {
            navigate("/products");
        }
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const handleDeleteConfirm = (name: string) => {
        setMessage(`Apakah anda akan menghapus user ${name} ?`);
        setShowAlertConfirm(true);
    };

    const handleDeleteProduct = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.delete(`products/${id}`);
            navigate("/products", {
                state: {
                    message: "Produk berhasil dihapus dari sistem",
                },
            });
        } catch (error: any) {
            setMessage("Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya");
            if (error.response.status === 500) {
                navigate("/products", {
                    state: {
                        message: "Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya",
                    },
                });
            } else {
                navigate("/products", {
                    state: {
                        message: error.response.data.message,
                    },
                });
            }
        } finally {
            setShowAlertConfirm(false);
            setIsLoading(false);
        }
    };
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
                <ProductDetailSection product={product} handleDeleteConfirm={handleDeleteConfirm} />
            </div>

            {/* Alert */}
            <AnimatePresence>
                {showAlert && message && <AlertInfo message={message} handleAlert={() => setShowAlert(false)} />}
                {showAlertConfirm && message && (
                    <AlertConfirm
                        message={message}
                        handleAlert={() => {
                            setShowAlertConfirm(false);
                        }}
                        handleResultConfirm={handleDeleteProduct}
                    />
                )}
            </AnimatePresence>

            {/* Loading */}
            {isLoading && <Loading />}
        </MainLayout>
    );
}

export default ProductDetailPage;
