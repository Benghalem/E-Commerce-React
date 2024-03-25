import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// axios error handling
import  { axiosErrorHandler }  from "@util";
const actLikeTogle = createAsyncThunk(
    "wishlist/actLikeTogle", 
    async(id: number, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const isRecordExist = await axios.get(
                `http://localhost:5005/wishlist?userId=1&productId=${id}`
            )
            
            if(isRecordExist.data.length > 0){
                console.log(isRecordExist.data[0].id)
                await axios.delete( `http://localhost:5005/wishlis/${isRecordExist.data[0]}`)
              //  console.log(test)
              //  console.log("add")
                return{type: "remove", id};
            }else{
                await axios.post("http://localhost:5005/wishlist", {userId: "1", productId: id})
                //console.log(test)
             //   console.log("add")
                return{type: "add", id};
            }
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
})

export default actLikeTogle