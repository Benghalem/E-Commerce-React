import { Link } from "react-router-dom";
import styles from "./styles.module.css";

// type 
import  { ICategory } from "@costopTypes/category";

const { category, categoryImg, categoryTitle } = styles;


const Category = ({ title, img, prefix}: ICategory) => {

  return (
    <div className={category}>
      <Link to={`products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img}alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;