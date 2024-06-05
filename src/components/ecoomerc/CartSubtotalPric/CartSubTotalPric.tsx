import { useAppDispatch } from "@store/hooks";
import actPlaceOrder from "@store/orders/act/actPlaceOrder";
import {clearCartAfterPlaceOrder} from "@store/cart/cartSlice";
import { useState } from "react";
import { TProduct } from "@types";
import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";


type CartSubtotalPricProps  = {products:TProduct[], useAccessToken:string | null | undefined}

const CartSubtotalPric = ({products, useAccessToken}:CartSubtotalPricProps ) => {
  // dispatch order
  const dispatch = useAppDispatch();
  // git lading from stete 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // show modal or not 
  const [showModal, setShowModal] = useState(false);
// subtotal calculation 
  const Subtotal = products.reduce((acc, el)=> {
    const price =   el.price
    const quantity = el.quantity
    if(quantity && typeof quantity === "number"){
      return acc + price * quantity
    } else {
      return acc
    }
    
  }, 0)
// handle close modal
  const modelHandle = () => {
    setShowModal(!showModal)
    setError(null)
  }
// dispatch place order and show modal 
  const placeOrderHandler = () => {
    setLoading(true)
    dispatch(actPlaceOrder(Subtotal)).
      unwrap()
      // clear cart after order and close modal
      .then(( ) => {
        dispatch(clearCartAfterPlaceOrder())
        setShowModal(false)
      })
      // error handling
      .catch((error) => {
        setError(error)
      })
      .finally(() => setLoading(false))
  }
  return (
    <>
     <Modal show={showModal} onHide={modelHandle} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place this order with Subtotal:{" "}
          {Subtotal.toFixed(2)} DZ
          {/* Show loading if loading is false */}
          {!loading && error && (
            <p style={{color:"DC3545" , marginTop:"10px"}}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modelHandle}>
            Close
          </Button>
          <Button variant="info" style={{color:"white"}} onClick={placeOrderHandler}>
            {loading ? (
              <>
                <Spinner animation="border" role="status"></Spinner> Loading...
              </>
            ) : (
              "Confirm" 
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{Subtotal.toFixed(2)}</span>
    </div>
    { useAccessToken && 
      <div className={styles.container}>
          <span></span>
          <span>
            <Button variant="info" style={{color:"white"}} onClick={modelHandle}>
              Place Order
            </Button>
          </span>
      </div>
    }
    </>
  )
}

export default CartSubtotalPric