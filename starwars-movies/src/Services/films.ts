import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { All, Film } from './swapi.types'

export const filmApi = createApi({
    reducerPath: 'filmApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['Film', 'Films'],
    endpoints: (builder) => ({
        getAllFilms: builder.query<All<Film>, void>({
            query: () => `/films`,
            providesTags: ['Films'],
        }),
        getFilmById: builder.query<Film, number>({
            query: (id) => `/films/${id}`,
            providesTags: (result, error, id) => [{ type: 'Film', id }],
        }),
        getMultipleFilms: builder.query<Film[], number[]>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result: Film[] = []
                for (let i = 0; i < _arg.length; i++) {
                    const film = await fetchWithBQ(`/films/${_arg[i]}`)
                    if (film.error) {
                        return { error: film.error as FetchBaseQueryError }
                    }
                    result.push(film.data as Film)
                }
                return { data: result }
            },
        }),
    }),
})

export const {
    useGetAllFilmsQuery,
    useGetFilmByIdQuery,
    useGetMultipleFilmsQuery,
} = filmApi
