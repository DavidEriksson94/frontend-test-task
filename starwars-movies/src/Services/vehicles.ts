import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { extractParameterFromUrl } from '../Utils/StringUtils'
import { All, ISearchResult, Vehicle } from './swapi.types'

export const vehicleApi = createApi({
    reducerPath: 'vehicleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    tagTypes: ['Vehicle', 'Vehicles', 'SearchedVehicles'],
    endpoints: (builder) => ({
        getAllVehicles: builder.query<All<Vehicle>, void>({
            query: () => `/vehicles`,
            providesTags: ['Vehicles'],
        }),
        getVehiclesByName: builder.query<ISearchResult, string>({
            query: (term) => `/vehicles/?search=${term}`,
            providesTags: (result, error, searchTerm) => [
                { type: 'SearchedVehicles', id: searchTerm },
            ],
            transformResponse: (response: All<Vehicle>, meta, arg) => {
                const results = response.results.map((vehicle) => ({
                    title: vehicle.name,
                    url: `/vehicles/${extractParameterFromUrl(
                        vehicle.url,
                        'vehicles'
                    )}`,
                }))
                return {
                    results,
                }
            },
        }),
        getVehicleById: builder.query<Vehicle, number>({
            query: (id) => `/vehicles/${id}`,
            providesTags: (result, error, id) => [{ type: 'Vehicle', id }],
        }),
        getMultipleVehicles: builder.query<Vehicle[], number[]>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result: Vehicle[] = []
                for (let i = 0; i < _arg.length; i++) {
                    const vehicle = await fetchWithBQ(`/vehicles/${_arg[i]}`)
                    if (vehicle.error) {
                        return { error: vehicle.error as FetchBaseQueryError }
                    }
                    result.push(vehicle.data as Vehicle)
                }
                return { data: result }
            },
        }),
    }),
})

export const {
    useGetAllVehiclesQuery,
    useGetVehiclesByNameQuery,
    useGetVehicleByIdQuery,
    useGetMultipleVehiclesQuery,
} = vehicleApi
