import React from "react";

function Card({ children, className, onClick }: { children: React.ReactNode; className?: string, onClick?: (e?: React.MouseEvent) => void }) {
    return <div className={`bg-white rounded-lg shadow p-4 ${className}`} onClick={onClick}>{children}</div>;
}

export default Card;
