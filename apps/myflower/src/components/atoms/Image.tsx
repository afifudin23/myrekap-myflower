interface AvatarProps {
    src: string;
    alt?: string;
    className?: string;
}

function Image({ src, alt, className }: AvatarProps) {
    return <img src={src} alt={alt} className={`rounded-xl object-contain border border-gray-300 ${className}`} />;
}

export default Image;
