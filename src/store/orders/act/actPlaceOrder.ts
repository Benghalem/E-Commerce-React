import { createAsyncThunk } from "@reduxjs/toolkit";
import axion from "axios"
// axios error handling
import  { axiosErrorHandler }  from "@util";
import { RootState } from "@store/index";
// type
import { TProduct } from "@types";


const actPlaceOrder = createAsyncThunk(
    "orders/actPlaceOrder",
    async (subtotal: number, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI;
        // need to get cart ant auth from get state
        const { cart, auth } = getState() as RootState


        const orderItems = cart.productFullInfo.map((el: TProduct) => ({
            id:el.id,
            title: el.title,
            price: el.price,
            img: el.img,
            quantity: cart.items[el.id]
    })
) 
    try {
        const response = await axion.post("http://localhost:5005/orders", {
            userId: auth.user?.id,
            items: orderItems,
            subtotal: subtotal
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        rejectWithValue(axiosErrorHandler(error))
    }
}
)

export default actPlaceOrder