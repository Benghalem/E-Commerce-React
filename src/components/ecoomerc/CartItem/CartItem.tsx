import { memo } from "react";
import { Form, Button } from "react-bootstrap";
import { TProduct } from "@costopTypes/product";
import styles from "./styles.module.css";

const {cartItem, product, productImg, productInfo, cartItemSelection} = styles;

type CartItemProps = TProduct & {
  changeQuantityHandler: (id:number, quantity:number) => void
  removeItemHandlr: (id:number) => void
};
const CartItem = memo (({
  id, 
  title, 
  price, 
  img, 
  max, 
  quantity, 
  changeQuantityHandler,
  removeItemHandlr
}:CartItemProps) => {
  // render option list
  const renderOptions = Array (max).fill(0).map((_,idx)=> {
    const quantity = ++idx;
    return <option key={quantity} value={quantity}>{quantity}</option>
  })

  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value;
    changeQuantityHandler(id, quantity);
  }

  return (
    <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{Number(price).toFixed(2)} DZ </h3>
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={() => removeItemHandlr(id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1" >Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity} >
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  
} )

export default CartItem