

import { useAppSelector } from "@store/hooks";
import { getCaretTotaleQuntitySelector } from "@store/cart/cartSlice";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
// icons
import WishlistIcon from "@assets/svg/wishlist.svg?react"
import CartIcons from "@assets/svg/cart.svg?react"
// styles
import styles from "./style.module.css"
const { headerLeftBar } = styles

const HeaderLeftBar = () => {
    const wishlistTotalQuntity = useAppSelector((state) => state.wishlist.itemsId.length);
  const caetTotalQuntity = useAppSelector(getCaretTotaleQuntitySelector);
  return (
    <div className={headerLeftBar}>
            
    {/*  this old code 
    < HeaderWishList/>
     < HeaderBasket/> */}
     < HeaderCounter 
       pageNavegate="wishlist"
       title= "Wishlist"
       totalQuntity={wishlistTotalQuntity} 
       svgIcone={<WishlistIcon title="wishlist icon"/>}
       />
     < HeaderCounter 
       pageNavegate="cart" 
       title = "Cart"
       totalQuntity={caetTotalQuntity} 
       svgIcone={<CartIcons title="cart icon"/>}
     />
     
   </div>
  )
}

export default HeaderLeftBar