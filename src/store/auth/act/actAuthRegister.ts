import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// axios error handling
import  { axiosErrorHandler }  from "@util";


// type 
type TFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const actAuthRegister = createAsyncThunk(
    "auth/actAuthRegister", 
    async( formData: TFormData, thunk) => {
        const {rejectWithValue} = thunk;
        try {
            const response = await axios.post("http://localhost:5005/register", formData)
            return response.data
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

export default actAuthRegister