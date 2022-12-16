
## Action Plan 

A lazy extract from [React Redux Quick Start](https://react-redux.js.org/tutorials/quick-start). 


I. Install Redux Toolkit and React Redux
```bash
npm install @reduxjs/toolkit react-redux
```


II. Create a Redux Store

app/store.js
```javascript
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
reducer: {},
})
```


III. Provide the Redux Store to React

index.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
<Provider store={store}>
    <App />
</Provider>
)
```


IV. Create a Redux State Slice

Splitting up redux state object into multiple slices of state. A slice is a collection of reducer logic of actions for a single feature in the app. 

> Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

features/counter/counterSlice.js
```javascript
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
name: 'counter',
initialState: {
    value: 0,
},
reducers: {
    increment: (state) => {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    state.value += 1
    },
    decrement: (state) => {
    state.value -= 1
    },
    incrementByAmount: (state, action) => {
    state.value += action.payload
    },
},
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

V. Add Slice Reducers to the Store

> By defining a field inside the reducers parameter, we tell the store to use this slice reducer function to handle all updates to that state.

app/store.js
```javascript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
reducer: {
    counter: counterReducer,
},
})
```


VI. Use Redux State and Actions in React Components

> Read data from the store with useSelector, and dispatch actions using useDispatch. 

features/counter/Counter.js
```javascript
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
const count = useSelector((state) => state.counter.value)
const dispatch = useDispatch()

return (
    <div>
    <div>
        <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
        >
        Increment
        </button>
        <span>{count}</span>
        <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
        >
        Decrement
        </button>
    </div>
    </div>
)
}
```

VII. Output screen 


VIII. Reference 
1. [React Redux Quick Start](https://react-redux.js.org/tutorials/quick-start)
2. [Redux Fundamentals, Part 1: Redux Overview](https://redux.js.org/tutorials/fundamentals/part-1-overview)
3. [Redux Fundamentals, Part 2: Concepts and Data Flow](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
4. [Redux Fundamentals, Part 3: State, Actions, and Reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers)
5. [Redux in 100 Seconds](https://youtu.be/_shA5Xwe8_4)


## EOF (2022/12/16)