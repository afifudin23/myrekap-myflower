import { TitlePage } from "@/components/molecules";
import { ReportOrderForm } from "@/components/organisms/reports";
import MainLayout from "@/components/templates/MainLayout";

const ReportOrderFilterPage = () => {
    return (
        <MainLayout>
            <TitlePage title="Cetak Rekap" subtitle="Mencetak Rekap Sesuai Kebutuhan" />
            <ReportOrderForm />
        </MainLayout>
    );
};

export default ReportOrderFilterPage;
