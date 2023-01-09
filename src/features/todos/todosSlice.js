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
      getTodoById: builder.query({
          query: ( id ) => `/todos?id=${id}`,
          transformResponse: res => res && res[0],
          providesTags: (result, error, arg) => [
            { type: 'Todos', id: arg.id }
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
  useGetTodoByIdQuery, 
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = extendedAdapterSlice

/*
   Automated Re-fetching
   https://redux-toolkit.js.org/rtk-query/usage/automated-refetching

   The providesTags argument can either be an array of string (such as ['Post']), {type: string, id?: string|number} (such as [{type: 'Post', id: 1}]), or a callback that returns such an array. That function will be passed the result as the first argument, the response error as the second argument, and the argument originally passed into the query method as the third argument. Note that either the result or error arguments may be undefined based on whether the query was successful or not.

   The invalidatesTags argument can either be an array of string (such as ['Post']), {type: string, id?: string|number} (such as [{type: 'Post', id: 1}]), or a callback that returns such an array. That function will be passed the result as the first argument, the response error as the second argument, and the argument originally passed into the query method as the third argument. Note that either the result or error arguments may be undefined based on whether the mutation was successful or not.
*/