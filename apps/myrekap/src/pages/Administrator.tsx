import SmallButton from "@/components/atoms/SmallButton";
import Title from "@/components/molecules/Title";
import TableUser from "@/components/organisms/TableUser";
import MainLayout from "@/components/templates/MainLayout";
import { MdAddToPhotos } from "react-icons/md";
import { Link } from "react-router-dom";

const Administrator = () => {
    return (
        <MainLayout>
            <Title title="Admin" subtitle="Mengelola Data Semua User Admin" />
            <Link to="/administrator/add" className="inline-block">
                <SmallButton className="bg-[#4fcd53] hover:bg-[#42b146] py-1 2xl:py-2 px-4 font-bold"><MdAddToPhotos /> Tambah</SmallButton>
            </Link>
            <TableUser />
        </MainLayout>
    );
};

export default Administrator;
