import SectionTitle from "@/components/atoms/SectionTitle";
import CartSummary from "@/components/molecules/carts/CartSummary";
import CartListSection from "@/components/organisms/carts/CartListSection";
import MainLayout from "@/components/templates/MainLayout";

const itemsDummy = [
    {
        id: "1",
        name: "Bunga 1",
        price: 10000,
        quantity: 2,
        imageUrl: "/assets/images/test.jpg",
    },
    {
        id: "2",
        name: "Bunga 2",
        price: 15000,
        quantity: 1,
        imageUrl: "/assets/images/test.jpg",
    },
    {
        id: "3",
        name: "Bunga 3",
        price: 20000,
        quantity: 3,
        imageUrl: "/assets/images/test2.jpg",
    },
    {
        id: "4",
        name: "Bunga 4",
        price: 25000,
        quantity: 1,
        imageUrl: "/assets/images/test2.jpg",
    },
    {
        id: "5",
        name: "Bunga 5",
        price: 30000,
        quantity: 2,
        imageUrl: "/assets/images/test.jpg",
    },
];


const CartPage = () => {
    const totalPrice = itemsDummy.reduce((total, item) => total + item.price * item.quantity, 0);
    const handleCheckout = () => {
        console.log("Checkout");
    }
    return (
        <MainLayout className="space-y-10">
            <SectionTitle className="text-3xl font-bold">Keranjang Anda</SectionTitle>
            <CartListSection items={itemsDummy} />
            <CartSummary totalPrice={totalPrice} onClick={handleCheckout} />
        </MainLayout>
    );
};

export default CartPage;
