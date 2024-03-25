
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from './styles.module.css'


// import styles
const { container,totalNum, pumpAnimate, iconWrapper } = styles;

type HeaderCounterProps = {
  totalQuntity: number,
  svgIcone: React.ReactNode,
  title: string
  pageNavegate: string
}
const HeaderCounter = ({ totalQuntity, svgIcone, pageNavegate, title }: HeaderCounterProps) => {
  const [isAnimate, setIsAnimate] = useState(false);

  // style animation pumpCarQuntity
  const quantityStyle = `${totalNum}  ${isAnimate ? pumpAnimate : ""} `

  useEffect(() => {
    if (!totalQuntity) {
      return;
    }
    setIsAnimate(true) 
    const debounse = setTimeout(() => {
      setIsAnimate(false)  
    },300);

    return () => clearTimeout(debounse)
  }, [totalQuntity])

/* old code to get the total quantity */
/*const caetItems = useAppSelector ((state) => state.cart.items)
  // sum the quantity
  const totalQuntity = Object.values(caetItems).reduce((acc, value) => {
    return acc + value
  }, 0) */
  const navigate = useNavigate();
  
  return (
    <div className={container} onClick={() => navigate(pageNavegate)}>
      <div className={iconWrapper}>
        {svgIcone}
        {totalQuntity > 0 && (
          <div className={quantityStyle}>{totalQuntity}</div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderCounter