import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ISearchResult } from '../../Services/swapi.types'
import {
    SearchResultChevron,
    SearchResultHeader,
    SearchResultList,
    SearchResultListItem,
    SearchResultTitle,
    SearchResultWrapper,
} from './SearchResult.style'

interface Props {
    title: string
    data: ISearchResult | undefined
}

const SearchResult = ({ title, data }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    if (!data || data.results.length === 0) {
        return null
    }
    const { results } = data
    return (
        <SearchResultWrapper>
            <SearchResultHeader onClick={() => setIsOpen(!isOpen)}>
                <SearchResultTitle>
                    {title} ({results.length})
                </SearchResultTitle>
                <SearchResultChevron open={isOpen} />
            </SearchResultHeader>
            {isOpen ? (
                <SearchResultList>
                    {results.map((result) => (
                        <SearchResultListItem>
                            <Link to={result.url}>{result.title}</Link>
                        </SearchResultListItem>
                    ))}
                </SearchResultList>
            ) : null}
        </SearchResultWrapper>
    )
}

export default SearchResult
