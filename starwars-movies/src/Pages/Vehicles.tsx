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
import { useGetVehicleByIdQuery } from '../Services/vehicles'
import { extractParameterFromUrl } from '../Utils/StringUtils'

const Vehicles = () => {
    const { id } = useParams()
    const [relatedFilms, setRelatedFilms] = useState<number[]>([])
    const [relatedPeople, setRelatedPeople] = useState<number[]>([])
    const {
        data: vehicleById,
        error: vehicleError,
        isLoading,
        isSuccess,
    } = useGetVehicleByIdQuery(Number(id) ? Number(id) : skipToken)
    const { data: relatedFilmsData, error: relatedFilmsError } =
        useGetMultipleFilmsQuery(relatedFilms)
    const { data: relatedPeopleData, error: relatedPeopleError } =
        useGetMultiplePeopleQuery(relatedPeople)
    useEffect(() => {
        if (!isSuccess) return
        const filmIds: number[] = vehicleById.films.map((film) =>
            Number(extractParameterFromUrl(film, 'films'))
        )
        setRelatedFilms(filmIds)
        const peopleIds: number[] = vehicleById.pilots.map((pilot) =>
            Number(extractParameterFromUrl(pilot, 'people'))
        )
        setRelatedPeople(peopleIds)
    }, [isSuccess])
    if (isLoading || !vehicleById) {
        return null
    }
    const {
        name,
        model,
        vehicle_class,
        manufacturer,
        length,
        cost_in_credits,
        crew,
        passengers,
        max_atmosphering_speed,
        cargo_capacity,
        consumables,
    } = vehicleById
    return (
        <div>
            <Hero
                title={name}
                background_url={
                    'https://www.cnet.com/a/img/resize/f453c76ca83f765e4f4d7691a63e7f2edab960d4/hub/2015/02/05/912b6a9a-c74d-4599-bfd3-affee63de5b4/star-wars-vehicles-podracer.jpg?auto=webp&width=1200'
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
                        <p>Class - {vehicle_class}</p>
                        <p>Price - {cost_in_credits} Galactic Credits</p>
                        <p>Crew - {crew} people</p>
                        <p>Passengers - {passengers} people</p>
                        <p>Max speed - {max_atmosphering_speed} m</p>
                        <p>Cargo - {cargo_capacity} kg</p>
                        <p>Consumables - {consumables}</p>
                        <p>Lenght - {length} m</p>
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

export default Vehicles
