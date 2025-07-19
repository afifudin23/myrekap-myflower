import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import ProfileField from "@/components/atoms/ProfileField";
import SectionTitle from "@/components/atoms/SectionTitle";
import MainLayout from "@/components/templates/MainLayout";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();

    const handleLogout= () => {
        navigate("/auth/login");
    }
    return (
        <MainLayout className="w-full max-w-3xl space-y-6">
            <BackButton>Kembali ke Produk</BackButton>
            <SectionTitle className="text-3xl font-bold md:text-4xl">Profile Saya</SectionTitle>
                <div className="space-y-7 w-full">
                    <div className="space-y-4">
                        <ProfileField label="Nama" value="Unknown Anonymous" />
                        <ProfileField label="Username" value="unknown" />
                        <ProfileField label="Email" value="unknown@email.com" />
                        <ProfileField label="Nomor Telepon" value="089758368617" />
                        <ProfileField label="Password Lama" value="******" />
                        <ProfileField label="Password" value="" />
                        <ProfileField label="Konfirmasi Password" value="" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <Button
                            type="button"
                            colors={{ primary: "#8f40f6", hover: "#773dc4" }}
                            className="sm:w-[15rem] w-full p-2"
                        >
                            Edit Profile
                        </Button>
                        <Button
                            type="button"
                            colors={{ primary: "#8f40f6", hover: "#773dc4" }}
                            className="sm:w-[15rem] w-full p-2"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
        </MainLayout>
    );
}

export default ProfilePage;
