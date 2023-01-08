import { useGetTodosQuery } from "./todosSlice"

import { useState } from "react"
import PageButton from './PageButton'
import NewTodo from "./NewTodo"
import SingleTodo from "./SingleTodo"

const TodoList = () => {
    const [page, setPage] = useState(1)
    const limit = 4     // number of todos per page

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery( { page, limit } )

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
            return <SingleTodo key={id} todo={ entities[id] } /> 
        })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            <NewTodo />
            {nav}
            {content}
            { todos && <p>Total Todos is { todos.entities[todos.ids[0]].totalCount }</p> }
        </main>
    )
}
export default TodoList