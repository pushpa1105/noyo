import { Button } from "@/components/ui/button";
import { useAddtoCart, useAuth } from "@/hooks";
import { formatCurrency } from "@/utils";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import NoImage from '/images/no-image.jpg'

type ProductImage = {
    _id: string;
    public_id: string;
    url: string;
}

export type Product = {
    _id: string;
    images: ProductImage[];
    name: string;
    price: number;
}

interface ProductListCardProps {
    product: Product
}

export function ProductListCard({ product }: ProductListCardProps) {
    const { currentUser } = useAuth()
    const addProductToCart = useAddtoCart()
    const navigate = useNavigate()

    const handleAddToCart = () => {
        if (!currentUser) {
            toast.error('You need to login first.')
            navigate('/auth')
            return
        }

        addProductToCart.mutate({
            productId: product?._id,
            quantity: 1
        })
    }
    return (
        <div className="rounded-md border transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] p-2 cursor-pointer"
        onClick={() => navigate(`/products/${product?._id}/detail`)}
        >
            <img
                src={product?.images?.[0]?.url || NoImage}
                alt={product?._id}
                className="object-cover rounded-md border w-full min-h-[180px] max-h-[225px] bg-red-500"
            />
            <div className="my-2 h-[30px] leading-none">
                {product?.name || 'N/A'}
            </div>
            <div className="text-lg font-bold">
                {formatCurrency(product?.price)}
            </div>
            <Button className="w-full rounded-sm mt-2 p-2 text-balance cursor-pointer" onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
    );
}
