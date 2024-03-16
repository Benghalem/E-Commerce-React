import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
// type 
import { TProduct } from "@costopTypes/product";

type TResponse = TProduct[]

const actGetProductByItems = createAsyncThunk(
    "cart/actGetProductByItems", 
    async (_, thunkAPI )=> {
        const {rejectWithValue,fulfillWithValue, getState} = thunkAPI;
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
                `http://localhost:5005/products?${concatenedItemsId}`
            );
            return response.data; 
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message) 
            } else {
                return rejectWithValue("An unexpected error occured");
            }
            
        }

})

export default actGetProductByItems