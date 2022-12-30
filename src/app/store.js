import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'

import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from '../services/pokemon'

// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
export const store = configureStore({
    reducer: {
            counter: counterReducer,

            // Add the generated reducer as a specific top-level slice
            [pokemonApi.reducerPath]: pokemonApi.reducer,
        },
        // Adding the api middleware enables caching, invalidation, polling,
        // and other useful features of `rtk-query`.
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(pokemonApi.middleware),
  })

/*
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
})

*/