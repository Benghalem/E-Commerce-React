// hooks
import useCart from "@hooks/useCart"
// components
import { Heading } from "@components/common"
import { Loading } from "@components/feadback"
import { CartItemList, CartSubtotalPric } from "@components/ecoomerc"

const Cart = () => {
    const { products, loading, error, changeQuantityHandler, removeItemHandlr } = useCart()
  return (
    <>
        <Heading title="Your Cart"/>
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