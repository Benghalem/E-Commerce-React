import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";  
import { actGetCategories, categoriesRecordsCleanUp } from "@store/categories/categoriesSlice";

const useCategories = () => {
    const dispatch = useAppDispatch();
    const {loading, error, records} = useAppSelector((state) => state.categories);

    useEffect(() => {
       const promise = dispatch(actGetCategories());

        return () => {
        promise.abort();
        dispatch(categoriesRecordsCleanUp());

        }
    
    }, [dispatch]);

    /* ======== this is old code move it in a component GridList ===== */
    /*  const categoriesList = records.length > 0 ? records.map(record => {
        return (
        <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
            <Category {...record} />
        </Col>
        )
    }): " there are no categories"; */
    
  return {loading, error, records}
}

export default useCategories