interface LabelProps {
    id: string;
    children: string;
}

function Label({ id, children }: LabelProps) {
    return (
        <label htmlFor={id} className="block mb-2 text-sm 2xl:text-lg font-light text-gray-900">
            {children}
        </label>
    );
}

export default Label;
