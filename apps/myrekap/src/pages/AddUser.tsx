import Title from "@/components/molecules/Title";
import FormUser from "@/components/organisms/FormUser";
import MainLayout from "@/components/templates/MainLayout";
import { removeUserDetailCookies } from "@/utils/userDetailCookies";
import { TbLogout2 } from "react-icons/tb";
import {  useNavigate } from "react-router-dom";

function AddUser() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex justify-between">
                <Title title="Tambah User" subtitle="Menambah User Baru Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate(-1);
                        removeUserDetailCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>
            <FormUser />
        </MainLayout>
    );
}

export default AddUser;
