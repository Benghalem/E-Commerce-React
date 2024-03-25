import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetWishlist, cleanWishlistProductFullInfo } from "@store/wishlist/wishlist"

const useWishlist = () => {
    const dispatch = useAppDispatch()

    const { loading, error, productFullInfo } = useAppSelector((state) => state.wishlist);
    const cartItems = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        const promise = dispatch(actGetWishlist());
        return () => {
            promise.abort();
            dispatch(cleanWishlistProductFullInfo());

        }
    }, [dispatch]);


    const records = productFullInfo.map((el) => ({
        ...el,
        quantity: cartItems[el.id],
        isLiked: true
      }))
  return  { records,loading, error, productFullInfo } 
}

export default useWishlist