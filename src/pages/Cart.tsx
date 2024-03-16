import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetProductByItems, cartItemsChangeQuantity, cartItemRemove } from "@store/cart/cartSlice"
// components
import { Heading } from "@components/common"
import { Loading } from "@components/feadback"
import { CartItemList, CartSubtotalPric } from "@components/ecoomerc"

const Cart = () => {
    const dispatch = useAppDispatch()
    const { items,productFullInfo, loading, error } = useAppSelector(state => state.cart)

    useEffect(() => {
        dispatch(actGetProductByItems())
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
    <>
        <Heading> Your Cart </Heading> 
        <Loading status={loading} error={error}>
          { products.length ? (
            <>
              < CartItemList 
                products={products} 
                changeQuantityHandler={changeQuantityHandler}
                removeItemHandlr={removeItemHandlr}
                />         
              <CartSubtotalPric products={products}/>
            </>
          ):(
            "Your cart is empty"
          )}
          
        </Loading>
    
    </>
  )
}

export default Cart