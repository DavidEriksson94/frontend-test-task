import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import { extractParameterFromUrl } from '../Utils/StringUtils'

const Planet = () => {
    const { id } = useParams()
    const [relatedFilms, setRelatedFilms] = useState<number[]>([])
    const [relatedPeople, setRelatedPeople] = useState<number[]>([])
    const {
        data: planetById,
        error: planetError,
        isLoading,
        isSuccess,
    } = useGetPlanetByIdQuery(Number(id) ? Number(id) : skipToken)
    const { data: relatedFilmsData, error: relatedFilmsError } =
        useGetMultipleFilmsQuery(relatedFilms)
    const { data: relatedPeopleData, error: relatedPeopleError } =
        useGetMultiplePeopleQuery(relatedPeople)

    useEffect(() => {
        if (!isSuccess) return
        const filmIds: number[] = planetById.films.map((film) =>
            Number(extractParameterFromUrl(film, 'films'))
        )
        setRelatedFilms(filmIds)
        const peopleIds: number[] = planetById.residents.map((resident) =>
            Number(extractParameterFromUrl(resident, 'people'))
        )
        setRelatedPeople(peopleIds)
    }, [isSuccess])
    if (isLoading || !planetById) {
        return null
    }
    const {
        name,
        population,
        climate,
        diameter,
        gravity,
        orbital_period,
        rotation_period,
        terrain,
    } = planetById
    return (
        <div>
            <Hero
                title={name}
                background_url={'https://wallpapercave.com/wp/wp8179245.jpg'}
            />
            <Page roundedTop>
                <PageHeader>
                    <PageHeaderTitle>{name}</PageHeaderTitle>
                    <PageHeaderSubTitle>
                        {population} inhabitants
                    </PageHeaderSubTitle>
                </PageHeader>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Planet descriptors</SectionTitle>
                    </SectionHeader>
                    <SectionBody>
                        <p>Climate - {climate}</p>
                        <p>Terrain - {terrain}</p>
                        <p>Diameter - {diameter} km</p>
                        <p>Gravity - {gravity} G</p>
                        <p>Orbital period - {orbital_period} standard days</p>
                        <p>
                            Rotation period - {rotation_period} standard hours
                        </p>
                    </SectionBody>
                </Section>
                {relatedPeopleData ? (
                    <SectionOfRelatedItems
                        title={`Known residents of ${name}`}
                        data={relatedPeopleData}
                        type="people"
                    />
                ) : null}
                {relatedFilmsData ? (
                    <SectionOfRelatedItems
                        title={`Film appearances`}
                        data={relatedFilmsData}
                        type="films"
                    />
                ) : null}
            </Page>
        </div>
    )
}

export default Planet
