import useOrders from "@hooks/useOrders";

import { ProductInfo } from "@components/ecoomerc";
import { Loading } from "@components/feadback";
import { Heading } from "@components/common";
import { Modal, Table } from "react-bootstrap";

const Orders = () => {
  const {
    orderList,
    loading,
    error,
    viewDetailsHandler,
    showModal,
    handleCloseModale,
    selectedProduct,
  } = useOrders();

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModale}>
        <Modal.Header closeButton>
          <Modal.Title>Product Detaile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              diriction="column"
              quantity={el.quantity}
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="My Orders" />
      <Loading status={loading} error={error} type="category">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length} item(s)
                  {" / "}
                  <span
                    onClick={() => {
                      viewDetailsHandler(el.id);
                    }}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Product Details
                  </span>
                </td>
                <td>{el.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
