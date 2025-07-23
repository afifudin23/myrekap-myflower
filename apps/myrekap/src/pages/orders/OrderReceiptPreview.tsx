import { OrderReceipt } from "@/components/organisms/orders";
import { PDFViewer } from "@react-pdf/renderer";

function OrderReceiptPreview() {
    const order = JSON.parse(localStorage.getItem("orderDetail") || "{}");
    const { finishedProduct, isPaid, orderStatus, paymentProof, orderDate, ...data }: any = order;
    console.log(data)
    return (
        <PDFViewer width="100%" height="1000vh">
            <OrderReceipt data={data} />
        </PDFViewer>
    );
}

export default OrderReceiptPreview;
