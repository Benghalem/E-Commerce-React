import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// axios error handling
import { axiosErrorHandler } from "@util";
import { RootState } from "@store/index";
// type
import { TOrderItem } from "@types";

type TResponse = TOrderItem[];

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const res = await axios.get<TResponse>(
        `http://localhost:5005/orders?userId=${auth.user?.id}`,
        { signal }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetOrders;
