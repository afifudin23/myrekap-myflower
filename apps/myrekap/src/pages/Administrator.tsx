import SmallButton from "@/components/atoms/SmallButton";
import Title from "@/components/molecules/Title";
import TableUser from "@/components/organisms/TableUser";
import MainLayout from "@/components/templates/MainLayout";
import { MdAddToPhotos } from "react-icons/md";
import { Link } from "react-router-dom";

const Administrator = () => {
    return (
        <MainLayout>
            <Title title="Administrator" subtitle="Mengelola Data Semua User" />
            <Link to="/administrator/add" className="inline-block">
                <SmallButton className="bg-[#4fcd53] hover:bg-[#42b146]"><MdAddToPhotos /> Tambah</SmallButton>
            </Link>
            <TableUser />
        </MainLayout>
    );
};

export default Administrator;
