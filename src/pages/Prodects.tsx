// hooks
import useProduct from "@hooks/useProduct";
// styles
import { Container} from "react-bootstrap";
// components
import { Product } from "@components/ecoomerc";
import { Loading } from "@components/feadback";
import { GridList, Heading } from "@components/common";



const Prodects = () => {
    const { loading, error, productFullInfo, productPrefix } = useProduct();
  return (
    <>
      <Heading title={`${productPrefix?.toUpperCase()} Products`}/>
      <Loading status={loading} error={error}>
        <Container>
          <GridList records={productFullInfo} renderItem={(records) => <Product {...records} />} />
        </Container>
      </Loading>
    </>
  )
}

export default Prodects