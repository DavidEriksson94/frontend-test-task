import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { extractParameterFromUrl } from '../Utils/StringUtils'
import { All, Film, ISearchResult } from './swapi.types'

export const filmApi = createApi({
    reducerPath: 'filmApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['Film', 'Films', 'SearchedFilms'],
    endpoints: (builder) => ({
        getAllFilms: builder.query<All<Film>, void>({
            query: () => `/films`,
            providesTags: ['Films'],
        }),
        getFilmsByTitle: builder.query<ISearchResult, string>({
            query: (term) => `/films/?search=${term}`,
            providesTags: (result, error, searchTerm) => [
                { type: 'SearchedFilms', id: searchTerm },
            ],
            transformResponse: (response: All<Film>, meta, arg) => {
                const results = response.results.map((film) => ({
                    title: film.title,
                    url: `/films/${extractParameterFromUrl(film.url, 'films')}`,
                }))
                return {
                    results,
                }
            },
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
    useGetFilmsByTitleQuery,
    useGetFilmByIdQuery,
    useGetMultipleFilmsQuery,
} = filmApi
