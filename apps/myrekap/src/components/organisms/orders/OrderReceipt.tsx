// Receipt.jsx
import formatters from "@/utils/formatters";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";

Font.register({
    family: "Roboto Mono",
    src: "/assets/fonts/RobotoMono-Regular.ttf",
});
Font.register({
    family: "Roboto Mono SemiBold",
    src: "/assets/fonts/RobotoMono-SemiBold.ttf",
});

// Styling PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: "Roboto Mono",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "110%",
        opacity: 0.1,
        zIndex: -1,
    },
    title: {
        fontSize: 34,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Times-Roman",
    },
    viewRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
    textRow: {
        flex: 1,
        paddingLeft: 30,
    },

    viewBottom: { flexDirection: "row", justifyContent: "space-between", gap: 30, alignItems: "flex-end" },

    textBottom: {
        flex: 1,
        textAlign: "right",
        marginLeft: 35,
    },
    textBottomItem: { flex: 1, fontFamily: "Roboto Mono SemiBold" },
});

const OrderReceipt = ({ data }: any) => {
    const total =
        (Number(data.price.replace(/[^0-9]/g, "")) + Number(data.shippingCost.replace(/[^0-9]/g, ""))) *
        Number(data.quantity);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src="/assets/images/background.jpg" style={styles.background} fixed />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Image
                        src="/assets/images/logo.jpg"
                        style={{
                            width: 70,
                            height: 70,
                            marginBottom: 10,
                            borderRadius: 50,
                        }}
                    />
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        <Text style={styles.title}>Receipt</Text>
                        <Text style={styles.title}>Pembayaran</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        fontSize: 14,
                        fontFamily: "Roboto Mono SemiBold",
                        justifyContent: "space-between",
                        marginBottom: 10,
                    }}
                >
                    <Text style={{paddingLeft: 30}}>No: {data.invoiceNumber}</Text>
                    <Text>Date: {formatters.isoDateToStringDateTime(new Date())}</Text>
                </View>

                <View
                    style={{
                        marginHorizontal: 30,
                        borderTop: "1px solid black",
                        borderBottom: "1px solid black",
                        gap: 10,
                        paddingBottom: 10,
                        marginBottom: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                            paddingVertical: 10,
                            borderBottom: "1px solid black",
                            fontSize: 16,
                            fontFamily: "Roboto Mono SemiBold",
                        }}
                    >
                        <Text style={styles.textRow}>Item</Text>
                        <Text style={styles.textRow}>Keterangan</Text>
                    </View>

                    <View style={styles.viewRow}>
                        <Text style={styles.textRow}>Nama Customer</Text>
                        <Text style={styles.textRow}>{formatters.formatCustomerNameReceipt(data.customerName)}</Text>
                    </View>
                    <View style={styles.viewRow}>
                        <Text style={styles.textRow}>Kategori Customer</Text>
                        <Text style={styles.textRow}>{data.customerCategory}</Text>
                    </View>
                    <View style={styles.viewRow}>
                        <Text style={styles.textRow}>Kategori Bunga</Text>
                        <Text style={styles.textRow}>{data.flowerCategory}</Text>
                    </View>
                    <View style={styles.viewRow}>
                        <Text style={styles.textRow}>Pesan Ucapan</Text>
                        <Text style={styles.textRow}>{data.greetingMessage}</Text>
                    </View>
                    <View style={styles.viewRow}>
                        <Text style={styles.textRow}>Tanggal Pengiriman</Text>
                        <Text style={styles.textRow}>{data.deliveryDate}</Text>
                    </View>
                    <View style={styles.viewRow}>
                        <Text style={styles.textRow}>Harga</Text>
                        <Text style={styles.textRow}>
                            {data.price} ({data.quantity}x)
                        </Text>
                    </View>
                    <View style={styles.viewRow}>
                        <Text style={styles.textRow}>Biaya Pengiriman</Text>
                        <Text style={styles.textRow}>{data.shippingCost}</Text>
                    </View>
                </View>

                <View style={{ gap: 5, marginBottom: 70 }}>
                    <View
                        style={{
                            ...styles.viewBottom,
                            fontSize: 16,
                        }}
                    >
                        <Text style={styles.textBottom}>Total</Text>
                        <Text style={{ ...styles.textBottomItem, fontSize: 25 }}>{formatters.formatRupiah(total)}</Text>
                    </View>
                    <View style={styles.viewBottom}>
                        <Text style={styles.textBottom}>Status Pembayaran</Text>
                        <Text style={{ ...styles.textBottomItem, fontSize: 14 }}>{data.paymentStatus}</Text>
                    </View>
                    <View style={styles.viewBottom}>
                        <Text style={styles.textBottom}>Metode Pembayaran</Text>
                        <Text style={{ ...styles.textBottomItem, fontSize: 14 }}>{data.paymentMethod}</Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 60,
                        fontSize: 15,
                    }}
                >
                    <View style={{ flexDirection: "column", gap: 10, alignItems: "center" }}>
                        <Text>Owner,</Text>
                        <Image src="/assets/images/ttd-owner.png" style={{ width: 60, height: 60 }}></Image>
                        <Text>Fahri Septa M.</Text>
                    </View>
                    <View style={{ flexDirection: "column", gap: 75, alignItems: "center" }}>
                        <Text>Customer,</Text>
                        <Text>{formatters.formatCustomerNameReceipt(data.customerName)}</Text>
                    </View>
                </View>

                <View
                    style={{
                        textAlign: "center",
                        marginTop: 45,
                    }}
                >
                    <Text
                        style={{ borderBottom: "1px solid black", marginBottom: 10, paddingBottom: 10, fontSize: 14 }}
                    >
                        Terima Kasih !
                    </Text>
                    <Text>Toko Bunga Anda | +62 812 3456 789 | email123@gmail.com</Text>
                    <Text>Jl. Jend. Sudirman No.44, Pekauman, Kec. Tegal Barat, Kota Tegal, Jawa Tengah, 52125</Text>
                </View>
            </Page>
        </Document>
    );
};

export default OrderReceipt;
