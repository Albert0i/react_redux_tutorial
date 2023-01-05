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
        thus to read our data, we need useSelector to return the state.counter.value
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