interface AvatarProps {
    src: string;
    alt?: string;
}

export default function Avatar({ src, alt }: AvatarProps) {
    return (
        <img
            src={src}
            alt={alt}
            className="w-96 rounded-xl object-cover border border-gray-300"
        />
    );
}