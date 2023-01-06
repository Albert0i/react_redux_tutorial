import {
    useGetTodosQuery, 
//    useGetTodoByIdQuery, 
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useAddTodoMutation
} from "./todosSlice"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import PageButton from './PageButton'
import NewTodo from "./NewTodo"
import SingleTodo from "./SingleTodo"

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
    //
//    const { data: albums } = useGetTodoByIdQuery(13);
    //
    const [addTodo ] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await addTodo({ userId: 1, title: newTodo, completed: false }).unwrap()
    //     }
    //     catch (err) {
    //         console.error('Failed to save todo', err.message)
    //     }
    //     setNewTodo('')
    // }

    // const newItemSection =
    //     <form onSubmit={handleSubmit}>
    //         <label htmlFor="new-todo">Enter a new todo item</label>
    //         <div className="new-todo">
    //             <input
    //                 type="text"
    //                 id="new-todo"
    //                 value={newTodo}
    //                 onChange={(e) => setNewTodo(e.target.value)}
    //                 placeholder="Enter new todo"
    //             />
    //         </div>
    //         <button className="submit">
    //             <FontAwesomeIcon icon={faUpload} />
    //         </button>
    //     </form>

    //
    //console.log(albums)
    //     

    let content, nav;    
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        const { ids, entities } = todos
        //console.log(ids)
        //console.log(entities)

        // Pagination logic
        const total_pages = Math.ceil( entities[ids[0]].totalCount / limit)
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
        
        content = ids.map(id => {
            return <SingleTodo key={id} id={id} /> 
        })
        // content = ids.map(id => {
        //     return (
        //         <article key={id}>
        //             <div className="todo">
        //                 <input
        //                     type="checkbox"
        //                     checked={entities[id].completed}
        //                     id={id}
        //                     onChange={() => updateTodo({ ...entities[id], completed: !entities[id].completed })}
        //                 />
        //                 <label htmlFor={entities[id]}>{entities[id].title}</label>
        //             </div>
        //             <button className="trash" onClick={() => deleteTodo({ id })}>
        //                 <FontAwesomeIcon icon={faTrash} />
        //             </button>
        //         </article>
        //     )
        // })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {/* {newItemSection} */}
            <NewTodo />
            {nav}
            {content}
            {/* { todos && <p>Total Todos is {todos.entities[todos.ids[0]].totalCount}</p> } */}
            { todos && <p>Total Todos is { todos.entities[todos.ids[0]].totalCount }</p> }
        </main>
    )
}
export default TodoList