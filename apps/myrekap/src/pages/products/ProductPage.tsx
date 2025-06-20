import Title from "@/components/molecules/Title";
import ProductList from "@/components/organisms/products/ProductList";
import MainLayout from "@/components/templates/MainLayout";

const dummyProducts = [
    {
        id: "1",
        name: "Karangan Bunga Mawar",
        image: "/assets/images/test.jpg",
        price: 150000,
        stock: 45,
    },
    {
        id: "2",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test.jpg",
        price: 200000,
        stock: 30,
    },
    {
        id: "3",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test2.jpg",
        price: 200000,
        stock: 30,
    },
    {
        id: "4",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test2.jpg",
        price: 200000,
        stock: 30,
    },
    {
        id: "5",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test.jpg",
        price: 200000,
        stock: 30,
    },
    {
        id: "6",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test2.jpg",
        price: 200000,
        stock: 30,
    },
    {
        id: "7",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test.jpg",
        price: 200000,
        stock: 30,
    },
    {
        id: "8",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test2.jpg",
        price: 200000,
        stock: 30,
    },
];

function ProductPage() {
    return (
        <MainLayout>
            <Title title="Produk Saya" subtitle="Mengelola Data Produk Penjualan" />

            <ProductList products={dummyProducts} />
        </MainLayout>
    );
}

export default ProductPage;
