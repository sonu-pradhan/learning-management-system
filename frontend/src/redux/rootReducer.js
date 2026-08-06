import { authApi } from "@/api/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import { courseApi } from "@/api/courseApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    auth:authReducer
});

export default rootReducer;