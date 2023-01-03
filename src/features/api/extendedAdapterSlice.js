//import React from 'react'
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSliceRoot } from './apiSliceRoot'

const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id
})

const initialState = todosAdapter.getInitialState()

export const extendedAdapterSlice = apiSliceRoot.injectEndpoints({
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
              return todosAdapter.setAll(initialState, ({ 
                        data: res,  
                        totalCount: Number(meta.response.headers.get('X-Total-Count')),
                        headerLink: String(meta.response.headers.get("Link")) 
                      }))
            },
            providesTags: (result, error, arg) => [
                { type: 'Todo', id: "LIST" },
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


// returns the query result object
export const selectTodosResult = extendedAdapterSlice.endpoints.getTodos.select()

// Creates memoized selector
const selectTodosData = createSelector(
    selectTodosResult,
    todosResult => todosResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
    selectIds: selectTodoIds
    // Pass in a selector that returns the todos slice of state
} = todosAdapter.getSelectors(state => selectTodosData(state) ?? initialState)
