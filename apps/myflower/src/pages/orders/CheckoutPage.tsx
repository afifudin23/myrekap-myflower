// src/pages/checkout.tsx

import BackButton from "@/components/atoms/BackButton";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";
import MainLayout from "@/components/templates/MainLayout";

function CheckoutPage() {
    return (
        <MainLayout className="space-y-6 max-w-4xl mx-auto">
            <BackButton>Kembali ke Keranjang</BackButton>

            <SectionTitle className="text-3xl font-bold">Checkout</SectionTitle>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Informasi Pengiriman */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Informasi Pengiriman</h3>
                    <input type="text" placeholder="Nama Penerima" className="input-style" />
                    <input type="text" placeholder="Alamat Lengkap" className="input-style" />
                    <input type="text" placeholder="Nomor Telepon" className="input-style" />
                    <input type="text" placeholder="Catatan (Opsional)" className="input-style" />
                </div>

                {/* Ringkasan Pesanan */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Ringkasan Pesanan</h3>
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Total Item</span>
                            <span>3</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold">
                            <span>Total Harga</span>
                            <span>Rp 250.000</span>
                        </div>
                    </div>

                    <Button type="button" colors={{ primary: "#8f40f6", hover: "#773dc4" }} className="w-full p-3">
                        Bayar Sekarang
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}

export default CheckoutPage;
