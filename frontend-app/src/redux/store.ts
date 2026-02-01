import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import loaderReducer from "./loaderSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
    reducer: {
        client: clientReducer,
        loader: loaderReducer,
        toast: toastReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;