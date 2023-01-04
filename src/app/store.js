import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import { apiSlice } from '../features/api/apiSlice';

// Create a new Redux store with the `createStore` function,
export const store = configureStore({
    reducer: {
        counterSlice, 
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})