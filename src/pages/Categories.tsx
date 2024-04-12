// hooks
import useCategories from "@hooks/useCategories";
import { Container } from "react-bootstrap";
// components
import { Category } from "@components/ecoomerc";
import { Loading } from "@components/feadback";
import { GridList, Heading } from "@components/common";


const Categories = () => {
  const {loading, error, records} = useCategories();
  
  return (
    <>
    <Heading title="Categories"/>
      <Loading status={loading} error={error} type="category">
        <Container>
          <GridList 
            emptyMessage="There are no categories"
            records={records} 
            renderItem = {(record) => <Category {...record} />} 
          />
        </Container>
      </Loading>
    </>
  )
}

export default Categories