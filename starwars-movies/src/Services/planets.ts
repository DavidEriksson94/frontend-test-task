import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { All, Planet } from './swapi.types'

export const planetApi = createApi({
    reducerPath: 'planetApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    endpoints: (builder) => ({
        getAllPlanets: builder.query<All<Planet>, void>({
            query: () => `/planets`,
        }),
        getPlanetById: builder.query<Planet, number>({
            query: (id) => `/planets/${id}`,
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
    useGetPlanetByIdQuery,
    useGetMultiplePlanetsQuery,
} = planetApi
