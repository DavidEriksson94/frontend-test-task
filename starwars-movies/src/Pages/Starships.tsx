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
import { useGetStarshipByIdQuery } from '../Services/starships'
import { extractParameterFromUrl } from '../Utils/StringUtils'

const Starships = () => {
    const { id } = useParams()
    const [relatedFilms, setRelatedFilms] = useState<number[]>([])
    const [relatedPeople, setRelatedPeople] = useState<number[]>([])
    const {
        data: starshipById,
        error: starshipError,
        isLoading,
        isSuccess,
    } = useGetStarshipByIdQuery(Number(id) ? Number(id) : skipToken)
    const { data: relatedFilmsData, error: relatedFilmsError } =
        useGetMultipleFilmsQuery(relatedFilms)
    const { data: relatedPeopleData, error: relatedPeopleError } =
        useGetMultiplePeopleQuery(relatedPeople)
    useEffect(() => {
        if (!isSuccess) return
        const filmIds: number[] = starshipById.films.map((film) =>
            Number(extractParameterFromUrl(film, 'films'))
        )
        setRelatedFilms(filmIds)
        const peopleIds: number[] = starshipById.pilots.map((pilot) =>
            Number(extractParameterFromUrl(pilot, 'people'))
        )
        setRelatedPeople(peopleIds)
    }, [isSuccess])
    if (isLoading || !starshipById) {
        return null
    }
    const {
        name,
        model,
        starship_class,
        manufacturer,
        cost_in_credits,
        length,
        crew,
        passengers,
        max_atmosphering_speed,
        hyperdrive_rating,
        MGLT,
        cargo_capacity,
        consumables,
    } = starshipById
    return (
        <div>
            <Hero
                title={name}
                background_url={
                    'https://www.cnet.com/a/img/resize/ff32644af8398591a22d88f8c2e569c7c0d88bb4/hub/2020/01/09/f79a9662-35a4-4676-bbf6-b71a223e0a5c/ship-tie-razor-crest.jpg?auto=webp&fit=crop&height=675&width=1200'
                }
            />
            <Page roundedTop>
                <PageHeader>
                    <PageHeaderTitle>{name}</PageHeaderTitle>
                    <PageHeaderSubTitle>{manufacturer}</PageHeaderSubTitle>
                </PageHeader>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Planet descriptors</SectionTitle>
                    </SectionHeader>
                    <SectionBody>
                        <p>Model - {model}</p>
                        <p>Manufacturer - {manufacturer}</p>
                        <p>Class - {starship_class}</p>
                        <p>Price - {cost_in_credits} Galactic Credits</p>
                        <p>Crew - {crew} people</p>
                        <p>Passengers - {passengers} people</p>
                        <p>Max speed - {max_atmosphering_speed} m</p>
                        <p>Cargo - {cargo_capacity} kg</p>
                        <p>Consumables - {consumables}</p>
                        <p>Lenght - {length} m</p>
                        <p>Hyperdrive Rating - {hyperdrive_rating}</p>
                        <p>Maximum Megalights - {MGLT}</p>
                    </SectionBody>
                </Section>
                {relatedPeopleData ? (
                    <SectionOfRelatedItems
                        title={`Known drivers of ${name}`}
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

export default Starships
