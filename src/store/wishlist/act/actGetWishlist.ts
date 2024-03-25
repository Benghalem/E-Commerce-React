import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@types";
// axios error handling
import  { axiosErrorHandler }  from "@util";



type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
    "wishlist/actGetWishlist", 
    async(_, thunkAPI) => {
        const {rejectWithValue, fulfillWithValue, signal} = thunkAPI
        try {
            const userWishlist = await axios.get<{prodactId: number}[]>(
                "http://localhost:5005/wishlist?userId=1", 
                {
                    signal
                }
                );
          

            // dont work if userWishlist is empty    
            if (!userWishlist.data.length){
                return fulfillWithValue([]);
            }

            const concatenedItemsId = userWishlist.data
            .map (el => `id=${el.prodactId}`)
            .join('&')

            const response = await axios.get<TResponse>(
                `http://localhost:5005/products?${concatenedItemsId}`
            )

            return response.data;

        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
)

export default actGetWishlist