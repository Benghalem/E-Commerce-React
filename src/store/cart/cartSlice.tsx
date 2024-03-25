import { createSlice } from "@reduxjs/toolkit"; 
import actGetProductByItems from "./act/actGetProductByItems";
import { getCaretTotaleQuntitySelector, 
    itemQuantitiyAvailabilityCheckingSelector 
} from "../cart/selectors";
// type
import { TProduct, TLoading , isString} from "@types";


type ICartState = {
    items: {[key: string]: number};
    productFullInfo: TProduct[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICartState = {
    items: {},
    productFullInfo: [],
    loading: "idle",
    error: null
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id  = action.payload;
            if ( state.items[id]) {
                state.items[id]++;
            } else {
                state.items[id] = 1; 
            }
        },
        cartItemsChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity
        },
        cartItemRemove : (state, action) => {
            delete state.items[action.payload];
            state.productFullInfo = state.productFullInfo.filter((el)=> el.id !== action.payload)
        },
        cleanCartProductFullInfo : (state) => {
            state.productFullInfo = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actGetProductByItems.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProductByItems.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productFullInfo = action.payload;
        });
        builder.addCase(actGetProductByItems.rejected, (state, action) => {
            state.loading = "failed";

            if (isString(action.payload)) {
                state.error = action.payload;
            }
            // old code
           /*  if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;  // or state.error = action.payload as string
                
            } */
        })
    }
})


export {
    getCaretTotaleQuntitySelector, 
    itemQuantitiyAvailabilityCheckingSelector,
    actGetProductByItems,
    
}
export const {
    addToCart,
    cartItemsChangeQuantity,
    cartItemRemove,
    cleanCartProductFullInfo
} = cartSlice.actions;
export default cartSlice.reducer