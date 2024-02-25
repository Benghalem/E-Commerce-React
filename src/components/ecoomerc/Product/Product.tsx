import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import  {
  addToCart, 
  itemQuantitiyAvailabilityCheckingSelector
}  from "@store/cart/cartSlice";
// styles
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
// TYPE
import { TProduct } from "@costopTypes/product";


const { product, productImg, maximumNotice } = styles;
const Product = ({id, title, price, img, max }: TProduct) => {

  const dispatch = useAppDispatch();
  const [isBtnClick, setBtnClick] = useState(0);
  const [isBtnDisbled, setBtnDisbled] = useState(false);

  const {currentRemaniningQuntitiy, quntitiyReachedMax}= useAppSelector ( (state) =>
    // state.cart.items[id] || 0
    itemQuantitiyAvailabilityCheckingSelector(state.cart.items[id], max)
    
    );
 // const currentRemaniningQuntitiy = max - currentQuntityInCart;
 // const quntitiyReachedMax = currentRemaniningQuntitiy <0 ? true : false;


  useEffect(() => {
    if(!isBtnClick){
      return;
    }
    setBtnDisbled(true);
    const debounse = setTimeout (() => {
      setBtnDisbled(false);
    }, 300)

    return () => clearTimeout(debounse)
  }, [isBtnClick])
  const addToCaretHandler = () => {
    dispatch(addToCart(id));
    setBtnClick((prev) => prev + 1);
  }
  return (
    <div className={product}>
      <div className={productImg}>
        <img
          src={img}
          alt={title}
        />
      </div>
      <h2>{title}</h2>
      <h3>{price} DZ</h3>
      <p className= {maximumNotice}>
        {quntitiyReachedMax ? 
        " maximum quantity reached " : 
        currentRemaniningQuntitiy} in stock </p>
      <Button 
        variant="info" 
        style={{ color: "white" }} 
        onClick={addToCaretHandler}
        disabled={isBtnDisbled || quntitiyReachedMax}
        >
        {isBtnDisbled ? (
          <> 
            <Spinner animation="border" size="sm" /> Loading ... 
          </>
          ) :(   
            " Add to cart"
        )}    
      </Button>
    </div>
  );
};

export default Product;