import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id
})

const initialState = todosAdapter.getInitialState() 

export const extendedAdapterSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getTodos: builder.query({
          query: ( { page, limit } ) => `/todos?_page=${page}&_limit=${limit}&_sort=id&_order=desc`,
          transformResponse(res, meta) {
                // 1) Add totalCount to every todos using map
                // const saltedTodos = res.map(todo => {
                //         todo.totalCount=Number(meta.response.headers.get('X-Total-Count'))
                //         return todo;
                // });                
                //return todosAdapter.setAll(initialState, saltedTodos)
                // 2) Add totalCount to the FIRST todos ONLY using forEach
                res.forEach((item, key) => { 
                    if (!key) 
                        return item.totalCount = Number(meta.response.headers.get('X-Total-Count')) 
                    else 
                        return item 
                })
                return todosAdapter.setAll(initialState, res)
            },
            providesTags: (result, error, arg) => [
                { type: 'Todos', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Todos', id }))
            ]
      }),
      addTodo: builder.mutation({
          query: (todo) => ({
              url: '/todos',
              method: 'POST',
              body: todo
          }),
          invalidatesTags: [
            { type: 'Todos', id: "LIST" }
        ]
      }),
      updateTodo: builder.mutation({
          query: (todo) => ({
              url: `/todos/${todo.id}`,
              method: 'PATCH',
              body: todo
          }),
          invalidatesTags: (result, error, arg) => [
            { type: 'Todos', id: arg.id }
        ]
      }),
      deleteTodo: builder.mutation({
          query: ({ id }) => ({
              url: `/todos/${id}`,
              method: 'DELETE',
              body: { id }
          }),
          invalidatesTags: (result, error, arg) => [
            { type: 'Todos', id: arg.id }
        ]
      }),
  })
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = extendedAdapterSlice
