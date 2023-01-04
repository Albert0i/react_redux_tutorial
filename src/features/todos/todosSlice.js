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
                const saltedTodos = res.map(todo => {
                        todo.totalCount=Number(meta.response.headers.get('X-Total-Count'))
                        return todo;
                });
                return todosAdapter.setAll(initialState, saltedTodos)
            },
            providesTags: (result, error, arg) => [
                { type: 'Todos', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Todo', id }))
            ]
      }),
      addTodo: builder.mutation({
          query: (todo) => ({
              url: '/todos',
              method: 'POST',
              body: todo
          }),
          invalidatesTags: ['Todos']
      }),
      updateTodo: builder.mutation({
          query: (todo) => ({
              url: `/todos/${todo.id}`,
              method: 'PATCH',
              body: todo
          }),
          invalidatesTags: ['Todos']
      }),
      deleteTodo: builder.mutation({
          query: ({ id }) => ({
              url: `/todos/${id}`,
              method: 'DELETE',
              body: { id }    // original was: ＂body: id＂
          }),
          invalidatesTags: ['Todos']
      }),
  })
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = extendedAdapterSlice
