import { TitlePage } from "@/components/molecules";
import { UserTable } from "@/components/organisms/users";
import MainLayout from "@/components/templates/MainLayout";
import { useUsers } from "@/hooks";

function CustomerPage() {
    const { users } = useUsers("customer");
    return (
        <MainLayout>
            <TitlePage title="Customer" subtitle="Menampilkan Data Customer Yang Terdaftar" />
            <UserTable settings={false} users={users} />
        </MainLayout>
    );
}

export default CustomerPage;
