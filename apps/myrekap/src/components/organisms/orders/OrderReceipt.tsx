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
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src="/assets/images/background.jpg" style={styles.background} fixed />

                {/* Header */}
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
                        style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 50 }}
                    />
                    <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                        <Text style={styles.title}>Order Receipt</Text>
                        <Text style={{ fontSize: 14 }}>No: {data.orderCode}</Text>
                        <Text style={{ fontSize: 12 }}>Date: {formatters.isoDateToStringDateTime(new Date())}</Text>
                    </View>
                </View>

                {/* Table Header */}
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
                            fontSize: 14,
                            fontFamily: "Roboto Mono SemiBold",
                        }}
                    >
                        <Text style={styles.textRow}>Product</Text>
                        <Text style={styles.textRow}>Qty</Text>
                        <Text style={styles.textRow}>Message</Text>
                        <Text style={styles.textRow}>Price</Text>
                    </View>

                    {/* Table Rows */}
                    {data.items.map((item: any) => (
                        <View key={item.id} style={styles.viewRow}>
                            <Text style={styles.textRow}>{item.product.name}</Text>
                            <Text style={styles.textRow}>{item.quantity}</Text>
                            <Text style={styles.textRow}>{item.message || "-"}</Text>
                            <Text style={styles.textRow}>{formatters.formatRupiah(item.totalPrice)}</Text>
                        </View>
                    ))}
                    {data.shippingCost !== 0 && (
                        <View style={styles.viewRow}>
                            <Text style={styles.textRow}>Pengiriman</Text>
                            <Text style={styles.textRow}>1</Text>
                            <Text style={styles.textRow}>-</Text>
                            <Text style={styles.textRow}>{formatters.formatRupiah(data.shippingCost)}</Text>
                        </View>
                    )}
                </View>

                {/* Summary */}
                <View style={{ gap: 5, marginBottom: 70 }}>
                    <View style={{ ...styles.viewBottom, fontSize: 16 }}>
                        <Text style={styles.textBottom}>Total Price</Text>
                        <Text style={{ ...styles.textBottomItem, fontSize: 25 }}>
                            {formatters.formatRupiah(data.totalPrice + data.shippingCost)}
                        </Text>
                    </View>
                    <View style={styles.viewBottom}>
                        <Text style={styles.textBottom}>Payment Status</Text>
                        <Text style={{ ...styles.textBottomItem }}>{data.paymentStatus}</Text>
                    </View>
                    <View style={styles.viewBottom}>
                        <Text style={styles.textBottom}>Payment Method</Text>
                        <Text style={{ ...styles.textBottomItem }}>
                            {data.paymentMethod?.split("_").join(" ") || "-"}
                        </Text>
                    </View>
                    <View style={styles.viewBottom}>
                        <Text style={styles.textBottom}>Provider</Text>
                        <Text style={{ ...styles.textBottomItem }}>
                            {data.paymentProvider?.split("_").join(" ") || "-"}
                        </Text>
                    </View>
                </View>

                {/* Spacer to push signature to bottom */}
                <View style={{ flexGrow: 1 }} />

                {/* Signature */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 60,
                        fontSize: 15,
                    }}
                >
                    <View style={{ flexDirection: "column", gap: 6, alignItems: "center" }}>
                        <Text>Owner,</Text>
                        <Image src="/assets/images/ttd-owner.png" style={{ width: 60, height: 60 }} />
                        <View style={{ width: 110, borderBottomWidth: 1, borderColor: "#ccc" }} />
                        <Text>Fahri Septa M.</Text>
                    </View>
                    <View style={{ flexDirection: "column", gap: 5, alignItems: "center" }}>
                        <Text>Customer,</Text>
                        <View
                            style={{
                                width: 110,
                                height: 70,
                                borderBottomWidth: 1,
                                borderColor: "#ccc",
                            }}
                        />
                        <Text>{formatters.formatCustomerNameReceipt(data.customerName)}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={{ textAlign: "center", marginTop: 45 }}>
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
