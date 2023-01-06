import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import {
    useGetTodoByIdQuery, 
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useAddTodoMutation
} from "./todosSlice"

const SingleTodo = ({ id }) => {
    const {
        data: todo,
        isLoading
    } = useGetTodoByIdQuery( id )
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    return (!isLoading && 
            <article key={id}>
                <div className="todo">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        id={id}
                        onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                    />
                    <label htmlFor={todo.id}>{todo.title}</label>
                </div>
                <button className="trash" onClick={() => deleteTodo({ id })}>
                         <FontAwesomeIcon icon={faTrash} />
                </button>
            </article>
        )
}

export default SingleTodo
