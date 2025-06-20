import SmallButton from "@/components/atoms/SmallButton";
import Title from "@/components/molecules/Title";
import ProductList from "@/components/organisms/products/ProductList";
import MainLayout from "@/components/templates/MainLayout";
import { MdAddToPhotos } from "react-icons/md";
import { Link } from "react-router-dom";

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
            <Link to="/products/new" className="inline-block">
                <SmallButton className="bg-[#4fcd53] hover:bg-[#42b146] py-1 2xl:py-2 px-4 font-bold mb-8"><MdAddToPhotos /> Tambah</SmallButton>
            </Link>
            <ProductList products={dummyProducts} />
        </MainLayout>
    );
}

export default ProductPage;
