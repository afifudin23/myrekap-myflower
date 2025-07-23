// interface TextAreaProps {
//     value: string;
//     onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
//     placeholder?: string;
// }

const TextArea = ({ value, onChange, disabled, placeholder }: any) => (
    <textarea
        className={`w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
    />
);

export default TextArea;
