import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, restOrderState } from "@store/orders/ordersSlice";
// type
import { TProduct } from "@types";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const { loading, error, orderList } = useAppSelector(
    (state) => state.ordersSlice
  );

  // state for show modal
  const [showModal, setShowModal] = useState(false);
  // state for filter all products
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((order) => order.id === id);
    const newItems = productDetails?.items ?? [];

    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]);
  };

  const handleCloseModale = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };
  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(restOrderState());
    };
  }, [dispatch]);

  return {
    orderList,
    loading,
    error,
    viewDetailsHandler,
    showModal,
    handleCloseModale,
    selectedProduct,
  };
};

export default useOrders;
