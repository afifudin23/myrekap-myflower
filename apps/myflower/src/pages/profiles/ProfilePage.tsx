import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import Image from "@/components/atoms/Image";
import ProfileField from "@/components/atoms/ProfileField";
import SectionTitle from "@/components/atoms/SectionTitle";
import MainLayout from "@/components/templates/MainLayout";

function ProfilePage() {
    return (
        <MainLayout className="w-full max-w-7xl space-y-6">
            <BackButton>Kembali ke Produk</BackButton>
            <SectionTitle className="text-3xl font-bold md:text-4xl">Profile Saya</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-3">
                <div className="w-full max-w-xs mx-auto lg:mx-0">
                    <Image src="/assets/images/user.jpeg" alt="User Avatar" className="w-full h-auto" />
                </div>
                <div className="space-y-7 w-full">
                    <div className="space-y-4">
                        <ProfileField label="Nama" value="Unknown Anonymous" />
                        <ProfileField label="Username" value="unknown" />
                        <ProfileField label="Email" value="unknown@email.com" />
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
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default ProfilePage;
