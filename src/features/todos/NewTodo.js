import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useAddTodoMutation } from "./todosSlice"

const NewTodo = () => {
    const [newTodo, setNewTodo] = useState('')
    const [addTodo ] = useAddTodoMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTodo({ userId: 1, title: newTodo, completed: false }).unwrap()
        }
        catch (err) {
            console.error('Failed to save todo', err.message)
        }
        setNewTodo('')
    }

    return (
            <form onSubmit={handleSubmit}>
                        <label htmlFor="new-todo">Enter a new todo item</label>
                        <div className="new-todo">
                            <input
                                type="text"
                                id="new-todo"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Enter new todo"
                            />
                        </div>
                        <button className="submit">
                            <FontAwesomeIcon icon={faUpload} />
                        </button>
                    </form>
  )
}

export default NewTodo