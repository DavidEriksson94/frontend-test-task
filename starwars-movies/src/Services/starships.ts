import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { extractParameterFromUrl } from '../Utils/StringUtils'
import { All, ISearchResult, Starship } from './swapi.types'

export const starshipsApi = createApi({
    reducerPath: 'starshipsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['Starship', 'Starships', 'SearchedStarships'],
    endpoints: (builder) => ({
        getAllStarships: builder.query<All<Starship>, void>({
            query: () => `/starships`,
            providesTags: ['Starships'],
        }),
        getStarshipsByName: builder.query<ISearchResult, string>({
            query: (term) => `/starships/?search=${term}`,
            providesTags: (result, error, searchTerm) => [
                { type: 'SearchedStarships', id: searchTerm },
            ],
            transformResponse: (response: All<Starship>, meta, arg) => {
                const results = response.results.map((planet) => ({
                    title: planet.name,
                    url: `/starships/${extractParameterFromUrl(
                        planet.url,
                        'starships'
                    )}`,
                }))
                return {
                    results,
                }
            },
        }),
        getStarshipById: builder.query<Starship, number>({
            query: (id) => `/starships/${id}`,
            providesTags: (result, error, id) => [{ type: 'Starship', id }],
        }),
        getMultipleStarships: builder.query<Starship[], number[]>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result: Starship[] = []
                for (let i = 0; i < _arg.length; i++) {
                    const starship = await fetchWithBQ(`/starships/${_arg[i]}`)
                    if (starship.error) {
                        return { error: starship.error as FetchBaseQueryError }
                    }
                    result.push(starship.data as Starship)
                }
                return { data: result }
            },
        }),
    }),
})

export const {
    useGetAllStarshipsQuery,
    useGetStarshipByIdQuery,
    useGetStarshipsByNameQuery,
    useGetMultipleStarshipsQuery,
} = starshipsApi
