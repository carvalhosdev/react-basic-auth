import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootSate } from "../../app/store";

type AuthState = {
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: {token: null} as AuthState,
    reducers:{
        setCredentials: (
            state, 
            {
                payload: { token},
            }: PayloadAction<{token: string}>
        ) => {
            state.token = token
        },
        logout: (state) => {
            state.token = null;
        }
    }
})

export const {setCredentials, logout} = slice.actions
export default slice.reducer
export const selectCurrentUser = (state: RootSate) => state.auth.token;