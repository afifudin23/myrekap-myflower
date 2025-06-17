import ProductImage from "@/components/atoms/ProductImage";
import QuantityButton from "@/components/atoms/QuantityButton";

export interface CartItemProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

function CartItemCard({ item }: { item: CartItemProps }) {
    const handleIncrease = () => {
        console.log("Tambah 1", item.id);
    };

    const handleDecrease = () => {
        console.log("Kurang 1", item.id);
    };

    const handleRemove = () => {
        console.log("Hapus item", item.id);
    };

    return (
        <div className="flex gap-4 items-center p-4 bg-[#fafafa] rounded-xl shadow-sm">
            <ProductImage src={item.imageUrl} alt={item.name} className="w-16 h-16" />

            <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">Rp {item.price.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-2">
                <QuantityButton onClick={handleDecrease}>-</QuantityButton>
                <span className="text-sm font-medium">{item.quantity}</span>
                <QuantityButton onClick={handleIncrease}>+</QuantityButton>
            </div>

            <button onClick={handleRemove} className="text-red-500 hover:text-red-600 text-sm">
                Hapus
            </button>
        </div>
    );
}

export default CartItemCard;
