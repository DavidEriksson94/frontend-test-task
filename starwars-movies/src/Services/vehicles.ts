import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { All, Vehicle } from './swapi.types'

export const vehicleApi = createApi({
    reducerPath: 'vehicleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
    endpoints: (builder) => ({
        getAllVehicles: builder.query<All<Vehicle>, void>({
            query: () => `/vehicles`,
        }),
        getVehicleById: builder.query<Vehicle, number>({
            query: (id) => `/vehicles/${id}`,
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
    useGetVehicleByIdQuery,
    useGetMultipleVehiclesQuery,
} = vehicleApi
