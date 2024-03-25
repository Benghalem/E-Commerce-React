import  CartItem  from "../CartItem/CartItem"
import { TProduct } from "@types"


type CartItemListProps = {
    products: TProduct[],
    changeQuantityHandler: (id:number, quantity:number) => void
    removeItemHandlr: (id:number) => void
}

const CartItemList = ( {
        products, 
        changeQuantityHandler,
        removeItemHandlr
    }:CartItemListProps) => {
    const renderList = products.map((el)=> (
    <CartItem 
        key={el.id} 
        {...el}
        changeQuantityHandler={changeQuantityHandler}
        removeItemHandlr={removeItemHandlr}
        />
    ));

  return (
    <div>{renderList}</div>
  )
}

export default CartItemList