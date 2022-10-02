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
import { useGetMultipleStarshipsQuery } from '../Services/starships'
import { useGetMultipleVehiclesQuery } from '../Services/vehicles'
import { SectionOfRelatedItems } from '../Components/SectionOfRelatedItems'
import { useGetMultipleSpeciesQuery } from '../Services/species'

const Film = () => {
    const [relatedPlanets, setRelatedPlanets] = useState<number[]>([])
    const [relatedCharacters, setRelatedCharacters] = useState<number[]>([])
    const [relatedStarships, setRelatedStarships] = useState<number[]>([])
    const [relatedVehicles, setRelatedVehicles] = useState<number[]>([])
    const [relatedSpecies, setRelatedSpecies] = useState<number[]>([])
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
    const { data: relatedStarshipsData, error: relatedStashipsError } =
        useGetMultipleStarshipsQuery(relatedStarships)
    const { data: relatedVehiclesData, error: relatedVehiclesError } =
        useGetMultipleVehiclesQuery(relatedVehicles)
    const { data: relatedSpeciesData, error: relatedSpeciesError } =
        useGetMultipleSpeciesQuery(relatedSpecies)

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
        const starshipIds: number[] = filmById.starships.map((starship) =>
            Number(extractParameterFromUrl(starship, 'starships'))
        )
        setRelatedStarships(starshipIds)
        const vehicleIds: number[] = filmById.vehicles.map((vehicle) =>
            Number(extractParameterFromUrl(vehicle, 'vehicles'))
        )
        setRelatedVehicles(vehicleIds)
        const speciesIds: number[] = filmById.species.map((_species) =>
            Number(extractParameterFromUrl(_species, 'species'))
        )
        setRelatedSpecies(speciesIds)
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
                        <SectionOfRelatedItems
                            title="Related characters"
                            data={relatedCharctersData}
                            type="people"
                        />
                    ) : null}
                    {relatedPlanetsData ? (
                        <SectionOfRelatedItems
                            title="Related planets"
                            data={relatedPlanetsData}
                            type="planets"
                        />
                    ) : null}
                    {relatedStarshipsData ? (
                        <SectionOfRelatedItems
                            title="Related starships"
                            data={relatedStarshipsData}
                            type="starships"
                        />
                    ) : null}
                    {relatedVehiclesData ? (
                        <SectionOfRelatedItems
                            title="Related vehicles"
                            data={relatedVehiclesData}
                            type="vehicles"
                        />
                    ) : null}
                    {relatedSpeciesData ? (
                        <SectionOfRelatedItems
                            title="Related species"
                            data={relatedSpeciesData}
                            type="species"
                        />
                    ) : null}
                </Page>
            </div>
        )
    }
    return null
}

export default Film
