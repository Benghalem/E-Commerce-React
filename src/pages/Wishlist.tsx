// hooks
import useWishlist from "@hooks/useWishlist";
// components
import { Product } from "@components/ecoomerc";
import { Loading } from "@components/feadback";
import { GridList, Heading } from "@components/common";
import { TProduct } from "@types";


const Wishlist = () => {
    const { loading, error, records } = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist"/>
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