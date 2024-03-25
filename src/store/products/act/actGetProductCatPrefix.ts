import { createAsyncThunk } from "@reduxjs/toolkit";
import axion from "axios"
// axios error handling
import  { axiosErrorHandler }  from "@util";
// type
import { TProduct } from '@types';

type TResponse = TProduct[];

const actGetProductCatPrefix = createAsyncThunk(
    "product/actGetProductCatPrefix", 
    async (prefix: string, thunkAPI) => {
        const {rejectWithValue, signal } = thunkAPI
        try {
                const response = await axion.get<TResponse>(
                        `http://localhost:5005/products?cat_prefix=${prefix}`,
                        { 
                                signal 
                        }
                        );
                return response.data;
        } catch (error) { 
                return rejectWithValue(axiosErrorHandler(error)
                )
        }
});

export default actGetProductCatPrefix