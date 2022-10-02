import React, { useState } from 'react'
import {
    SearchBarClearButton,
    SearchBarInput,
    SearchBarOuterWrapper,
    SearchBarWrapper,
} from './SearchBar.style'

interface Props {
    value: string
    onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: Props) => {
    //const [searchTerm, setSearchTerm] = useState<string>('')
    const hasSearchTerm = value.length > 0
    return (
        <SearchBarOuterWrapper>
            <SearchBarWrapper minimize={hasSearchTerm}>
                <SearchBarInput
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    placeholder="Search"
                />
                <SearchBarClearButton
                    show={hasSearchTerm}
                    onClick={() => onChange('')}
                />
            </SearchBarWrapper>
        </SearchBarOuterWrapper>
    )
}

export default SearchBar
