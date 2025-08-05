import Image from "@/components/atoms/Image";
import QuantityButton from "@/components/atoms/QuantityButton";
import { axiosInstance } from "@/utils";
import { FaTrashCan } from "react-icons/fa6";

function CartItemCard({ cartItem, setCartItems }: any) {
    const handleIncrementQuantity = async () => {
        await axiosInstance.patch(`/carts/${cartItem.productId}/increment`);
        setCartItems((prev: any) =>
            prev.map((item: any) =>
                item.productId === cartItem.productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrementQuantity = async () => {
        await axiosInstance.patch(`/carts/${cartItem.productId}/decrement`);
        setCartItems((prev: any) =>
            prev.map((item: any) =>
                item.productId === cartItem.productId ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const handleRemove = async () => {
        await axiosInstance.delete(`/carts/${cartItem.productId}`);
        setCartItems((prev: any) => prev.filter((item: any) => item.productId !== cartItem.productId));
    };

    return (
        <div className="flex gap-4 items-center p-4 bg-[#fafafa] rounded-xl shadow-sm">
            <Image src={cartItem.product.images[0].secureUrl} alt={cartItem.product.name} className="w-16 h-16" />
            <div className="flex-1">
                <h3 className="text-sm font-semibold">{cartItem.product.name}</h3>
                <p className="text-gray-500 text-sm">Rp {cartItem.product.price.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-3">
                <QuantityButton onClick={handleDecrementQuantity}>-</QuantityButton>
                <span className="text-sm font-medium">{cartItem.quantity}</span>
                <QuantityButton onClick={handleIncrementQuantity}>+</QuantityButton>
            </div>

            <button onClick={handleRemove} className="bg-red-500 hover:bg-red-600 text-sm text-white p-2 rounded-lg">
                <FaTrashCan />
            </button>
        </div>
    );
}

export default CartItemCard;
