import formatters from "@/utils/formatters";

export default function Badge({ className, size ="w-28 text-sm", field }: { className: string; size?: string; field: string }) {
    return (
        <>
            <div className={`${size} h-8 ${className} flex justify-center items-center rounded-md font-semibold text-white 2xl:font-bold`}>
                <h1>{formatters.formatCapital(field)}</h1>
            </div>
        </>
    );
}
