import Card from "@/components/atoms/Card";

function ProductCard({ product }: any) {
    return (
        <Card>
            <img src={product.image} alt={product.name} className="w-full h-72 object-contain rounded-lg mb-2" />
            <h3 className="font-semibold text-base line-clamp-1">{product.name}</h3>
            <p className="text-primary font-bold">Rp {product.price.toLocaleString()}</p>
        </Card>
    );
}

export default ProductCard;
