import { TitlePage } from "@/components/molecules";
import { UserTable } from "@/components/organisms/users";
import MainLayout from "@/components/templates/MainLayout";

function CustomerPage() {
    return (
        <MainLayout>
            <TitlePage title="Customer" subtitle="Menampilkan Data Customer Yang Terdaftar" />
            <UserTable />
        </MainLayout>
    );
}

export default CustomerPage;
