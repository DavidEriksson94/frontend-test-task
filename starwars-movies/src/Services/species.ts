import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { extractParameterFromUrl } from '../Utils/StringUtils'
import { All, ISearchResult, Species } from './swapi.types'

export const speciesApi = createApi({
    reducerPath: 'speciesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['Species', 'SpeciesAll', 'SearchedSpecies'],
    endpoints: (builder) => ({
        getAllSpecies: builder.query<All<Species>, void>({
            query: () => `/species`,
            providesTags: ['SpeciesAll'],
        }),
        getSpeciesByName: builder.query<ISearchResult, string>({
            query: (term) => `/species/?search=${term}`,
            providesTags: (result, error, searchTerm) => [
                { type: 'SearchedSpecies', id: searchTerm },
            ],
            transformResponse: (response: All<Species>, meta, arg) => {
                const results = response.results.map((planet) => ({
                    title: planet.name,
                    url: `/species/${extractParameterFromUrl(
                        planet.url,
                        'species'
                    )}`,
                }))
                return {
                    results,
                }
            },
        }),
        getSpeciesById: builder.query<Species, number>({
            query: (id) => `/species/${id}`,
            providesTags: (result, error, id) => [{ type: 'Species', id }],
        }),
        getMultipleSpecies: builder.query<Species[], number[]>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result: Species[] = []
                for (let i = 0; i < _arg.length; i++) {
                    const species = await fetchWithBQ(`/species/${_arg[i]}`)
                    if (species.error) {
                        return { error: species.error as FetchBaseQueryError }
                    }
                    result.push(species.data as Species)
                }
                return { data: result }
            },
        }),
    }),
})

export const {
    useGetAllSpeciesQuery,
    useGetSpeciesByNameQuery,
    useGetSpeciesByIdQuery,
    useGetMultipleSpeciesQuery,
} = speciesApi
