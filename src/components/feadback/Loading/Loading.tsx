// skeletons
import CategorySkeleton from "../skeletons/CategorySkeletons/CategorySkeletons";
import CartSkeleton from "../skeletons/CartSkeletons/CartSkeletons";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
// error handling
import LottieHandler  from "../LottieHandler/LottieHandler";
// types
import { TLoading } from "@types"

// handle skeletons types
const skeletonsTypes = {
    category: CategorySkeleton,
    product: ProductSkeleton,
    cart: CartSkeleton
}
type LoadungProps = {
    status: TLoading;
    error : null | string;
    children: React.ReactNode
    type?: keyof typeof skeletonsTypes; // or type?: "category" | "product" | "cart"
}

const Loading = ( {status, error, children, type } : LoadungProps) => {
    // component chose type of skeletonTypes
    const Component = skeletonsTypes[type || "category"];

    if(status === "pending") {
        return(
            <Component/>
        )
    }
    if(status === "failed"){
        return(
            <div>
                <LottieHandler type="error" message={error as string}/>
            </div>
        )
    }
    return (
    <>{children}</>
    )
}

export default Loading 