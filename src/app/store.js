import { configureStore } from "@reduxjs/toolkit";
import { apiSliceRoot } from '../features/api/apiSliceRoot'
//import { extendedAdapterSlice } from '../features/api/extendedAdapterSlice'

// Create a new Redux store with the `createStore` function,
export const store = configureStore({
    reducer: {
        [apiSliceRoot.reducerPath]: apiSliceRoot.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSliceRoot.middleware),
    devTools: true
})
