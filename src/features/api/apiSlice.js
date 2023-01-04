import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todo'],
    endpoints: builder => ({})
})

/*
   How to get X-Total-Count header with RTK Query?
   https://stackoverflow.com/questions/70408411/how-to-get-x-total-count-header-with-rtk-query

   Pagination in a json-server API with the link header
   https://joshgoestoflatiron.medium.com/february-10-pagination-in-a-json-server-api-with-the-link-header-dea63eb0a835

   typicode/json-server
   https://github.com/typicode/json-server

   Pagination in React Tutorial with React Query, Hooks Examples
   https://youtu.be/9ZbdwL5NSuQ

   130 Motivational Quotes of the Day to Get you Motivated
   https://www.invajy.com/motivational-quotes-of-the-day/
*/