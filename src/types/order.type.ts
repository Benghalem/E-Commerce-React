// import  type product
import { TProduct } from "./product.types";

// creat type for order
export type TOrderItem = {
  id: number;
  items: TProduct[];
  subtotal: number;
};
