import { Label } from "@/components/atoms";
import { InputFileProps } from ".";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";

const InputFile = React.forwardRef<HTMLDivElement, InputFileProps>(
    ({ label, name, control, error, disabled = false }, ref) => {
        const [preview, setPreview] = useState<string | null>(null);

        return (
            <div className="input-text" ref={ref}>
                <Label id={name} children={label} />
                <Controller
                    name={name as any}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        useEffect(() => {
                            if (value && value.secureUrl) {
                                setPreview(value.secureUrl);
                            }
                            if (disabled) {
                                setPreview(null);
                                onChange(null);
                            }
                        }, [value, disabled]);
                        const { getRootProps, getInputProps, isDragActive } = useDropzone({
                            accept: { "image/*": [] }, // Hanya menerima file gambar
                            multiple: false,
                            onDrop: (acceptedFiles) => {
                                if (disabled) return; // Blokir if not transfer
                                const selectedFile = acceptedFiles[0];
                                if (selectedFile) {
                                    onChange(selectedFile); // Save selected file name
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setPreview(reader.result as string); // Save image preview
                                    };
                                    reader.readAsDataURL(selectedFile);
                                }
                            },
                            disabled, // Nonactive if not transfer
                        });
                        return (
                            <div
                                {...getRootProps()}
                                className={`p-12 flex flex-col items-center justify-center border-2 border-dashed rounded-lg text-center text-sm 2xl:text-lg ${
                                    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                }`}
                            >
                                <div className="">
                                    <input {...getInputProps()} />
                                    {!disabled ? (
                                        isDragActive ? (
                                            <p>Drop file di sini...</p>
                                        ) : (
                                            <p>Drag & drop file di sini, atau klik untuk memilih file</p>
                                        )
                                    ) : (
                                        <p className="text-gray-500 ">Upload hanya untuk metode pembayaran transfer</p>
                                    )}
                                </div>

                                {value && (
                                    <div className="mt-4">
                                        <p>
                                            <strong className="mr-2">Nama File:</strong>
                                            {value instanceof File ? value.name : value.fileName}
                                        </p>
                                        <p>
                                            <strong className="mr-2">Ukuran:</strong>
                                            {(value.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                )}

                                {preview && (
                                    <div className="mt-4 w-64 flex flex-col gap-5 2xl:gap-7 items-center">
                                        <p className="leading-none">Preview:</p>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                        <button
                                            onClick={() => {
                                                onChange(null);
                                                setPreview(null);
                                            }}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    }}
                />
                {error && <p className="text-red-500 text-xs 2xl:text-sm">*{error}</p>}
            </div>
        );
    }
);

export default InputFile;
