import { skipToken } from '@reduxjs/toolkit/dist/query'
import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    Page,
    PageHeader,
    PageHeaderSubTitle,
    PageHeaderTitle,
} from '../Components/GlobalStyles/Page'
import {
    Section,
    SectionBody,
    SectionHeader,
    SectionTitle,
} from '../Components/GlobalStyles/Section'
import { Hero } from '../Components/Hero'
import { SectionOfRelatedItems } from '../Components/SectionOfRelatedItems'
import { useGetMultipleFilmsQuery } from '../Services/films'
import { useGetPeopleByIdQuery } from '../Services/people'
import { useGetPlanetByIdQuery } from '../Services/planets'
import { useGetMultipleSpeciesQuery } from '../Services/species'
import { useGetMultipleStarshipsQuery } from '../Services/starships'
import { useGetMultipleVehiclesQuery } from '../Services/vehicles'
import { extractParameterFromUrl } from '../Utils/StringUtils'

const People = () => {
    const { id } = useParams()
    const [planetId, setPlanetId] = useState<number | null>(null)
    const [relatedFilms, setRelatedFilms] = useState<number[]>([])
    const [relatedStarships, setRelatedStarships] = useState<number[]>([])
    const [relatedVehicles, setRelatedVehicles] = useState<number[]>([])
    const [relatedSpecies, setRelatedSpecies] = useState<number[]>([])
    const {
        data: personById,
        error: personError,
        isLoading,
        isSuccess,
    } = useGetPeopleByIdQuery(Number(id) ? Number(id) : skipToken)
    const {
        data: planetById,
        error: planetError,
        isLoading: planetIsLoading,
        isSuccess: planetIsSuccess,
    } = useGetPlanetByIdQuery(planetId ? planetId : skipToken)
    const { data: relatedFilmsData, error: relatedFilmsError } =
        useGetMultipleFilmsQuery(relatedFilms)
    const { data: relatedStarshipsData, error: relatedStashipsError } =
        useGetMultipleStarshipsQuery(relatedStarships)
    const { data: relatedVehiclesData, error: relatedVehiclesError } =
        useGetMultipleVehiclesQuery(relatedVehicles)
    const { data: relatedSpeciesData, error: relatedSpeciesError } =
        useGetMultipleSpeciesQuery(relatedSpecies)

    useEffect(() => {
        if (!isSuccess) return
        setPlanetId(
            Number(extractParameterFromUrl(personById.homeworld, 'planets'))
        )
        const filmIds: number[] = personById.films.map((film) =>
            Number(extractParameterFromUrl(film, 'films'))
        )
        setRelatedFilms(filmIds)
        const starshipIds: number[] = personById.starships.map((starship) =>
            Number(extractParameterFromUrl(starship, 'starships'))
        )
        setRelatedStarships(starshipIds)
        const vehicleIds: number[] = personById.vehicles.map((vehicle) =>
            Number(extractParameterFromUrl(vehicle, 'vehicles'))
        )
        setRelatedVehicles(vehicleIds)
        const speciesIds: number[] = personById.species.map((_species) =>
            Number(extractParameterFromUrl(_species, 'species'))
        )
        setRelatedSpecies(speciesIds)
    }, [isSuccess])
    if (isLoading || !personById) {
        return null
    }
    const {
        name,
        birth_year,
        eye_color,
        gender,
        hair_color,
        height,
        mass,
        skin_color,
    } = personById
    return (
        <div>
            <Hero
                title={personById.name}
                background_url="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F11%2Fattack-of-the-clones-2000.jpg"
            />
            <Page roundedTop>
                <PageHeader>
                    <PageHeaderTitle>{name}</PageHeaderTitle>
                    {planetById ? (
                        <PageHeaderSubTitle>
                            From the planet{' '}
                            <Link to={`/planet/${planetId}`}>
                                {planetById?.name}
                            </Link>
                        </PageHeaderSubTitle>
                    ) : null}
                </PageHeader>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Character descriptors</SectionTitle>
                    </SectionHeader>
                    <SectionBody>
                        <p>Birth year - {birth_year}</p>
                        <p>Height - {height} cm</p>
                        <p>Weight - {mass} kg</p>
                        <p>Gender - {gender}</p>
                        <p>Eye color - {eye_color}</p>
                        <p>Hair color - {hair_color}</p>
                        <p>Skin color - {skin_color}</p>
                    </SectionBody>
                </Section>
                {relatedFilmsData ? (
                    <SectionOfRelatedItems
                        title="Film appearances"
                        data={relatedFilmsData}
                        type="films"
                    />
                ) : null}
                {relatedStarshipsData ? (
                    <SectionOfRelatedItems
                        title={`Starships used by ${name}`}
                        data={relatedStarshipsData}
                        type="starships"
                    />
                ) : null}
                {relatedVehiclesData ? (
                    <SectionOfRelatedItems
                        title={`Vehicles used by ${name}`}
                        data={relatedVehiclesData}
                        type="vehicles"
                    />
                ) : null}
                {relatedSpeciesData ? (
                    <SectionOfRelatedItems
                        title={`${name}s species`}
                        data={relatedSpeciesData}
                        type="species"
                    />
                ) : null}
            </Page>
        </div>
    )
}

export default People
