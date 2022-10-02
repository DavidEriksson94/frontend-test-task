import React from 'react'
import { Link } from 'react-router-dom'
import {
    Film,
    People,
    Planet,
    Species,
    Starship,
    Vehicle,
} from '../../Services/swapi.types'
import { extractParameterFromUrl } from '../../Utils/StringUtils'
import { UnstyledList, UnstyledListItem } from '../GlobalStyles/List'
import {
    Section,
    SectionBody,
    SectionHeader,
    SectionTitle,
} from '../GlobalStyles/Section'

interface FilmProps {
    title: string
    data: Film[]
    type: 'films'
}
type Props =
    | FilmProps
    | PlanetProps
    | PeopleProps
    | SpeciesProps
    | VehicleProps
    | StarshipProps

type SwapiItems = Film | Planet | People | Species | Vehicle | Starship
const isFilm = (data: SwapiItems, type: string): data is Film => {
    return type === 'films'
}
interface PlanetProps {
    title: string
    data: Planet[]
    type: 'planets'
}
interface PeopleProps {
    title: string
    data: People[]
    type: 'people'
}
interface SpeciesProps {
    title: string
    data: Species[]
    type: 'species'
}
interface VehicleProps {
    title: string
    data: Vehicle[]
    type: 'vehicles'
}
interface StarshipProps {
    title: string
    data: Starship[]
    type: 'starships'
}
const SectionOfRelatedItems = ({ title, data, type }: Props) => {
    return (
        <Section>
            <SectionHeader>
                <SectionTitle>{title}</SectionTitle>
            </SectionHeader>
            <SectionBody>
                <UnstyledList>
                    {data.map((item) => {
                        const id = extractParameterFromUrl(item.url, type)
                        let title = ''
                        if (isFilm(item, type)) {
                            title = item.title
                        } else {
                            title = item.name
                        }
                        return (
                            <UnstyledListItem key={item.url}>
                                <Link to={`/${type}/${id}`}>{title}</Link>
                            </UnstyledListItem>
                        )
                    })}
                </UnstyledList>
            </SectionBody>
        </Section>
    )
}

export default SectionOfRelatedItems
