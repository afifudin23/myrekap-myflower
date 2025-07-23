import BackButton from "@/components/atoms/BackButton";
import ProductDetailSection from "@/components/organisms/products/ProductDetailSection";
import ProductReviewSection from "@/components/organisms/products/ProductReviewSection";
import ReviewForm from "@/components/organisms/products/ReviewForm";
import MainLayout from "@/components/templates/MainLayout";
import { useOrders, useReviews } from "@/hooks";
import { axiosInstance } from "@/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function ProductDetailPage() {
    const [product, setProduct] = useState({ id: "", name: "", images: [], price: 0, stock: 0 });
    const { reviews, setReviews } = useReviews(product?.id);
    const [myReview, setMyReview] = useState<any>(null);
    const { orders } = useOrders();
    const [hasPurchased, setHasPurchased] = useState(false);

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            id: "",
            rating: 0,
            comment: "",
        },
    });

    useEffect(() => {
        const storedProduct = JSON.parse(localStorage.getItem("productDetail") || "{}");
        if (storedProduct) {
            setProduct(storedProduct);

            const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

            const isPurchased = orders.some((order: any) =>
                order.items.some((item: any) => item.productId === product.id && order.userId === currentUser.id)
            );
            setHasPurchased(isPurchased);

            const myReview = reviews.find((r: any) => r.userId === currentUser.id) || {
                id: "",
                rating: 0,
                comment: "",
            };
            if (myReview) {
                reset({
                    id: myReview.id,
                    rating: myReview.rating,
                    comment: myReview.comment,
                });
                if (myReview.rating === 0) return;
                setMyReview(myReview);
            }
        }
    }, [reviews, reset, orders, product.id]);

    const onCreate = handleSubmit(async (data) => {
        try {
            const response = await axiosInstance.post(`/products/${product.id}/reviews`, data);
            setReviews([...reviews, response.data.data]);
            setMyReview(response.data.data);
            alert("Review berhasil ditambahkan.");
        } catch (error: any) {
            console.log(error.response.data);
            alert("Gagal menambahkan review.");
        }
    });

    const onUpdate = handleSubmit(async (data) => {
        try {
            const response = await axiosInstance.put(`/products/${product.id}/reviews/${myReview.id}`, data);
            const updatedReviews = reviews.map((r: any) => (r.id === myReview.id ? response.data.data : r));
            setReviews(updatedReviews);
            setMyReview(response.data.data);
            alert("Review berhasil diperbarui.");
        } catch (error: any) {
            console.log(error.response.data);
            alert("Gagal menambahkan review.");
        }
    });

    return (
        <MainLayout>
            <div className="max-w-5xl space-y-10 mx-auto">
                <BackButton>Kembali ke Produk</BackButton>
                <ProductDetailSection product={product} />
                <ReviewForm
                    onSubmit={myReview ? onUpdate : onCreate}
                    control={control}
                    isUpdate={!!myReview}
                    hasPurchased={hasPurchased}
                />
                <ProductReviewSection reviews={reviews} />
            </div>
        </MainLayout>
    );
}

export default ProductDetailPage;
