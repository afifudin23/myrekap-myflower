interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
}

function Image({ src, alt, className }: ImageProps) {
    return <img src={src} alt={alt} className={`rounded-xl object-cover border border-gray-300 ${className}`} />;
}

export default Image;
