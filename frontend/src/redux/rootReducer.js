import { authApi } from "@/api/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import { courseApi } from "@/api/courseApi";
import { purchaseApi } from "@/api/purchaseApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    auth:authReducer
});

export default rootReducer;