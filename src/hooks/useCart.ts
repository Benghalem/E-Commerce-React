import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetProductByItems, cartItemsChangeQuantity, cartItemRemove, cleanCartProductFullInfo } from "@store/cart/cartSlice"


const useCart = () => {
    const dispatch = useAppDispatch()
    const { items,productFullInfo, loading, error } = useAppSelector(state => state.cart)

    useEffect(() => {
       const promise = dispatch(actGetProductByItems())

        return () => {
          promise.abort()
          dispatch(cleanCartProductFullInfo())

        }
    },[dispatch]);

    const products = productFullInfo.map((el)=> ({
      ...el, 
      quantity: items[el.id]
    }));

    const changeQuantityHandler = useCallback ( (id:number, quantity:number) => {
      dispatch(cartItemsChangeQuantity({id, quantity}))
    },[dispatch])
    
    const removeItemHandlr = useCallback((id:number) => {
      dispatch(cartItemRemove(id))
    },[dispatch])
    
  return (
    { items,productFullInfo, loading, error, products, changeQuantityHandler, removeItemHandlr }
  )
}

export default useCart