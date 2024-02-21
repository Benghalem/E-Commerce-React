import { createAsyncThunk } from "@reduxjs/toolkit";
import axion from "axios"
// type
import { TProduct } from '@costopTypes/product';

type TResponse = TProduct[];

const actGetProductCatPrefix = createAsyncThunk(
    "product/actGetProductCatPrefix", 
    async (prefix: string, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
                const response = await axion.get<TResponse>(`http://localhost:5005/products?cat_prefix=${prefix}`);
                return response.data;
        } catch (error) { 
            if(axion.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message) 
            } else {
                return rejectWithValue("An unexpected error occured");
            }
        }
});

export default actGetProductCatPrefix