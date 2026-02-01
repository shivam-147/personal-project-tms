import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import loaderReducer from "./loaderSlice";

export const store = configureStore({
    reducer: {
        client: clientReducer,
        loader: loaderReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;