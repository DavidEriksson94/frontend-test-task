import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { All, Starship } from './swapi.types'

export const starshipsApi = createApi({
    reducerPath: 'starshipsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    endpoints: (builder) => ({
        getAllStarships: builder.query<All<Starship>, void>({
            query: () => `/starships`,
        }),
        getStarshipById: builder.query<Starship, number>({
            query: (id) => `/starships/${id}`,
        }),
        getMultipleStarships: builder.query<Starship[], number[]>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result: Starship[] = []
                for (let i = 0; i < _arg.length; i++) {
                    const film = await fetchWithBQ(`/starships/${_arg[i]}`)
                    if (film.error) {
                        return { error: film.error as FetchBaseQueryError }
                    }
                    result.push(film.data as Starship)
                }
                return { data: result }
            },
        }),
    }),
})

export const {
    useGetAllStarshipsQuery,
    useGetStarshipByIdQuery,
    useGetMultipleStarshipsQuery,
} = starshipsApi
