import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
};

const authSlice = createSlice({
    name:"authSlice",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isCheckingAuth = false;
        },
        userLoggedOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isCheckingAuth = false;
        }
    },
})

export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;