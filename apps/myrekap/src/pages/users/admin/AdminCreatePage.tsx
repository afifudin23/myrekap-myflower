import { TitlePage } from "@/components/molecules";
import { UserForm } from "@/components/organisms/users";
import MainLayout from "@/components/templates/MainLayout";
import { removeUserDetailCookies } from "@/utils";
import { TbLogout2 } from "react-icons/tb";
import {  useNavigate } from "react-router-dom";

function AdminCreatePage() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex justify-between">
                <TitlePage title="Tambah User Admin" subtitle="Menambah User Baru Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate(-1);
                        removeUserDetailCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <UserForm />
        </MainLayout>
    );
}

export default AdminCreatePage;
