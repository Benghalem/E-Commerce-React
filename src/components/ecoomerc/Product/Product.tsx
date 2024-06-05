import { memo, useEffect, useState } from "react";
import { useAppDispatch, /* useAppSelector */ } from "@store/hooks";
// like and deslike component
import { actLikeTogle } from "@store/wishlist/wishlist";
import  { addToCart,/* itemQuantitiyAvailabilityCheckingSelector */}  from "@store/cart/cartSlice";
// import productInfo component and styles
import ProductInfo from "../ProductInfo/ProductInfo";
// styles
import { Button, Spinner, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
// svg
import Like from "@assets/svg/like.svg?react"
import LikeFull from "@assets/svg/like-fill.svg?react"

// TYPE
import { TProduct } from "@types";


const { maximumNotice, wishListBtn } = styles;
const Product = memo( ({id, title, price, img, max, quantity, isLiked, isAuthenticated }: TProduct ) => {
// show modal login or not 
  const [showModal, setShowModal] = useState(false);
// dispatch and state between like and deslike
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
    // Show modal login or not when selected likeBtn
    if( isAuthenticated ) {
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

    } else {
      setShowModal(true)
    }
    
  }
  console.log("fiare prodect")
  return (
    <>
      <Modal show= {showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to login to add product to your wishlist
        </Modal.Body>
      </Modal>

    <ProductInfo title={title} price={price} img={img} diriction="row" >
      <div className={wishListBtn} onClick={likeTogleHandler}>
        {isLoading ? (
          <Spinner animation="border" size="sm" variant="primary"/>
        ): isLiked ? ( 
          <LikeFull/>
        ) : (
          <Like/> 
        )}    
      </div>
      <p className= {maximumNotice}>
        {quntitiyReachedMax ? 
        " maximum quantity reached " : 
        currentRemaniningQuntitiy} in stock </p>
      <Button 
        variant="info" 
        style={{ color: "white", width: "100%" }} 
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
    </ProductInfo>
    </>
  );
});

export default Product;