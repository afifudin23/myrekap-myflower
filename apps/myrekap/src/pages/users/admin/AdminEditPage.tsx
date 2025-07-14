import MainLayout from "@/components/templates/MainLayout";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { TitlePage } from "@/components/molecules";
import { removeUserDetailCookies } from "@/utils";
import { UserForm } from "@/components/organisms/users";

function AdminEditPage() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex justify-between">
                <TitlePage title="Update User Admin" subtitle="Mengupdate User Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate(-1);
                        removeUserDetailCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>

            <UserForm type="update" />
        </MainLayout>
    );
}

export default AdminEditPage;
