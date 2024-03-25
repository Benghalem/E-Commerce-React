import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
// axios error handling
import  { axiosErrorHandler }  from "@util";
// type 
import { TProduct } from "@types";

type TResponse = TProduct[]

const actGetProductByItems = createAsyncThunk(
    "cart/actGetProductByItems", 
    async (_, thunkAPI )=> {
        const {rejectWithValue,fulfillWithValue, getState, signal} = thunkAPI;
        const { cart } = getState() as RootState;
        const itemsId = Object.keys(cart.items);
        //console.log(itemsId)      
       if(!itemsId.length){
           return fulfillWithValue([]);
       }
       // console.log(concatenedItemsId)  
        try {  
            const concatenedItemsId = itemsId.map((el) => `id=${el}`).join("&");
            const response = await axios.get<TResponse>(
                `http://localhost:5005/products?${concatenedItemsId}`,
                {signal}
            );
            return response.data; 
        } catch (error) {
           rejectWithValue(axiosErrorHandler(error))
        }

})

export default actGetProductByItems