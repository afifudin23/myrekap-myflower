import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";
import InputText from "@/components/molecules/inputs/InputText";
import MainLayout from "@/components/templates/MainLayout";

function CheckoutPage() {
    return (
        <MainLayout className="w-full space-y-6 max-w-4xl mx-auto">
            <BackButton>Kembali ke Keranjang</BackButton>
            <SectionTitle className="text-3xl font-bold">Checkout</SectionTitle>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Informasi Pengiriman */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Informasi Pengiriman</h3>
                    <InputText id="name" className="p-2">
                        Nama Penerima
                    </InputText>
                    <InputText id="message" className="p-2">
                        Pesan Ucapan
                    </InputText>
                    <InputText id="date" className="p-2">
                        Tanggal Pengiriman
                    </InputText>
                    <InputText id="address" className="p-2">
                        Alamat Pengiriman
                    </InputText>
                    <InputText id="address" className="p-2">
                        Kategori Pembeli
                    </InputText>
                    <InputText id="note" className="p-2">
                        Catatan (Opsional)
                    </InputText>
                </div>

                {/* Ringkasan Pesanan */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Ringkasan Pesanan</h3>
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm space-y-2">
                        <div>
                            <div className="text-sm flex justify-between">
                                <span className="font-medium">Bouquet A (1)</span>
                                <span className="ml-2">Rp 100.000</span>
                            </div>
                            <div className="text-sm flex justify-between">
                                <span className="font-medium">Bouquet B (2)</span>
                                <span className="ml-2">Rp 100.000</span>
                            </div>
                            <div className="text-sm flex justify-between">
                                <span className="font-medium">Bouquet C (1)</span>
                                <span className="ml-2">Rp 100.000</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Total Item</span>
                            <span>3</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold">
                            <span>Total Harga</span>
                            <span>Rp 250.000</span>
                        </div>
                    </div>
                    <InputText id="payment" className="p-2">
                        Metode Pembayaran
                    </InputText>
                    <Button type="button" colors={{ primary: "#8f40f6", hover: "#773dc4" }} className="w-full p-2">
                        Bayar Sekarang
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}

export default CheckoutPage;
