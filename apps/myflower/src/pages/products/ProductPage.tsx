import ProductCard from "@/components/organisms/products/ProductList";
import ProductSearch from "@/components/organisms/products/ProductSearch";
import MainLayout from "@/components/templates/MainLayout";

const dummyProducts = [
    {
        id: "1",
        name: "Karangan Bunga Mawar",
        image: "/assets/images/test.jpg",
        price: 150000,
    },
    {
        id: "2",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test.jpg",
        price: 200000,
    },
    {
        id: "2",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test2.jpg",
        price: 200000,
    },
    {
        id: "2",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test2.jpg",
        price: 200000,
    },
    {
        id: "2",
        name: "Buket Ulang Tahun",
        image: "/assets/images/test2.jpg",
        price: 200000,
    },
];

function ProductPage() {
    return (
        <MainLayout>
            <div className="flex flex-col gap-5">

            <ProductSearch />
            <ProductCard products={dummyProducts} />
            </div>
        </MainLayout>
    );
}

export default ProductPage;
