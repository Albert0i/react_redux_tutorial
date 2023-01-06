import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'
import { apiSlice } from '../features/api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

// Create a new Redux store with the `createStore` function,
export const store = configureStore({
    reducer: {
        // state.counter comes from this attribute name. 
        counter: counterReducer, 

        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch);