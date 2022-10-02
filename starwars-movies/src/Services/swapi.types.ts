export interface Film {
    characters: string[]
    created: string
    director: string
    edited: string
    episode_id: number
    opening_crawl: string
    planets: string[]
    producer: string
    release_date: string
    species: string[]
    starships: string[]
    title: string
    url: string
    vehicles: string[]
}
export interface Planet {
    climate: string
    created: string
    diameter: string
    edited: string
    films: string[]
    gravity: string
    name: string
    orbital_period: string
    population: string
    residents: string[]
    rotation_period: string
    surface_water: string
    terrain: string
    url: string
}
export interface People {
    birth_year: string
    eye_color: string
    films: string[]
    gender: string
    hair_color: string
    height: string
    homeworld: string
    mass: string
    name: string
    skin_color: string
    created: string
    edited: string
    species: string[]
    starships: string[]
    url: string
    vehicles: string[]
}
export interface Starship {
    MGLT: string
    cargo_capacity: string
    consumables: string
    cost_in_credits: string
    created: string
    crew: string
    edited: string
    hyperdrive_rating: string
    passengers: string
    length: string
    manufacturer: string
    max_atmosphering_speed: string
    model: string
    name: string
    films: string[]
    pilots: string[]
    starship_class: string
    url: string
}
export interface Vehicle {
    cargo_capacity: string
    consumables: string
    cost_in_credits: string
    created: string
    crew: string
    edited: string
    length: string
    manufacturer: string
    max_atmosphering_speed: string
    model: string
    name: string
    passengers: string
    pilots: string[]
    films: string[]
    url: string
    vehicle_class: string
}

export interface Species {
    average_height: string
    average_lifespan: string
    classification: string
    created: string
    designation: string
    edited: string
    eye_colors: string
    hair_colors: string
    homeworld: string
    language: string
    name: string
    people: string[]
    films: string[]
    skin_colors: string
    url: string
}

export interface All<T> {
    count: number
    results: T[]
}
export interface ISearchResult {
    results: {
        title: string
        url: string
    }[]
}
