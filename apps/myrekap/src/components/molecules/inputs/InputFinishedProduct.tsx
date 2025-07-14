import { ButtonSmall } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";

function InputFinishedProduct({
    control,
    handleSubmit,
    handleFinishedProduct,
    setIsOpenFinishedProduct,
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
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={() => setIsOpenFinishedProduct(false)}
                    >
                        <form
                            onSubmit={handleSubmit(handleFinishedProduct)}
                            className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-4/5 flex flex-col justify-center gap-5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <label htmlFor="finishedProduct" className="block text-lg 2xl:text-xl  text-gray-900">
                                Upload Produk Selesai
                            </label>
                            <div
                                {...getRootProps()}
                                className="border-2 border-dashed p-4 rounded-lg cursor-pointer w-full h-5/6 flex items-center justify-center text-xl"
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
                            <ButtonSmall type="submit" className="w-1/6 mx-auto py-1 2xl:py-2 px-4 font-semibold bg-blue-600 hover:bg-blue-700">
                                Simpan
                            </ButtonSmall>
                        </form>
                    </div>
                );
            }}
        />
    );
}

export default InputFinishedProduct;
