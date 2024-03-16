import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@costopTypes/product";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
    "wishlist/actGetWishlist", 
    async(_, thunkAPI) => {
        const {rejectWithValue, fulfillWithValue} = thunkAPI
        try {
            const userWishlist = await axios.get(
                "http://localhost:5005/wishlist?userId=1"
                );
            console.log(userWishlist.data)

            // dont work if userWishlist is empty    
            if (!userWishlist.data.length){
                return fulfillWithValue([]);
            }

            const concatenedItemsId = userWishlist.data
            .map (el => `id=${el.productId}`)
            .join('&')

            const response = await axios.get<TResponse>(
                `http://localhost:5005/products?${concatenedItemsId}`
            )

            return response.data;






        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message) 
            } else {
                return rejectWithValue("An unexpected error occured");
            }
        }
    }
)

export default actGetWishlist