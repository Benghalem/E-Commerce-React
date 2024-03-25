import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
// store
import { actGetProductCatPrefix, cleanUpproductsRecords } from "@store/products/productSlice";

const useProduct = () => {
    const params = useParams();
    const productPrefix = params.prefix;
    const dispatch = useAppDispatch();
    const { loading, error, records } = useAppSelector((state) => state.products);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishListItems = useAppSelector((state) => state.wishlist.itemsId);
    useEffect(() => {
      /* let prefix : string;
      if (typeof params.prefix === "string") {
        prefix = params.prefix;
        dispatch(actGetProductCatPrefix(prefix) );
      } */ 
      // Or
      const promise =  dispatch(actGetProductCatPrefix(params.prefix as string));
      return () => {
        promise.abort();
        dispatch(cleanUpproductsRecords());
      }
    }, [dispatch, params]);
  
    const productFullInfo = records.map((el) => ({
      ...el,
      quantity: cartItems[el.id],
      isLiked: wishListItems.includes(el.id)
    }))
    /* this is old code move it in a component GridList */
    /* const productsList = records.length > 0 ? records.map(record => {
      return (
      <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product {...record} />
        </Col>
      )
    }): " there are no categories";
   */
  return {loading, error, productFullInfo, productPrefix} 
}

export default useProduct