import {  Row, Col } from "react-bootstrap";
// this type is a generic between category and product
type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode
}
// extended id type from category and product
type HasId = { id?: number }  

const GridList = <T extends HasId>({
        records, 
        renderItem
    }: GridListProps<T>) => {
    const categoriesList = 
        records.length > 0 ? records.map(record => {
        return (
        <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
            {renderItem(record)}
        </Col>
        )
      }): " there are no categories"; 
  return (
        <Row>{categoriesList}</Row>
  )
}

export default GridList
