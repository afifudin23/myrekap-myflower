import Title from "@/components/molecules/Title";
import FormPrintSummary from "@/components/organisms/FormPrintSummary";
import MainLayout from "@/components/templates/MainLayout";

const PrintSummary = () => {
    return (
        <MainLayout>
            <Title title="Cetak Rekap" subtitle="Mencetak Rekap Sesuai Kebutuhan" />
            <FormPrintSummary />
        </MainLayout>
    );
};

export default PrintSummary;
