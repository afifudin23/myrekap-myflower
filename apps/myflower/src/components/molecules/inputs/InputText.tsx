import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

interface InputTextProps {
    id: string;
    children: React.ReactNode;
    className?: string
}

function InputText({id, children, className}: InputTextProps) {
    return (
        <div>
            <Label id={id}>{children}</Label>
            <Input type="text" placeholder={`Masukkan ${children}`} className={className} />
        </div>
    );
}

export default InputText;
