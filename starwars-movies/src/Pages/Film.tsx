import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import OpeningCrawlHero from '../Components/OpeningCrawlHero'
import {
    Section,
    SectionBody,
    SectionHeader,
    SectionTitle,
} from '../Components/GlobalStyles/Section'
import { useGetFilmByIdQuery } from '../Services/films'
import { useGetMultiplePeopleQuery } from '../Services/people'
import { useGetMultiplePlanetsQuery } from '../Services/planets'
import { extractParameterFromUrl } from '../Utils/StringUtils'
import { UnstyledList, UnstyledListItem } from '../Components/GlobalStyles/List'
import {
    Page,
    PageHeader,
    PageHeaderSubTitle,
    PageHeaderTitle,
} from '../Components/GlobalStyles/Page'

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
        const characterIds: number[] = filmById.characters.map((character) =>
            Number(extractParameterFromUrl(character, 'people'))
        )
        setRelatedCharacters(characterIds)
        const planetIds: number[] = filmById.planets.map((planet) =>
            Number(extractParameterFromUrl(planet, 'planets'))
        )
        setRelatedPlanets(planetIds)
    }, [isSuccess])

    const renderOpeningCrawl = (text: string) =>
        text.split('\r\n\r\n').map((paragraph) => <p>{paragraph}</p>)

    if (isLoading) return null
    if (filmError) {
        return null
    }
    if (filmById) {
        const {
            title,
            episode_id,
            release_date,
            opening_crawl,
            director,
            producer,
        } = filmById
        console.log(filmById)
        return (
            <div>
                <OpeningCrawlHero title={title} text={opening_crawl} />
                <Page roundedTop>
                    <PageHeader>
                        <PageHeaderTitle>{title}</PageHeaderTitle>
                        <PageHeaderSubTitle>
                            Episode {episode_id}
                        </PageHeaderSubTitle>
                    </PageHeader>

                    <Section>
                        <SectionHeader>
                            <SectionTitle>Opening crawl</SectionTitle>
                        </SectionHeader>
                        <SectionBody>
                            {renderOpeningCrawl(opening_crawl)}
                        </SectionBody>
                    </Section>
                    <Section>
                        <SectionHeader>
                            <SectionTitle>Production</SectionTitle>
                        </SectionHeader>
                        <SectionBody>
                            <p>Release date - {release_date}</p>
                            <p>Director(s) - {director}</p>
                            <p>Producer(s) - {producer}</p>
                        </SectionBody>
                    </Section>
                    {relatedCharctersData ? (
                        <Section>
                            <SectionHeader>
                                <SectionTitle>Related characters</SectionTitle>
                            </SectionHeader>
                            <SectionBody>
                                <UnstyledList>
                                    {relatedCharctersData.map((character) => {
                                        const id = extractParameterFromUrl(
                                            character.url,
                                            'people'
                                        )
                                        return (
                                            <UnstyledListItem
                                                key={character.url}
                                            >
                                                <Link to={`/people/${id}`}>
                                                    {character.name}
                                                </Link>
                                            </UnstyledListItem>
                                        )
                                    })}
                                </UnstyledList>
                            </SectionBody>
                        </Section>
                    ) : null}
                    {relatedPlanetsData ? (
                        <Section>
                            <SectionHeader>
                                <SectionTitle>Related planets</SectionTitle>
                            </SectionHeader>
                            <SectionBody>
                                <UnstyledList>
                                    {relatedPlanetsData.map((planet) => {
                                        const id = extractParameterFromUrl(
                                            planet.url,
                                            'planets'
                                        )
                                        return (
                                            <UnstyledListItem key={planet.url}>
                                                <Link to={`/planet/${id}`}>
                                                    {planet.name}
                                                </Link>
                                            </UnstyledListItem>
                                        )
                                    })}
                                </UnstyledList>
                            </SectionBody>
                        </Section>
                    ) : null}
                </Page>
            </div>
        )
    }
    return null
}

export default Film
