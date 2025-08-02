import { TitlePage } from "@/components/molecules";
import { UserTable } from "@/components/organisms/users";
import MainLayout from "@/components/templates/MainLayout";
import { useUsers } from "@/hooks";

function CustomerPage() {
    const { users } = useUsers("customer");
    return (
        <MainLayout>
            <TitlePage title="Customer" subtitle="Menampilkan Data Customer Yang Terdaftar" />
            {users.length > 0 ?
            <UserTable settings={false} users={users} /> : (
                <p className="text-center text-gray-500 text-2xl mt-40">Tidak ada customer yang terdaftar</p>
            )
            
        }
        </MainLayout>
    );
}

export default CustomerPage;
