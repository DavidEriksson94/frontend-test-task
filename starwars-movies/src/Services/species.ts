import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { All, Species } from './swapi.types'

export const speciesApi = createApi({
    reducerPath: 'speciesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['Species', 'SpeciesAll'],
    endpoints: (builder) => ({
        getAllSpecies: builder.query<All<Species>, void>({
            query: () => `/species`,
            providesTags: ['SpeciesAll'],
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
    useGetSpeciesByIdQuery,
    useGetMultipleSpeciesQuery,
} = speciesApi
