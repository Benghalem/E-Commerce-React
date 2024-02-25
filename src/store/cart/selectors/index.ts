import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";

// function Selector to get the total quantity
const getCaretTotaleQuntitySelector = createSelector (
    (state: RootState ) => state.cart.items, 
    (items)=> {
        const totalQuntity = Object.values(items).reduce((acc, value) => {
            return acc + value
        }, 
        0);
        return totalQuntity
    }
)

// function Selector to check the availability of the item in the cart
const itemQuantitiyAvailabilityCheckingSelector = createSelector (
    (itemQuantity) => itemQuantity,
    (_,itemMax) => itemMax,
    (itemQuantity, itemMax) => {
        console.log("faire");
        const currentQuntityInCart = itemQuantity|| 0;
        const currentRemaniningQuntitiy = itemMax - currentQuntityInCart;
        const quntitiyReachedMax = currentRemaniningQuntitiy <= 0 ? true : false;
        return {currentRemaniningQuntitiy, quntitiyReachedMax}
    }
)
export {
    getCaretTotaleQuntitySelector, 
    itemQuantitiyAvailabilityCheckingSelector
};