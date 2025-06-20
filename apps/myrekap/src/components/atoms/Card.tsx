interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e?: React.MouseEvent) => void;
}

function Card({ children, className, onClick }: CardProps) {
    return (
        <div className={`bg-white rounded-lg shadow p-4 ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

export default Card;
