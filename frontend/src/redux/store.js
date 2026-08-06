import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/api/authApi";
import { courseApi } from "@/api/courseApi";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});

const persistApp = async () => {
    await store.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
persistApp();