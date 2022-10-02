import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { All, People } from './swapi.types'

export const peopleApi = createApi({
    reducerPath: 'peopleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['People', 'Person'],
    endpoints: (builder) => ({
        getAllPeople: builder.query<All<People>, void>({
            query: () => `/people`,
            providesTags: ['People'],
        }),
        getPeopleById: builder.query<People, number>({
            query: (id) => `/people/${id}`,
            providesTags: (result, error, id) => [{ type: 'Person', id }],
        }),
        getMultiplePeople: builder.query<People[], number[]>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result: People[] = []
                for (let i = 0; i < _arg.length; i++) {
                    const people = await fetchWithBQ(`/people/${_arg[i]}`)
                    if (people.error) {
                        return { error: people.error as FetchBaseQueryError }
                    }
                    result.push(people.data as People)
                }
                return { data: result }
            },
        }),
    }),
})

export const {
    useGetAllPeopleQuery,
    useGetPeopleByIdQuery,
    useGetMultiplePeopleQuery,
} = peopleApi
