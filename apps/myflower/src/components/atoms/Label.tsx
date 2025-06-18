interface LabelProps {
    id: string;
    children?: React.ReactNode;     
    className?: string;
}
function Label({ id, children, className }: LabelProps) {
    return <label htmlFor={id} className={`text-slate-500 font-medium ${className}`}>{children}</label>;
}

export default Label;
