import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from "./todosSlice"

const SingleTodo = ({ todo }) => {
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    
    const myUpdateTodo = (todo) => {  
        // Remove totalCount, if any... 
        const { totalCount, ...todoClean } = todo
        updateTodo({ ...todoClean, completed: !todoClean.completed , title: todoClean.title + '+'})
    }

    return (
            <article key={todo.id}>
                <div className="todo">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        id={todo.idid}
                        onChange={() => myUpdateTodo(todo) }
                    />
                    <label htmlFor={todo.id}>{todo.title}</label>
                </div>
                <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                         <FontAwesomeIcon icon={faTrash} />
                </button>
            </article>
        )
}

export default SingleTodo
