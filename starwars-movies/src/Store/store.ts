import { configureStore } from '@reduxjs/toolkit'
import { filmApi } from '../Services/films'
import { peopleApi } from '../Services/people'
import { planetApi } from '../Services/planets'
import { starshipsApi } from '../Services/starships'
import { vehicleApi } from '../Services/vehicles'

export const store = configureStore({
    reducer: {
        [filmApi.reducerPath]: filmApi.reducer,
        [peopleApi.reducerPath]: peopleApi.reducer,
        [planetApi.reducerPath]: planetApi.reducer,
        [starshipsApi.reducerPath]: starshipsApi.reducer,
        [vehicleApi.reducerPath]: vehicleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            filmApi.middleware,
            peopleApi.middleware,
            planetApi.middleware,
            starshipsApi.middleware,
            vehicleApi.middleware
        ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
