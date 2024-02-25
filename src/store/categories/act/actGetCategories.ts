import { createAsyncThunk } from "@reduxjs/toolkit";
import axion from "axios"
// type
import { TLoading } from '@costopTypes/share';


type TResponse = TLoading[];


const actGetCategories = createAsyncThunk(
    "categories/actGetCategories", 
    async (_, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
                const response = await axion.get<TResponse>("http://localhost:5005/categories");
                console.log(response.data);
                return response.data;
        } catch (error) { 
            if(axion.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message) 
            } else {
                return rejectWithValue("An unexpected error occured");
            }
        }
});

export default actGetCategories