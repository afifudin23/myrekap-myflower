import Title from "@/components/molecules/Title";
import TableUser from "@/components/organisms/TableUser";
import MainLayout from "@/components/templates/MainLayout";

function CustomerPage() {
    return (
        <MainLayout>
            <Title title="Customer" subtitle="Menampilkan Data Customer Yang Terdaftar" />
            <TableUser />
        </MainLayout>
    );
}

export default CustomerPage;
