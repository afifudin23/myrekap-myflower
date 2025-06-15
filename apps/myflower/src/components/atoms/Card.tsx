import React from "react";

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-white rounded-lg shadow p-4 ${className}`}>{children}</div>;
}

export default Card;
