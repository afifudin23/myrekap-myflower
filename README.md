
---

## 🌸 MyFlower

- Aplikasi untuk pelanggan melakukan pemesanan bunga secara online.
- Fitur:
  - Pemilihan produk bunga
  - Keranjang belanja
  - Checkout dengan metode pembayaran (gateway)
  - Riwayat pesanan
  - Penilaian produk (rating)

📦 Teknologi: `React`, `Tailwind CSS`, `Axios`

---

## 📊 MyRekap

-   Dashboard internal untuk admin/karyawan mencatat pesanan dari pelanggan yang datang langsung atau offline.
-   Fitur:
    -   Tambah pesanan manual (offline)
    -   Input metode pembayaran (Cash / Transfer)
    -   Upload bukti pembayaran (jika transfer)
    -   Filter dan pencarian riwayat pesanan
    -   Rekap penjualan bulanan

📦 Teknologi: `React`, `Tailwind CSS`, `Chart.js`, `Cloudinary`

---

## 🔧 Backend API

-   Backend berbasis Express.js yang melayani permintaan data dari MyFlower & MyRekap.
-   Fitur:
    -   CRUD Produk
    -   CRUD Pesanan
    -   Upload gambar via Cloudinary
    -   Autentikasi pengguna
    -   Penyimpanan data menggunakan `Prisma ORM + MySQL`

📦 Teknologi: `Express`, `Prisma`, `Cloudinary`, `JWT`, `CORS`

---

## 🚀 Cara Menjalankan Lokal

```bash
# 1. Clone repo
git clone https://github.com/afifudin23/myrekap-myflower
cd apps

# 2. Install dependencies (di tiap folder)
cd apps/backend && npm install
cd apps/myflower && npm install
cd apps/myrekap && npm install

# 3. Jalankan backend
cd apps/backend && npm run dev

# 4. Jalankan frontend MyFlower
cd apps/myflower && npm run dev

# 5. Jalankan frontend MyRekap
cd apps/myrekap && npm run dev
```
