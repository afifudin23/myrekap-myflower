import SectionTitle from "@/components/atoms/SectionTitle";
import CartSummary from "@/components/molecules/carts/CartSummary";
import CartListSection from "@/components/organisms/carts/CartListSection";
import MainLayout from "@/components/templates/MainLayout";
import { useCartItems } from "@/hooks";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useCartItems();
    const totalPrice = cartItems.reduce((total, item: any) => total + item.product.price * item.quantity, 0);
    const handleCheckout = () => {
        navigate("/checkout");
    };
    return (
        <MainLayout className="space-y-10 w-7/12">
            <SectionTitle className="text-3xl font-bold">Keranjang Anda</SectionTitle>
            <CartListSection cartItems={cartItems} setCartItems={setCartItems} />
            <CartSummary totalPrice={totalPrice} onClick={handleCheckout} />
        </MainLayout>
    );
};

export default CartPage;
