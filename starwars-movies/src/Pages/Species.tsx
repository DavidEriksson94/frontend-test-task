import { skipToken } from '@reduxjs/toolkit/dist/query'
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
import { useGetMultiplePeopleQuery } from '../Services/people'
import { useGetPlanetByIdQuery } from '../Services/planets'
import { useGetSpeciesByIdQuery } from '../Services/species'
import { extractParameterFromUrl } from '../Utils/StringUtils'

const Species = () => {
    const { id } = useParams()
    const [planetId, setPlanetId] = useState<number | null>(null)
    const [relatedFilms, setRelatedFilms] = useState<number[]>([])
    const [relatedPeople, setRelatedPeople] = useState<number[]>([])
    const {
        data: speciesById,
        error: speciesError,
        isLoading,
        isSuccess,
    } = useGetSpeciesByIdQuery(Number(id) ? Number(id) : skipToken)
    const {
        data: planetById,
        error: planetError,
        isLoading: planetIsLoading,
        isSuccess: planetIsSuccess,
    } = useGetPlanetByIdQuery(planetId ? planetId : skipToken)
    const { data: relatedFilmsData, error: relatedFilmsError } =
        useGetMultipleFilmsQuery(relatedFilms)
    const { data: relatedPeopleData, error: relatedPeopleError } =
        useGetMultiplePeopleQuery(relatedPeople)
    useEffect(() => {
        if (!isSuccess) return
        if (speciesById.homeworld) {
            setPlanetId(
                Number(
                    extractParameterFromUrl(speciesById.homeworld, 'planets')
                )
            )
        }
        const filmIds: number[] = speciesById.films.map((film) =>
            Number(extractParameterFromUrl(film, 'films'))
        )
        setRelatedFilms(filmIds)
        const peopleIds: number[] = speciesById.people.map((person) =>
            Number(extractParameterFromUrl(person, 'people'))
        )
        setRelatedPeople(peopleIds)
    }, [isSuccess])
    if (isLoading || !speciesById) {
        return null
    }
    const {
        name,
        classification,
        designation,
        average_height,
        average_lifespan,
        eye_colors,
        hair_colors,
        skin_colors,
        language,
    } = speciesById
    return (
        <div>
            <Hero
                title={speciesById.name}
                background_url="https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/1618092850787-386VDX2Y5HKIJW53PM2O/Kit+Fisto.jpg"
            />
            <Page roundedTop>
                <PageHeader>
                    <PageHeaderTitle>{name}</PageHeaderTitle>
                    {planetById ? (
                        <PageHeaderSubTitle>
                            From the planet{' '}
                            <Link to={`/planets/${planetId}`}>
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
                        <p>Classification - {classification}</p>
                        <p>Designation - {designation}</p>
                        <p>Average height - {average_height} m</p>
                        <p>Average lifespan - {average_lifespan} years</p>
                        <p>Language - {language}</p>
                        <p>Eye color - {eye_colors}</p>
                        <p>Hair color - {hair_colors}</p>
                        <p>Skin color - {skin_colors}</p>
                    </SectionBody>
                </Section>
                {relatedPeopleData ? (
                    <SectionOfRelatedItems
                        title={`Known characters of ${name}`}
                        data={relatedPeopleData}
                        type="people"
                    />
                ) : null}
                {relatedFilmsData ? (
                    <SectionOfRelatedItems
                        title="Film appearances"
                        data={relatedFilmsData}
                        type="films"
                    />
                ) : null}
            </Page>
        </div>
    )
}

export default Species
