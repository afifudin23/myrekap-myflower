import { useForm } from "react-hook-form";
import { axiosInstance } from "@/utils";
import { Button } from "@/components/atoms";
import { COLORS } from "@/constants/colors";

type FormData = {
    type: "IN" | "OUT";
    quantity: number;
    note: string;
};

function ProductManageStockPage() {
    const { id, name } = JSON.parse(localStorage.getItem("productDetail") || "{}");

    const { register, handleSubmit, watch, reset } = useForm<FormData>({
        defaultValues: {
            type: "IN",
            quantity: 1,
            note: "",
        },
    });

    const type = watch("type");

    const onSubmit = async (data: FormData) => {
        try {
            await axiosInstance.post(`/products/${id}/restock`, {
                ...data,
                note: data.note.trim() || (data.type === "IN" ? `Restock by admin` : `Manual deduction`),
            });
            alert("Stock updated!");
            reset();
        } catch (err) {
            alert("Failed to update stock");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded-xl shadow-md">
            {/* Subjudul Produk */}
            <div className="text-lg font-semibold text-gray-800">
                Restock Produk: <span className="text-blue-600">{name}</span>
            </div>

            {/* Pilih Jenis */}
            <select {...register("type")}>
                <option value="IN">⬆️ Stok Masuk</option>
                <option value="OUT">⬇️ Stok Keluar</option>
            </select>

            {/* Jumlah */}
            <input type="number" min={1} {...register("quantity", { required: true })} placeholder="Jumlah" />

            {/* Catatan */}
            <textarea
                {...register("note")}
                placeholder={type === "IN" ? "Catatan (mis. Restock manual)" : "Catatan (mis. Barang rusak)"}
            />
            <Button type="submit" className="mb-28 mt-20 2xl:mt-32 p-1 2xl:p-2 w-[15rem] 2xl:w-[20rem]" colors={COLORS}>
                {type === "IN" ? "Tambah Stok" : "Kurangi Stok"}
            </Button>
        </form>
    );
}

export default ProductManageStockPage;
