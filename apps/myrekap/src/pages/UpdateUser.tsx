import Title from "@/components/molecules/Title";
import FormUser from "@/components/organisms/FormUser";
import MainLayout from "@/components/templates/MainLayout";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { removeUserDetailCookies } from "@/utils/userDetailCookies";

function UpdateUser() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex justify-between">
                <Title title="Update User" subtitle="Mengupdate User Sesuai Kebutuhan" />
                <button
                    onClick={() => {
                        navigate(-1);
                        removeUserDetailCookies();
                    }}
                >
                    <TbLogout2 className="text-5xl 2xl:text-6xl" />
                </button>
            </div>

            <FormUser type="update" />
        </MainLayout>
    );
}

export default UpdateUser;
