import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";
// type of order and loding
import { TLoading, TOrderItem, isString } from "@types";

// type order
type IOrderSlice = {
  orderList: TOrderItem[];
  loading: TLoading;
  error: string | null;
};

// initial state
const initialState: IOrderSlice = {
  orderList: [],
  loading: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    restOrderState: (state) => {
      //  state.orderList = []
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // place order request and response data
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // get order request and response data
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actPlaceOrder, actGetOrders };

export const { restOrderState } = ordersSlice.actions;

export default ordersSlice.reducer;
