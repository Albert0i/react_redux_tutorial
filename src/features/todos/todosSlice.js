import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id
})

const initialState = todosAdapter.getInitialState() 

export const extendedAdapterSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getTodos: builder.query({
          // Original was: "query: () => '/todos',"
          query: ( { page, limit } ) => `/todos?_page=${page}&_limit=${limit}&_sort=id&_order=desc`,
          // Original was: "transformResponse: res => res.sort((a, b) => b.id - a.id), ""
          transformResponse(res, meta) {
              // Original was: 
              // return ({ 
              //             data: res, 
              //             totalCount: Number(meta.response.headers.get('X-Total-Count')),
              //             headerLink: String(meta.response.headers.get("Link"))
              //         })
            //   return todosAdapter.setAll(initialState, ({ 
            //             data: res,  
            //             totalCount: Number(meta.response.headers.get('X-Total-Count')),
            //             headerLink: String(meta.response.headers.get("Link")) 
            //           }))                              
            //    res.totalCount=Number(meta.response.headers.get('X-Total-Count'))
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
