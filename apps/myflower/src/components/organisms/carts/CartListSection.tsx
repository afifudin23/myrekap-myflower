import CartItemCard from "@/components/molecules/carts/CartItemCard";

// interface CartPageProps {
//     cartItems: CartItemProps[];
// }
function CartListSection({ cartItems, setCartItems }: any) {
    if (cartItems.length === 0) {
        return <div className="text-center text-gray-500 py-10">Keranjang masih kosong</div>;
    }

    return (
        <section className="space-y-4">
            {cartItems.map((cartItem: any) => (
                <CartItemCard key={cartItem.id} cartItem={cartItem} setCartItems={setCartItems} />
            ))}
        </section>
    );
}

export default CartListSection;
