import MainLayout from "@/components/templates/MainLayout";

type CartItemProps = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
};

// type CartPageProps = {
//     items: CartItemProps[];
// };

const itemsDummy = [
    {
        id: "1",
        name: "Bunga 1",
        price: 10000,
        quantity: 2,
        imageUrl: "https://picsum.photos/seed/1/150",
    },
    {
        id: "2",
        name: "Bunga 2",
        price: 15000,
        quantity: 1,
        imageUrl: "https://picsum.photos/seed/2/150",
    },
    {
        id: "3",
        name: "Bunga 3",
        price: 20000,
        quantity: 3,
        imageUrl: "https://picsum.photos/seed/3/150",
    },
    {
        id: "4",
        name: "Bunga 4",
        price: 25000,
        quantity: 1,
        imageUrl: "https://picsum.photos/seed/4/150",
    },
    {
        id: "5",
        name: "Bunga 5",
        price: 30000,
        quantity: 2,
        imageUrl: "https://picsum.photos/seed/5/150",
    },
];

const CartItemCard= ({ item }: { item: CartItemProps }) => {
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
        <div className="flex gap-4 items-center p-4 bg-white rounded-xl shadow-sm">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />

            <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">Rp {item.price.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={handleDecrease} className="w-7 h-7 text-sm bg-gray-200 rounded hover:bg-gray-300">
                    -
                </button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <button onClick={handleIncrease} className="w-7 h-7 text-sm bg-gray-200 rounded hover:bg-gray-300">
                    +
                </button>
            </div>

            <button onClick={handleRemove} className="text-red-500 hover:text-red-600 text-sm">
                Hapus
            </button>
        </div>
    );
};

const CartPage = () => {
    if (itemsDummy.length === 0) {
        return <div className="text-center text-gray-500 py-10">Keranjang masih kosong</div>;
    }

    return (
        <MainLayout>
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Keranjang Anda</h2>
                {itemsDummy.map((item) => (
                    <CartItemCard key={item.id} item={item} />
                ))}
            </section>
        </MainLayout>
    );
};

export default CartPage;
