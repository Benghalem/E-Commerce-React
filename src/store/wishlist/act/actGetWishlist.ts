import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@types";
// axios error handling
import  { axiosErrorHandler }  from "@util";

import { RootState } from "@store/index";


// type
type TDataType = "ProductsFullInfo" | "ProductsIds";
type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
    "wishlist/actGetWishlist", 
    async(dataType: TDataType, thunkAPI) => {
        const {rejectWithValue, signal, getState} = thunkAPI
        // get user wishlist from server 
        const { auth } = getState() as RootState;
        try {
            const userWishlist = await axios.get<{productId: number}[]>(
                `http://localhost:5005/wishlist?userId=${auth.user?.id}`,  
                { signal  }
                );
             // dont work if userWishlist is empty    
            if (!userWishlist.data.length){
                return {data:[], dataType: "empty"};
            }
 
            // return dataType  products  for id user
            if(dataType === "ProductsIds"){                         
            // concatenate items id
            const concatenedItemsId = userWishlist.data.map (el => el.productId)
                console.log("concatenedItemsId", concatenedItemsId)
                return {data: concatenedItemsId, dataType: "ProductsIds"};

            } else {   //    or return dataType productsFullInfo for all object
            // concatenate items fullinfo  products
            const concatenedItemsId = userWishlist.data
            .map (el => `id=${el.productId}`)
            .join('&')
            const response = await axios.get<TResponse>(
                `http://localhost:5005/products?${concatenedItemsId}`
            )
          
            return {data:response.data, dataType: "ProductsFullInfo"};
            }

        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
)

export default actGetWishlist