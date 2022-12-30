import { createSlice } from '@reduxjs/toolkit'

/*
   Define an initial state value for the app
   Redux apps normally have a JS object as the root piece of the state, with other values inside that object.
*/
const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState, 
    reducers: {
        /*
           Reducers is defined by specifying action with current state arguments, which describes what happened. 
        */        
        increment: (state) => {
            state.count++; 
        },
        decrement: (state) => {
            state.count--; 
        },
        reset: (state) => {
            state.count = 0 
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        }
    }
})

// Export actions (to be used by out app)
export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions 

// Export reducer (to be used by the store)
export default counterSlice.reducer

/*
   Splitting up redux state object into multiple slices of state. 

   So, a slice is really a collection of reducer logic of actions 
   for a single feature in the app. 

   For example, a blog might have a slice for post and another 
   slice for comment to handle the logic of each differently. 
   So they each get their own slice. 
*/