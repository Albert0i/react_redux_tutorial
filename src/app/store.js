import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'

// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
export const store = configureStore({
    reducer: {
        counter: counterReducer
    }

})