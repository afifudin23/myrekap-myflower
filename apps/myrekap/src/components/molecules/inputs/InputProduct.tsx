import { Label } from "@/components/atoms";
import { axiosInstance, formatters } from "@/utils";
import { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

function InputProduct({ label, name, control, setValue }: any) {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    useEffect(() => {
        const getCategoryProducts = async () => {
            try {
                const response = await axiosInstance.get("/products");
                setCategoryProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCategoryProducts();
    }, []);

    return (
        <div>
            <Label id={name} children={label} />

            <div className="space-y-6 w-full mx-auto p-4 border rounded-xl shadow">
                {fields.map((item, index) => (
                    <div key={item.id} className="border p-4 rounded-lg space-y-3 relative bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Produk #{index + 1}</h4>
                            {fields.length > 1 && (
                                <button type="button" onClick={() => remove(index)} className="text-red-600 text-sm">
                                    Hapus
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {/* Product ID */}
                            <Controller
                                name={`items.${index}.productId`}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm">Kategori Bunga</label>
                                        <select
                                            {...field}
                                            onChange={(e) => {
                                                const selected: any = categoryProducts.find(
                                                    (p: any) => p.id === e.target.value
                                                );
                                                field.onChange(e); // update productId
                                                setValue(`items.${index}.price`, selected?.price ?? 0); // set hidden price
                                            }}
                                            className="w-full border p-2 rounded"
                                            required
                                        >
                                            <option value="">-- Pilih Kategori --</option>
                                            {categoryProducts.map((product: any) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name} - {formatters.formatRupiah(product.price)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            />

                            {/* Quantity */}
                            <Controller
                                name={`items.${index}.quantity`}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm">Jumlah (Qty)</label>
                                        <input
                                            {...field}
                                            type="number"
                                            min={1}
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    </div>
                                )}
                            />

                            {/* Message */}
                            <Controller
                                name={`items.${index}.message`}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm">Pesan (Optional)</label>
                                        <textarea {...field} className="w-full border p-2 rounded" />
                                    </div>
                                )}
                            />

                            {/* Hidden price */}
                            <Controller
                                name={`items.${index}.price`}
                                control={control}
                                render={({ field }) => <input type="hidden" {...field} />}
                            />
                        </div>
                    </div>
                ))}

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => append({ productId: "", quantity: 1, message: "", price: 0 })}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        + Tambah Produk
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputProduct;
