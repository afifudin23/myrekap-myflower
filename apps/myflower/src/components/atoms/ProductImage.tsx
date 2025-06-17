interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
}

const ProductImage = ({ src, alt, className = "max-w-sm" }: ProductImageProps) => {
    return (
        <div className={`overflow-hidden rounded-xl group ${className}`}>
            <img
                src={src}
                alt={alt}
                className="w-full object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
            />
        </div>
    );
};

export default ProductImage;
