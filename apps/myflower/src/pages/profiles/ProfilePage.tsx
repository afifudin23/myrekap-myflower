import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";
import ProfileForm from "@/components/organisms/profiles/ProfileForm";
import MainLayout from "@/components/templates/MainLayout";
import { profileFormSchema } from "@/schemas/profileSchema";
import { axiosInstance, formatters } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            customerCategory: formatters.formatCapital(user.customerCategory),
            oldPassword: "",
            newPassword: "",
            confPassword: "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await axiosInstance.put("users/profile", data);
            alert("Profil berhasil diubah.");
            localStorage.setItem("user", JSON.stringify(response.data.data));
            navigate("/products");
        } catch (error: any) {
            console.log(error.response.data);
            const axiosError = error as AxiosError;
            if (axiosError.code === "ERR_NETWORK") {
                alert("Tidak Dapat Terhubung Ke Server. Periksa Koneksi Internet Anda");
            } else if (error.response.data.errorCode === 1003) {
                alert("Password Lama Salah.");
            }
        }
    });

    const handleLogout = async () => {
        localStorage.clear();
        await axiosInstance.post("auth/logout");
        navigate("/auth/login");
    };
    return (
        <MainLayout className="w-full max-w-3xl space-y-6">
            <BackButton>Kembali ke Produk</BackButton>
            <SectionTitle className="text-3xl font-bold md:text-4xl">Profile Saya</SectionTitle>
            <form className="space-y-7 w-full" onSubmit={onSubmit}>
                <ProfileForm control={control} errors={errors} />
                <div className="flex flex-col lg:flex-row gap-5">
                    <Button
                        type="submit"
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
            </form>
        </MainLayout>
    );
}

export default ProfilePage;
