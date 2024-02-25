import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
// store
import { actGetProductCatPrefix, productCleanUp } from "@store/products/productSlice";
// styles
import { Container} from "react-bootstrap";
// components
import { Product } from "@components/ecoomerc";
import { Loading } from "@components/feadback";
import { GridList } from "@components/common";



const Prodects = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  useEffect(() => {
    /* let prefix : string;
    if (typeof params.prefix === "string") {
      prefix = params.prefix;
      dispatch(actGetProductCatPrefix(prefix) );
    } */ 
    // Or
    dispatch(actGetProductCatPrefix(params.prefix as string));
    return () => {
      dispatch(productCleanUp());
    }
  }, [dispatch, params]);

  /* this is old code move it in a component GridList */
  /* const productsList = records.length > 0 ? records.map(record => {
    return (
    <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
        <Product {...record} />
      </Col>
    )
  }): " there are no categories";
 */
  return (
    <Loading status={loading} error={error}>
      <Container>
         <GridList records={records} renderItem={(records) => <Product {...records} />} />
      </Container>
    </Loading>
  )
}

export default Prodects