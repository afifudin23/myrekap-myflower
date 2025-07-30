import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";

function InputFinishedProduct({
    control,
    finishedProduct,
    errors,
}: any) {
    const [preview, setPreview] = useState<string | null>(finishedProduct);

    return (
        <Controller
            name="finishedProduct"
            control={control}
            render={({ field: { onChange, value } }) => {
                useEffect(() => {
                    if (value) setPreview(value);
                }, [value]);
                const { getRootProps, getInputProps, isDragActive } = useDropzone({
                    accept: { "image/*": [] }, // Hanya menerima file gambar
                    multiple: false,
                    onDrop: (acceptedFiles) => {
                        const selectedFile = acceptedFiles[0];
                        if (selectedFile) {
                            onChange(selectedFile); // Simpan file ke react-hook-form
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setPreview(reader.result as string); // Simpan preview
                            };
                            reader.readAsDataURL(selectedFile);
                        }
                    },
                });
                return (
                    <div className="w-full flex flex-col justify-center gap-3">
                        <label htmlFor="finishedProduct" className="block text-lg 2xl:text-xl text-gray-900">
                            Upload Produk Selesai
                        </label>
                        <div
                            {...getRootProps()}
                            className="border-2 border-dashed p-4 rounded-lg cursor-pointer w-full h-96 flex items-center justify-center text-xl"
                        >
                            <input {...getInputProps()} />
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview Produk Selesai"
                                    className="h-full mx-auto object-contain"
                                />
                            ) : isDragActive ? (
                                <p>Drop file di sini...</p>
                            ) : (
                                <p>Drag & drop file di sini, atau klik untuk memilih file</p>
                            )}
                            {errors.finishedProduct?.message && (
                                <p className="text-red-500 text-sm">*{errors.finishedProduct.message as string}</p>
                            )}
                        </div>
                        
                    </div>
                );
            }}
        />
    );
}

export default InputFinishedProduct;
