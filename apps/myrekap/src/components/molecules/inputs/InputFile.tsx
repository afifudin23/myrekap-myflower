import { Label } from "@/components/atoms";
import { InputFileProps } from ".";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";

type ImageItem = File | { fileName: string; size: number; secureUrl: string; publicId: string };

const InputFile = React.forwardRef<HTMLDivElement, InputFileProps>(
    ({ label, name, control, error, disabled = false, setValue, getValues }, ref) => {
        return (
            <div className="input-text" ref={ref}>
                <Label id={name} children={label} />
                <Controller
                    name={name as any}
                    control={control}
                    render={({ field: { onChange, value = [] } }) => {
                        const { getRootProps, getInputProps, isDragActive } = useDropzone({
                            accept: { "image/*": [] },
                            multiple: true,
                            onDrop: (acceptedFiles) => {
                                if (disabled) return;
                                const newFiles = acceptedFiles.map((file) => file);
                                onChange([...value, ...newFiles]);
                            },
                            disabled,
                        });

                        const handleRemove = (index: number) => {
                            const updated = [...value];
                            const removedItem = updated[index];

                            if (!(removedItem instanceof File) && removedItem?.publicId) {
                                const current = getValues("publicIdsToDelete") || [];
                                setValue("publicIdsToDelete", [...current, removedItem.publicId]);
                            }

                            updated.splice(index, 1);
                            onChange(updated);
                        };

                        const handleClearAll = () => {
                            const publicIdsToRemove = value
                                .filter((item: ImageItem) => !(item instanceof File) && item?.publicId)
                                .map((item: any) => item.publicId);

                            const current = getValues("publicIdsToDelete") || [];
                            setValue?.("publicIdsToDelete", [...current, ...publicIdsToRemove]);

                            onChange([]);
                        };

                        return (
                            <div
                                {...getRootProps()}
                                className={`p-12 flex flex-col items-center justify-center border-2 border-dashed rounded-lg text-center text-sm 2xl:text-lg ${
                                    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                }`}
                            >
                                <input {...getInputProps()} />
                                <div>
                                    {!disabled ? (
                                        isDragActive ? (
                                            <p>Drop file di sini...</p>
                                        ) : (
                                            <p>Drag & drop file, atau klik untuk memilih</p>
                                        )
                                    ) : (
                                        <p className="text-gray-500">Upload dinonaktifkan</p>
                                    )}
                                </div>

                                {Array.isArray(value) && value.length > 0 && (
                                    <div className="w-full mt-4">
                                        <div className="mb-2 flex justify-between">
                                            <p className="font-semibold">File Terpilih:</p>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleClearAll();
                                                }}
                                                className="text-red-500 text-sm hover:underline"
                                            >
                                                Hapus semua
                                            </button>
                                        </div>
                                        <ul className="space-y-4">
                                            {value.map((file: ImageItem, i: number) => {
                                                const isFile = file instanceof File;
                                                const imageUrl = isFile ? URL.createObjectURL(file) : file.secureUrl;
                                                const fileName = isFile ? file.name : file.fileName;
                                                const fileSize = (file.size / 1024).toFixed(2);

                                                return (
                                                    <li
                                                        key={i}
                                                        className="border p-2 rounded shadow bg-white text-center"
                                                    >
                                                        <p>
                                                            <strong>Nama:</strong> {fileName}
                                                        </p>
                                                        <p>
                                                            <strong>Ukuran:</strong> {fileSize} KB
                                                        </p>
                                                        {imageUrl && (
                                                            <img
                                                                src={imageUrl}
                                                                alt={`preview-${i}`}
                                                                className="w-40 h-auto mt-2 rounded object-cover mx-auto"
                                                            />
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRemove(i);
                                                            }}
                                                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
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
