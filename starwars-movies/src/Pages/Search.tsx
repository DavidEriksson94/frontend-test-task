import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useState } from 'react'
import { Page } from '../Components/GlobalStyles/Page'
import { SearchBar } from '../Components/SearchBar'
import { SearchResult } from '../Components/SearchResult'
import { useGetFilmsByTitleQuery } from '../Services/films'
import { useGetPeopleByNameQuery } from '../Services/people'
import { useGetPlanetsByNameQuery } from '../Services/planets'
import { useGetSpeciesByNameQuery } from '../Services/species'
import { useGetStarshipsByNameQuery } from '../Services/starships'
import { useGetVehiclesByNameQuery } from '../Services/vehicles'
import useDebounce from '../Utils/Hooks/useDebounce'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 200)
    const { data: filmResults } = useGetFilmsByTitleQuery(
        debouncedSearchTerm.length > 0 ? debouncedSearchTerm : skipToken
    )
    const { data: peopleResults } = useGetPeopleByNameQuery(
        debouncedSearchTerm.length > 0 ? debouncedSearchTerm : skipToken
    )
    const { data: planetResults } = useGetPlanetsByNameQuery(
        debouncedSearchTerm.length > 0 ? debouncedSearchTerm : skipToken
    )
    const { data: speciesResults } = useGetSpeciesByNameQuery(
        debouncedSearchTerm.length > 0 ? debouncedSearchTerm : skipToken
    )
    const { data: starshipsResult } = useGetStarshipsByNameQuery(
        debouncedSearchTerm.length > 0 ? debouncedSearchTerm : skipToken
    )
    const { data: vehiclesResult } = useGetVehiclesByNameQuery(
        debouncedSearchTerm.length > 0 ? debouncedSearchTerm : skipToken
    )

    return (
        <div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <Page>
                <SearchResult title="Films" data={filmResults} />
                <SearchResult title="Characters" data={peopleResults} />
                <SearchResult title="Planets" data={planetResults} />
                <SearchResult title="Species" data={speciesResults} />
                <SearchResult title="Starships" data={starshipsResult} />
                <SearchResult title="Vehicles" data={vehiclesResult} />
            </Page>
        </div>
    )
}

export default Search
