import { formatters } from "@/utils";

interface BadgeProps {
    className: string;
    size: string;
    field: string;
}

function Badge({ className, size, field }: BadgeProps) {
    return (
        <div className={`${size} ${className} py-1 px-2 flex justify-center items-center rounded-md text-white`}>
            <h1>{formatters.formatCapital(field)}</h1>
        </div>
    );
}

export default Badge;
