import CartItemCard, { type CartItemProps } from "@/components/molecules/carts/CartItemCard";

interface CartPageProps {
    items: CartItemProps[];
}
function CartListSection({ items }: CartPageProps) {
    if (items.length === 0) {
        return <div className="text-center text-gray-500 py-10">Keranjang masih kosong</div>;
    }

    return (
        <section className="space-y-4">
            {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
            ))}
        </section>
    );
}

export default CartListSection;
