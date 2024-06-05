// // import styles
import styles from "./styles.module.css";

// type generic between input and output form values
type ProductInfoProps = {
  title: string;
  img: string;
  price: number;
  quantity?: number;
  diriction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
const ProductInfo = ({
  title,
  img,
  price,
  diriction = "row",
  children,
  style,
  quantity,
}: ProductInfoProps) => {
  return (
    /*  style by diriction row or column  */
    <div className={`${styles[`product-${diriction}`]}`} style={style}>
      <div className={`${styles[`productImg-${diriction}`]}`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo-${diriction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{Number(price).toFixed(2)} DZ </h3>
        {quantity && <h3>Total Quantity: {quantity}</h3>}
        {quantity && <h3>Price Total: {(price * quantity).toFixed(2)}</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
