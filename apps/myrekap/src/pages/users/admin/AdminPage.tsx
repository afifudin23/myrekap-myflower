import { ButtonSmall } from "@/components/atoms";
import { TitlePage } from "@/components/molecules";
import { UserTable } from "@/components/organisms/users";
import MainLayout from "@/components/templates/MainLayout";
import { MdAddToPhotos } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminPage = () => {
    return (
        <MainLayout>
            <TitlePage title="Admin" subtitle="Mengelola Data Semua User Admin" />
            <Link to="/administrator/add" className="inline-block">
                <ButtonSmall className="bg-[#4fcd53] hover:bg-[#42b146] py-1 2xl:py-2 px-4 font-bold mb-8">
                    <MdAddToPhotos /> Tambah
                </ButtonSmall>
            </Link>
            <UserTable />
        </MainLayout>
    );
};

export default AdminPage;
