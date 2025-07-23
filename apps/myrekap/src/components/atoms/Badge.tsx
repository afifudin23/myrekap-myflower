import { formatters } from "@/utils";

interface BadgeProps {
    className: string;
    field: string;
}

function Badge({ className, field }: BadgeProps) {
    return (
        <div className={`${className} flex justify-center items-center rounded-md text-white`}>
            <h1>{formatters.formatCapital(field)}</h1>
        </div>
    );
}

export default Badge;
