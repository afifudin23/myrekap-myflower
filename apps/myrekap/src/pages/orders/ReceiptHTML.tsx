import { formatters } from "@/utils";

const ReceiptHTML = ({ order }: { order: any }) => {
    return (
        <div style={{ fontFamily: "sans-serif", padding: "20px", width: "80mm" }}>
            <h2 style={{ textAlign: "center" }}>MyFlower</h2>
            <p>
                <strong>Kode Pesanan:</strong> {order.orderCode}
            </p>
            <p>
                <strong>Nama:</strong> {order.customerName}
            </p>
            <p>
                <strong>Status:</strong> {order.status}
            </p>
            <p>
                <strong>Pembayaran:</strong> {order.paymentMethod} ({order.paymentProvider})
            </p>

            <hr />

            <h4>Produk:</h4>
            <ul>
                {order.items.map((item: any, i: number) => (
                    <li key={i}>
                        {item.name} - Qty: {item.quantity} - {formatters.formatRupiah(item.price)} <br />
                        Total: {formatters.formatRupiah(item.price * item.quantity)}
                    </li>
                ))}
            </ul>

            <hr />

            <p>
                <strong>Total:</strong> {formatters.formatRupiah(order.total)}
            </p>

            <div style={{ marginTop: "40px" }}>
                <p>TTD Pelanggan:</p>
                <div style={{ border: "1px dashed #aaa", height: "60px", width: "100%" }}></div>
            </div>
        </div>
    );
};

export default ReceiptHTML;
