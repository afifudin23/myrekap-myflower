function SectionTitle({ children, className = "text-xl font-bold" }: { children: React.ReactNode, className?: string }) {
    return <h2 className={`text-gray-800 ${className}`}>{children}</h2>;
}

export default SectionTitle;
