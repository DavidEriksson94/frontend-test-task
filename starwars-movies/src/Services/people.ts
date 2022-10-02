import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { extractParameterFromUrl } from '../Utils/StringUtils'
import { All, ISearchResult, People } from './swapi.types'

export const peopleApi = createApi({
    reducerPath: 'peopleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['People', 'Person', 'SearchedPeople'],
    endpoints: (builder) => ({
        getAllPeople: builder.query<All<People>, void>({
            query: () => `/people`,
            providesTags: ['People'],
        }),
        getPeopleByName: builder.query<ISearchResult, string>({
            query: (term) => `/people/?search=${term}`,
            providesTags: (result, error, searchTerm) => [
                { type: 'SearchedPeople', id: searchTerm },
            ],
            transformResponse: (response: All<People>, meta, arg) => {
                const results = response.results.map((person) => ({
                    title: person.name,
                    url: `/people/${extractParameterFromUrl(
                        person.url,
                        'people'
                    )}`,
                }))
                return {
                    results,
                }
            },
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
    useGetPeopleByNameQuery,
    useGetPeopleByIdQuery,
    useGetMultiplePeopleQuery,
} = peopleApi
