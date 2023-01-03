import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSliceRoot = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({})
})
