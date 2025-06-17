import Avatar from "@/components/atoms/Avatar";
import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import ProfileField from "@/components/atoms/ProfileField";
import SectionTitle from "@/components/atoms/SectionTitle";
import MainLayout from "@/components/templates/MainLayout";

function ProfilePage() {
    return (
        <MainLayout className="w-8/12 space-y-6">
            <BackButton />
            <SectionTitle className="text-4xl font-bold break-words">Profile Saya</SectionTitle>
            <div className="flex items-start gap-6 ">
                <Avatar src="/assets/images/user.jpeg" alt="User Avatar" />
                <div className="flex flex-col justify-between w-full h-96">
                    <div className="space-y-4">
                        <ProfileField label="Nama" value="Unknown Anonymous" />
                        <ProfileField label="Username" value="unknown" />
                        <ProfileField label="Email" value="unknown@email.com" />
                    </div>
                    <div className="flex gap-5">
                        <Button type="button" colors={{ primary: "#8f40f6", hover: "#773dc4" }} className="w-[15rem] p-2">
                            Edit Profile
                        </Button>
                        <Button type="button" colors={{ primary: "#8f40f6", hover: "#773dc4" }} className="w-[15rem] p-2">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default ProfilePage;
