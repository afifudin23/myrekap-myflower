interface ProductImageProps {
    src: string;
    alt: string;
}

const ProductImage = ({ src, alt }: ProductImageProps) => {
    return (
        <div className="max-w-sm overflow-hidden rounded-xl">
            <img
                src={src}
                alt={alt}
                className="w-full object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
            />
        </div>
    );
};

export default ProductImage;
