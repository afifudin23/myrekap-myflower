// atoms/TextArea.tsx
interface TextAreaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}

const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => (
    <textarea
        className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

export default TextArea;
