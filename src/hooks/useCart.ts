import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetProductByItems, cartItemsChangeQuantity, cartItemRemove, cleanCartProductFullInfo } from "@store/cart/cartSlice"
import { restOrderState } from "@store/orders/ordersSlice"

const useCart = () => {
    const dispatch = useAppDispatch()
    const { items,productFullInfo, loading, error } = useAppSelector(state => state.cart)

// access token btn 
    const useAccessToken = useAppSelector(state => state.auth.accessToken)

// order status 
    const placeOrderStatus = useAppSelector(state => state.ordersSlice.loading)


    const changeQuantityHandler = useCallback ( (id:number, quantity:number) => {
      dispatch(cartItemsChangeQuantity({id, quantity}))
    },[dispatch])
    
    const removeItemHandlr = useCallback((id:number) => {
      dispatch(cartItemRemove(id))
    },[dispatch])

    const products = productFullInfo.map((el) => ({
      ...el, 
      quantity: items[el.id]
    }));

    
    useEffect(() => {
      const promise = dispatch(actGetProductByItems())

        return () => {
          promise.abort()
          dispatch(cleanCartProductFullInfo())
          dispatch(restOrderState())
        }
    },[dispatch]);
    
  return (
    { items,productFullInfo, useAccessToken, loading, error, products, placeOrderStatus, changeQuantityHandler, removeItemHandlr }
  )
}

export default useCart