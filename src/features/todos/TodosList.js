import {
    useGetTodosQuery, 
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useAddTodoMutation
} from "./todosSlice"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import PageButton from './PageButton'

const TodoList = () => {
    const [page, setPage] = useState(1)
    const [newTodo, setNewTodo] = useState('')
    const limit = 4     // number of todos per page

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery( { page, limit } )
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ userId: 1, title: newTodo, completed: false })
        setNewTodo('')
    }

    const newItemSection =
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


    let content, nav;    
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        // Pagination logic
        const total_pages = Math.ceil( todos.entities[todos.ids[0]].totalCount / limit)
        const lastPage = () => setPage(total_pages)
        const firstPage = () => setPage(1)
        const pagesArray = Array(total_pages).fill().map((_, index) => index + 1)
        nav = (
            <nav className="nav-ex2">
                <button onClick={firstPage} disabled={ page === 1}>&lt;&lt;</button>
                {/* Removed isPreviousData from PageButton to keep button focus color instead */}
                {pagesArray.map(pg => <PageButton key={pg} pg={pg} setPage={setPage} />)}
                <button onClick={lastPage} disabled={page === total_pages}>&gt;&gt;</button>
            </nav>
        )
        // Pagination logic
        
        content = todos.ids.map(id => {
            return (
                <article key={id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todos.entities[id].completed}
                            id={id}
                            onChange={() => updateTodo({ ...todos.entities[id], completed: !todos.entities[id].completed })}
                        />
                        <label htmlFor={todos.entities[id]}>{todos.entities[id].title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodo({ id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {nav}
            {content}
            { todos && <p>Total Todos is {todos.entities[todos.ids[0]].totalCount}</p> }
        </main>
    )
}
export default TodoList