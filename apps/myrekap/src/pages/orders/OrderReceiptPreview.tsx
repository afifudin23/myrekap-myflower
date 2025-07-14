import { OrderReceipt } from "@/components/organisms/orders";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";

function OrderReceiptPreview() {
    const location = useLocation();
    const field = location.state as { data: any };
    const { finishedProduct, isPaid, orderStatus, paymentProof, orderDate, ...data }: any = field;

    return (
        <PDFViewer width="100%" height="1000vh">
            <OrderReceipt data={data} />
        </PDFViewer>
    );
}

export default OrderReceiptPreview;
