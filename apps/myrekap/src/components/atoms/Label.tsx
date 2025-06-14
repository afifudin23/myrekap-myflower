export default function Label({ id, children }: { id: string; children: string }) {
    return (
        <label htmlFor={id} className="block mb-2 text-sm 2xl:text-lg font-light text-gray-900">
            {children}
        </label>
    );
}
