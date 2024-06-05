// hooks
import useCart from "@hooks/useCart"
// components
import { Heading } from "@components/common"
import { Loading, LottieHandler } from "@components/feadback"
import { CartItemList, CartSubtotalPric } from "@components/ecoomerc"

const Cart = () => {
    const { 
        products, 
        loading, 
        error, 
        changeQuantityHandler, 
        removeItemHandlr, 
        useAccessToken, 
        placeOrderStatus 
    } = useCart()
  return (
    <>
        <Heading title="Your Cart"/>
        <Loading status={loading} error={error} >
          { products.length ? (
            <>
              < CartItemList 
                products={products}  
                changeQuantityHandler={changeQuantityHandler}
                removeItemHandlr={removeItemHandlr}
                />         
              <CartSubtotalPric 
                products={products}
                useAccessToken={useAccessToken}
              />
            </>
          ): placeOrderStatus === "succeeded" ?  (
            <LottieHandler type="success" message="Your order has been placed successfully" />
          ) : (
            <LottieHandler type="empty" message="Your cart is empty"/>
          )}
          
        </Loading>
    
    </>
  )
}

export default Cart