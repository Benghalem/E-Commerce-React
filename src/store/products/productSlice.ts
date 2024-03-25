import { createSlice } from "@reduxjs/toolkit";
import actGetProductCatPrefix from "./act/actGetProductCatPrefix";

// type 
import { TLoading, TProduct, isString } from '@types';


interface IProductState {
    records: TProduct[] ;
    loading: TLoading;
    error: string | null;
}

const initialState: IProductState  = {
    records: [],
    loading: "idle",
    error: null,    
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpproductsRecords : (state) => {
            state.records = [];
    }
    },
    extraReducers : (builder) => {
        builder.addCase(actGetProductCatPrefix.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(actGetProductCatPrefix.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;      
        })
        builder.addCase(actGetProductCatPrefix.rejected, (state, action) => {
            state.loading = "failed";

            if (isString(action.payload)) {
                state.error = action.payload;
            }
           /*  if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;  // or state.error = action.payload as string
            }
               */  
        })
    }
});

export const {cleanUpproductsRecords} = productSlice.actions
export  {actGetProductCatPrefix}
export default productSlice.reducer;