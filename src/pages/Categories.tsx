import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";  
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Container } from "react-bootstrap";
// components
import { Category } from "@components/ecoomerc";
import { Loading } from "@components/feadback";
import { GridList } from "@components/common";


const Categories = () => {
  const dispatch = useAppDispatch();
  const {loading, error, records} = useAppSelector((state) => state.categories);

  useEffect(() => {
    if( ! records.length /* records.length === 0 */ ){
      dispatch(actGetCategories());
    }
   
  }, [dispatch, records]);

/* ======== this is old code move it in a component GridList ===== */
 /*  const categoriesList = records.length > 0 ? records.map(record => {
    return (
    <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
        <Category {...record} />
      </Col>
    )
  }): " there are no categories"; */
  
  return (
    <Loading status={loading} error={error}>
      <Container>
        <GridList 
          records={records} 
          renderItem = {(record) => <Category {...record} />} 
        />
      </Container>
    </Loading>
  )
}

export default Categories