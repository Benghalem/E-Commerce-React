import { createSlice } from "@reduxjs/toolkit";
import actLikeTogle from "./act/actLikeTogle";
import actGetWishlist from "./act/actGetWishlist";
// import authLogout to listen logout and clean Wishlist when logout
import { authLogout } from "@store/auth/authSlice";
// type
import { TLoading, TProduct, isString } from "@types";


type IWishlist = {
    itemsId: number[];
    productFullInfo: TProduct[],
    error: null | string;
    loading: TLoading
}

const initialState: IWishlist = {
    itemsId: [],
    productFullInfo: [],
    error: null,
    loading: "idle"

}
const wishlist = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        // cleanup wishlist
        cleanWishlistProductFullInfo: (state) => {
            state.productFullInfo = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actLikeTogle.pending, (state) => {
            state.error = null
        });
        builder.addCase(actLikeTogle.fulfilled, (state, action) => {
            if(action.payload.type === "add") {
                state.itemsId.push(action.payload.id)
            } else {
                state.itemsId = state.itemsId.filter((el) => el !== action.payload.id)
                // remove from productFullInfo 
                state.productFullInfo =state.productFullInfo.filter(
                    (el) => el.id !== action.payload.id
                )
            }
        });
        builder.addCase(actLikeTogle.rejected, (state, action) => {
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
        });

        //  get wishlist items
        builder.addCase(actGetWishlist.pending, (state) => {
            state.loading = "pending"
            state.error = null
        });
        builder.addCase(actGetWishlist.fulfilled, (state, action) => {
            state.loading = "succeeded"
            if( action.payload.dataType === "ProductsFullInfo"){
                state.productFullInfo = action.payload.data as TProduct[]
            } else if(action.payload.dataType === "ProductsIds"){  {
                state.itemsId = action.payload.data as number[]
            }
            }else {
                state.productFullInfo = []
                state.itemsId = []
            }
        });
        builder.addCase(actGetWishlist.rejected, (state, action) => {
            state.loading = "failed"

            if (isString(action.payload)) {
                state.error = action.payload;
            } 
        /*  if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            } */
        })

        //  listen logout and clean Wishlist when logout reset
        builder.addCase(authLogout, (state) => {
            state.itemsId = []
            state.productFullInfo = []
        })
    }
}); 

export {actLikeTogle, actGetWishlist}
export const {cleanWishlistProductFullInfo} = wishlist.actions
export default wishlist.reducer