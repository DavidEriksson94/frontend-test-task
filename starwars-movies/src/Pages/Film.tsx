import { skipToken } from '@reduxjs/toolkit/dist/query'
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetFilmByIdQuery } from '../Services/films'
import { useGetMultiplePeopleQuery } from '../Services/people'
import { useGetMultiplePlanetsQuery } from '../Services/planets'
import { extractParameterFromUrl } from '../Utils/StringUtils'

const Film = () => {
    const [title, setTitle] = useState<string>()
    const [releaseDate, setReleaseDate] = useState<string>()
    const [episodeId, setEpisodeId] = useState<number>()
    const [relatedPlanets, setRelatedPlanets] = useState<number[]>([])
    const [relatedCharacters, setRelatedCharacters] = useState<number[]>([])
    const { id } = useParams()
    const {
        data: filmById,
        error: filmError,
        isLoading,
        isSuccess,
    } = useGetFilmByIdQuery(Number(id) ? Number(id) : skipToken)
    const { data: relatedCharctersData, error: relatedCharactersError } =
        useGetMultiplePeopleQuery(relatedCharacters)
    const { data: relatedPlanetsData, error: relatedPlanetsError } =
        useGetMultiplePlanetsQuery(relatedPlanets)

    useEffect(() => {
        if (!isSuccess) return
        console.log(filmById)
        const characterIds: number[] = filmById.characters.map((character) =>
            Number(extractParameterFromUrl(character, 'people'))
        )
        setRelatedCharacters(characterIds)
        const planetIds: number[] = filmById.planets.map((planet) =>
            Number(extractParameterFromUrl(planet, 'planets'))
        )
        setRelatedPlanets(planetIds)
    }, [isSuccess])

    const renderOpeningCrawl = (text: string) => {
        return text
            .split('\n')
            .map((row, index) => <p key={`crawl_${index}`}>{row}</p>)
    }
    if (isLoading) return null
    if (filmError) {
        console.log(filmError)
        return null
    }
    if (filmById) {
        const { title, episode_id, release_date, opening_crawl } = filmById
        return (
            <div>
                <h1>{title}</h1>
                <h3>
                    Episode {episode_id} - {release_date}
                </h3>
                <h3>Opening crawl</h3>
                <div>{renderOpeningCrawl(opening_crawl)}</div>
                {relatedCharctersData ? (
                    <div>
                        <h4>Related characters</h4>
                        <ul>
                            {relatedCharctersData.map((character) => {
                                return (
                                    <li key={character.url}>
                                        {character.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ) : null}
                {relatedPlanetsData ? (
                    <div>
                        <h4>Related planets</h4>
                        <ul>
                            {relatedPlanetsData.map((planet) => {
                                return <li key={planet.url}>{planet.name}</li>
                            })}
                        </ul>
                    </div>
                ) : null}
            </div>
        )
    }
    return null
}

export default Film
