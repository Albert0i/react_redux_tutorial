
# An extract from [React Redux Quick Start](https://react-redux.js.org/tutorials/quick-start) for *idiot*

[![alt Ghost_in_the_Shell_02.jpg](./img/Ghost_in_the_Shell_02.jpg)](https://madmuseum.org/events/ghost-shell)

## Prologue 
How long can we live? A couple of decades, a couple of days, a couple of seconds... nobody knows... The only thing I know is **"Everything has a time"**. 
I have studied science and literature throughout my life. I have learned how to create things from scratch; how to works with my bare hands. But all I know will vanish as long as my physical portion expires. 

If one can persist memory in a *vault*, *store* or some other devices so that one's memory may outlive the body. By then, this meta-physical existence of *oneself* is still the same physical oneself or not... I doubt... I don't know... 


## I. Install Redux Toolkit and React Redux
First thing first, What is Redux?

> **Redux is a pattern and library for managing and updating application state, using events called "actions".** It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

> Redux helps you manage "global" state - state that is needed across many parts of your application.

> It's a trade-off between short term and long term productivity.

[Redux](https://redux.js.org/) is the original *old school* state manager for react but now the creators of redux offer toolkit and on the redux website it says [redux toolkit](https://redux-toolkit.js.org/) is intended to be the standard way to write redux logic and we strongly recommended that you use it. So moving forward redux toolkit is the modern application of redux that you should learn how to implement. 

You only need two npm packages.

```bash
npm install @reduxjs/toolkit react-redux
```


## II. Create a Redux Store
app/store.js
```javascript
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
reducer: {},
})
```
> configureStore is only accepting **one** parameter, which is an **Object** called <code>ConfigureStoreOptions</code>, which has several attributes (? means optional):

- reducers
- middleware????
- devTools????
- preloadedState????
- enhancers????

> the most important and easy to understand are <code>reducers</code>, <code>devTools</code>, and <code>preloadedState</code>. 

> A store is a JavaScript object with a few special functions and abilities that make it different than a plain global object:

- You must never directly modify or change the state that is kept inside the Redux store

- Instead, the only way to cause an update to the state is to create a plain **action** object that describes "something that happened in the application", and then **dispatch** the action to the store to tell it what happened.

- When an action is dispatched, the store runs the root **reducer** function, and lets it calculate the new state based on the old state and the action

- Finally, the store notifies **subscribers** that the state has been updated so the UI can be updated with the new data.


## III. Provide the Redux Store to React

> Wrap your <code>&lt;App /&gt;</code> component with the <code>Provider</code> and include the store that you made recently.

index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>  
  </React.StrictMode>
);
```


## IV. Create a Redux State Slice
Splitting up redux state object into multiple slices of state. So, a slice is really a collection of reducer logic of actions for a single feature in the app. (check [createSlice](https://redux-toolkit.js.org/api/createslice) for details)

For example, a blog might have a slice for post and another 
slice for comment to handle the logic of each differently. 
So they each get their own slice. 

> Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

> Redux itself does not care about how your application's folders and files are structured. However, co-locating logic for a given feature in one place typically makes it easier to maintain that code. Redux.org recommend that most applications should structure files using a **"feature folder"** approach (all files for a feature in the same folder) or the "ducks" pattern (all Redux logic for a feature in a single file), rather than splitting logic across separate folders by "type" of code (reducers, actions, etc).

features/counter/counterSlice.js
```javascript
import { createSlice } from '@reduxjs/toolkit'

/*
   Define an initial state value for the app
   Redux apps normally have a JS object as the root piece of the state, 
   with other values inside that object.
*/
const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState, 
    reducers: {
        /*
           Reducers is defined by specifying action with current state arguments, 
           which describes what happened. 
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
```

The benefit here is that our component doesn't even have to know the structure of the state at all. All of that is now handled in the slice. 

> Redux Toolkit's createReducer and createSlice automatically use [Immer](https://immerjs.github.io/immer/) internally to let you write simpler immutable update logic using "mutating" syntax. This helps simplify most reducer implementations.

> **You can think of an action as an event that describes something that happened in the application.**

> **You can think of a reducer as an event listener which handles events based on the received action (event) type.**

> **You can think of dispatching actions as "triggering an event"** in the application. Reducers act like event listeners, and when they hear an action they are interested in, they update the state in response.

INFO
> "Reducer" functions get their name because they're similar to the kind of callback function you pass to the Array.reduce() method. The Array.reduce() method lets you take an array of values, process each item in the array one at a time, and return a single final result. You can think of it as "reducing the array down to one value". We can say that Redux reducers reduce a set of actions (over time) into a single state. The difference is that with Array.reduce() it happens all at once, and with Redux, it happens over the lifetime of your running app.

INFO
> With createSlice, we don't need to implement the Redux reducer manually. However, there is something that you need to keep in mind. Redux Toolkit's createSlice is built-in with [Immer](https://immerjs.github.io/immer/). 

> When we want to update React state, we can't mutate the state. Therefore, we need to create completely new data to update the state. This is the same paradigm in conventional Redux. However, Immer makes our life easier. We can mutate the state directly. 

> Mutating the state is not the only way to update the state, we can also use the Redux immutable concept, which is using return


## V. Add Slice Reducers to the Store
> By defining a field inside the reducers parameter, we tell the store to use this slice reducer function to handle all updates to that state.

app/store.js
```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'

// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
export const store = configureStore({
    reducer: {
        // state.counter comes from this attribute name. 
        counter: counterReducer
    }

})
```


## VI. Use Redux State and Actions in React Components
> Read data from the store with useSelector, and dispatch actions using useDispatch. 

> Just remember that concept **get** and **set**. In Redux, we can think that <code>get</code> is a <code>selector</code>, and <code>set</code> is a <code>dispatch</code>. 

features/counter/Counter.js
```javascript
import { useSelector, useDispatch } from "react-redux"
import { increment, 
         decrement, 
         reset, 
         incrementByAmount } from './counterSlice'  // Actions 
import { useState } from "react"

const Counter = () => {
    /*
        Selectors are functions that know how to extract specific pieces of
        information from a store state value. 
        They also subscribe to any future store updates so they can know 
        if the state has changed.
    
        In our slice, we provided the name property as 'counter'
        and the initialState with a 'value' property
        thus to read our data, we need useSelector to return the state.counter.value.

        'counter' comes from the reducer attribute name in configureStore
    */
    const count = useSelector(state => state.counter.count)
    /* 
       The only way to update the state is to call dispatch() and pass in 
       an action object. The store will run its reducer function and 
       save the new state value inside. 
       The store notifies all parts of the UI that are subscribed 
       that the store has been updated. 
    */
    const dispatch = useDispatch()
    
    const [ incrementAmount, setIncrementAmount ] = useState(0)
    const addValue = Number(incrementAmount) || 0
    
    const resetAll = ()=> {
        setIncrementAmount(0)
        /*
           Dispatch the actions that will make the reducer reset 
           the current counter value.
        */        
        dispatch(reset())
    }

  return (
    <section>
        <p>{count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
        <input type='text' 
               value={incrementAmount} 
               onChange={ e=> setIncrementAmount(e.target.value)}
               />

        <div>
            {/* action only receive one parameter, which is payload */}
            <button onClick={ ()=> dispatch(incrementByAmount(addValue)) }>
                Add Amount
            </button>
            <button onClick={ resetAll }>
                Reset
            </button>
        </div>
    </section>
  )
}

export default Counter
```


## VII. Output screen 
![alt redux1](./img/redux1.jpg)

We can summarize the flow of data through a Redux app with this diagram. It represents how:

- actions are dispatched in response to a user interaction like a click

- the store runs the reducer function to calculate a new state

- the UI reads the new state to display the new values

![alt Data Flow](./img/ReduxDataFlowDiagram.gif)

That counter example was small, but it does show all the working pieces of a real Redux app. 


## Epilogue 
Redux is not an answer; Redux a question. It opens a way to let you re-think how to manage and share application state. Each store has many features ([Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)), each feature is represented as slice (name, state and action), each slice exports actions (to be used by compoents) and reducer (to be used by store). Retrieving state from store and invoking action to *change* the store is only slightly different. 

If you use [useContext](https://blog.webdevsimplified.com/2020-06/use-context/) then switching to Redux seems a better choice before your project grows larger and harder to manage.  


## VIII. Reference 
1. [React Redux Full Course for Beginners | Redux Toolkit Complete Tutorial](https://youtu.be/NqzdVN2tyvQ)
2. [React Redux Quick Start](https://react-redux.js.org/tutorials/quick-start)
3. [Redux Fundamentals, Part 8: Modern Redux with Redux Toolkit](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux)
4. [RTK Query Overview](https://redux-toolkit.js.org/rtk-query/overview)
5. [Redux Essentials, Part 6: Performance and Normalizing Data](https://redux.js.org/tutorials/essentials/part-6-performance-normalization)
6. [Redux Essentials, Part 8: RTK Query Advanced Patterns](https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced)
7. [How To Setup Redux with Redux Toolkit](https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/)
8. [Redux Toolkit Setup Tutorial](https://dev.to/raaynaldo/redux-toolkit-setup-tutorial-5fjf)
9. [RTK Query Tutorial (CRUD)](https://dev.to/raaynaldo/rtk-query-tutorial-crud-51hl)
10. [130 Motivational Quotes of the Day to Get you Motivated](https://www.invajy.com/motivational-quotes-of-the-day/)

## EOF (2023/01/06)