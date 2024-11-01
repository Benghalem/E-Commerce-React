
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@assets/svg/cart.svg?react"
import styles from './styles.module.css'
import { useAppSelector } from "@store/hooks";
import { getCaretTotaleQuntitySelector } from "@store/cart/cartSlice";

// import styles
const { container,totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const caetItems = useAppSelector(getCaretTotaleQuntitySelector);
  // style animation pumpCarQuntity
  const quantityStyle = `${totalNum}  ${isAnimate ? pumpAnimate : ""} `

  useEffect(() => {
    if (!caetItems) {
      return;
    }
    setIsAnimate(true) 
    const debounse = setTimeout(() => {
      setIsAnimate(false)  
    },300);

    return () => clearTimeout(debounse)
  }, [caetItems])

/* old code to get the total quantity */
/*const caetItems = useAppSelector ((state) => state.cart.items)
  // sum the quantity
  const totalQuntity = Object.values(caetItems).reduce((acc, value) => {
    return acc + value
  }, 0) */
  const navigate = useNavigate();
  
  return (
    <div className={container} onClick={() => navigate("/cart")}>
      <div className={iconWrapper}>
        <Logo title="basket icon" />
        {caetItems > 0 && (
          <div className={quantityStyle}>{caetItems}</div>
        )}
      </div>
      <h3>Cart</h3>
    </div>
  );
};

export default HeaderBasket