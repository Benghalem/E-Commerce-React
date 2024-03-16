import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetWishlist, productsFullInfoCleaner } from "@store/wishlist/wishlist"

// components
import { Product } from "@components/ecoomerc";
import { Loading } from "@components/feadback";
import { GridList, Heading } from "@components/common";
import { TProduct } from "@costopTypes/product";


const Wishlist = () => {
    const dispatch = useAppDispatch()

    const { loading, error, productFullInfo } = useAppSelector((state) => state.wishlist);
    const cartItems = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        dispatch(actGetWishlist());
        return () => {
            dispatch(productsFullInfoCleaner());
        }
    }, [dispatch]);


    const records = productFullInfo.map((el) => ({
        ...el,
        quantity: cartItems[el.id],
        isLiked: true
      }))

  return (
    <>
      <Heading>Your Wishlist</Heading>
      <Loading status={loading} error={error}>
          <GridList<TProduct> 
            records={records} 
            renderItem={(records) => <Product {...records} />} 
        />
      </Loading>
    </>
  );
}
export default Wishlist