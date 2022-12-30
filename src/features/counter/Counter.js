import { useSelector, useDispatch } from "react-redux"
import { increment, 
         decrement, 
         reset, 
         incrementByAmount } from './counterSlice'  // Actions 
import { useState } from "react"

const Counter = () => {
    /*
        In any application, the user interface will show existing state on screen.
    */
    const count = useSelector(state => state.counter.count)
    /* 
       We need to respond to user input by creating action objects that describe what happened, and dispatching them to the store. 
    */
    const dispatch = useDispatch()
    
    const [ incrementAmount, setIncrementAmount ] = useState(0)
    const addValue = Number(incrementAmount) || 0
    
    const resetAll = ()=> {
        setIncrementAmount(0)
        /*
           We'll dispatch the actions that will make the reducer reset the current counter value.
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