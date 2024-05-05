import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// axios error handling
import  { axiosErrorHandler }  from "@util";

// type 
type TFormData = {
    email: string,
    password: string,
}
// type response data
type TResponse = {
    accessToken: string,
    user: {
        id: string,
        firstName: string,
        lastName: string,
        email: string
    }
}

const actAuthLogin = createAsyncThunk(
    "auth/actAuthLogin",
    async( formData: TFormData, thunk) => {
        const {rejectWithValue} = thunk
        try {
            const response = await axios.post<TResponse>("http://localhost:5005/login", formData)
            return response.data 
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }

    }
)

export default actAuthLogin