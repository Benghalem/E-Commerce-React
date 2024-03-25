import { memo, useEffect, useState } from "react";
import { useAppDispatch, /* useAppSelector */ } from "@store/hooks";
import { actLikeTogle } from "@store/wishlist/wishlist";
import  { addToCart,/* itemQuantitiyAvailabilityCheckingSelector */}  from "@store/cart/cartSlice";
// styles
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
// svg
import Like from "@assets/svg/like.svg?react"
import LikeFull from "@assets/svg/like-fill.svg?react"

// TYPE
import { TProduct } from "@types";


const { product, productImg, maximumNotice, wishListBtn } = styles;
const Product = memo( ({id, title, price, img, max, quantity, isLiked }: TProduct ) => {

  const dispatch = useAppDispatch();
  const [isBtnClick, setBtnClick] = useState(0);
  const [isBtnDisbled, setBtnDisbled] = useState(false);
  // loading state 
  const [isLoading, setLoading] = useState(false);

 /*  const {currentRemaniningQuntitiy, quntitiyReachedMax}= useAppSelector ( (state) =>
    // state.cart.items[id] || 0
    itemQuantitiyAvailabilityCheckingSelector(state.cart.items[id], max)
    
    ); */
  const currentRemaniningQuntitiy = max - (quantity ?? 0 );
  const quntitiyReachedMax = currentRemaniningQuntitiy <0 ? true : false;


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

  const likeTogleHandler = () => {
    // if is loadding dont send request again
    if(isLoading){
      return
    }
    setLoading(true);
    dispatch(actLikeTogle(id))
     .unwrap()
     .then(() => {setLoading(false)})
     // when server error or server down 
     .catch(() => {setLoading(false)})
  }

  console.log("fiare prodect")
  return (
    <div className={product}>
      <div className={wishListBtn} onClick={likeTogleHandler}>
        {isLoading ? (
          <Spinner animation="border" size="sm" variant="primary"/>
        ): isLiked ? ( 
          <LikeFull/>
        ) : (
          <Like/> 
        )}
       
      </div>
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
});

export default Product;