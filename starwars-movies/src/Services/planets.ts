import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { extractParameterFromUrl } from '../Utils/StringUtils'
import { All, Planet, ISearchResult } from './swapi.types'

export const planetApi = createApi({
    reducerPath: 'planetApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['Planet', 'Planets', 'SearchedPlanets'],
    endpoints: (builder) => ({
        getAllPlanets: builder.query<All<Planet>, void>({
            query: () => `/planets`,
            providesTags: ['Planets'],
        }),
        getPlanetsByName: builder.query<ISearchResult, string>({
            query: (term) => `/planets/?search=${term}`,
            providesTags: (result, error, searchTerm) => [
                { type: 'SearchedPlanets', id: searchTerm },
            ],
            transformResponse: (response: All<Planet>, meta, arg) => {
                const results = response.results.map((planet) => ({
                    title: planet.name,
                    url: `/planets/${extractParameterFromUrl(
                        planet.url,
                        'planets'
                    )}`,
                }))
                return {
                    results,
                }
            },
        }),
        getPlanetById: builder.query<Planet, number>({
            query: (id) => `/planets/${id}`,
            providesTags: (result, error, id) => [{ type: 'Planet', id }],
        }),
        getMultiplePlanets: builder.query<Planet[], number[]>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result: Planet[] = []
                for (let i = 0; i < _arg.length; i++) {
                    const people = await fetchWithBQ(`/planets/${_arg[i]}`)
                    if (people.error) {
                        return { error: people.error as FetchBaseQueryError }
                    }
                    result.push(people.data as Planet)
                }
                return { data: result }
            },
        }),
    }),
})

export const {
    useGetAllPlanetsQuery,
    useGetPlanetsByNameQuery,
    useGetPlanetByIdQuery,
    useGetMultiplePlanetsQuery,
} = planetApi
