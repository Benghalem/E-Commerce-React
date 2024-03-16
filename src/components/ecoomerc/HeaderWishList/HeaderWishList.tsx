
import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import { useNavigate } from "react-router-dom";
import Logo from "@assets/svg/wishlist.svg?react"
import styles from './styles.module.css'

//import { useAppSelector } from "@store/hooks";

// import styles
const { container,totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderWishList = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  // show total number in header 
  const caetItems = useAppSelector ((state) => state.wishlist.itemsId);
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
    <div className={container} onClick={() => navigate("/wishlist")}>
      <div className={iconWrapper}>
        <Logo title="basket icon" />
        {caetItems.length > 0 && (
          <div className={quantityStyle}>{caetItems.length}</div>
        )}
      </div>
      <h3>Wishlist</h3>
    </div>
  );
};

export default HeaderWishList