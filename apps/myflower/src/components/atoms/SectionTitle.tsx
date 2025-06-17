function SectionTitle({ children, className = "text-xl font-bold" }: { children: React.ReactNode, className?: string }) {
    return <h1 className={`text-gray-800 ${className}`}>{children}</h1>;
}

export default SectionTitle;
