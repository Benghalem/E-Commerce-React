import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";

// type 
import { TLoading } from '@costopTypes/share';
import  { ICategory } from "@costopTypes/category";


interface ICategoriesState {
    records: ICategory[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICategoriesState  = {
    records: [],
    loading: "idle",
    error: null,    
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(actGetCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(actGetCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;      
        })
        builder.addCase(actGetCategories.rejected, (state, action) => {
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;  // or state.error = action.payload as string
            }
                
        })
    }
});

export  {actGetCategories}
export default categoriesSlice.reducer;