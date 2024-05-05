import { createSlice } from "@reduxjs/toolkit";
// import actions from act register
import actAuthRegister from "./act/actAuthRegister";
// import actions from act login 
import actAuthLogin from "./act/actAuthLogin";
// import types 
import { TLoading, isString } from "@types";

// type 
type IAuthState = {
    loading: TLoading,
    error: null | string,
    accessToken?: string | null,
    user?: {
        id: string,
        firstName: string,
        lastName: string,
        email: string
    } | null;
}
// initial state
const initialState: IAuthState = {
    accessToken: null,
    user: null,
    loading: "idle",
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { 
        // reset ui error message  login and register null
        resetUI: (state) => {
            state.loading = "idle"
            state.error = null
        },
        // logout and remove access token and user 
        authLogout: (state) => {
            state.user = null
            state.accessToken = null
        },
    },
      
    extraReducers: (builder) => {
        // register user
        builder.addCase(actAuthRegister.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actAuthRegister.fulfilled, (state) => {
            state.loading = "succeeded"
        })
        builder.addCase(actAuthRegister.rejected, (state, action) => {
            state.loading = "failed"
            if(isString(action.payload)) {
                state.error = action.payload
            }
        })
        // login user
        builder.addCase(actAuthLogin.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actAuthLogin.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user
        })
        builder.addCase(actAuthLogin.rejected, (state, action) => {
            state.loading = "failed"
            if(isString(action.payload)) {
                state.error = action.payload
            }
        })
    }
})

export  {actAuthRegister, actAuthLogin} 
export const {resetUI, authLogout} = authSlice.actions
export default authSlice.reducer