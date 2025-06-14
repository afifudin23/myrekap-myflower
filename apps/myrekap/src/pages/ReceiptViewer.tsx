import Receipt from "@/components/organisms/Receipt";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";

function ReceiptPreview() {
    const location = useLocation();
    const field = location.state as { data: any };
    const { finishedProduct, isPaid, orderStatus, paymentProof, orderDate, ...data }: any = field;

    return (
        <PDFViewer width="100%" height="1000vh">
            <Receipt data={data} />
        </PDFViewer>
    );
}

export default ReceiptPreview;
