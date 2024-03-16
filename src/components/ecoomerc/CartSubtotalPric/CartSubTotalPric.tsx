import { TProduct } from "@costopTypes/product";
import styles from "./styles.module.css";


type CartSubtotalPricProps  = {products:TProduct[]}

const CartSubtotalPric = ({products}:CartSubtotalPricProps ) => {

  const Subtotal = products.reduce((acc, el)=> {
    const price =   el.price
    const quantity = el.quantity
    if(quantity && typeof quantity === "number"){
      return acc + price * quantity
    } else {
      return acc
    }
    
  }, 0)
  return (
    <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{Subtotal.toFixed(2)}</span>
    </div>
  )
}

export default CartSubtotalPric