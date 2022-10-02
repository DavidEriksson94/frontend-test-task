import styled from 'styled-components'

export const SearchResultWrapper = styled.div``
export const SearchResultHeader = styled.div`
    position: relative;
    color: white;
    box-shadow: 0px 0px 3px #fff6;
    border-radius: 0.125rem;
    background: #202020;
    text-align: left;
    padding: 0.25rem 0.5rem;
`
export const SearchResultTitle = styled.h3`
    margin: 0;
`
export const SearchResultList = styled.div`
    display: flex;
    flex-direction: column;
    background: #202020;
    z-index: 9999;
    position: relative;
    margin-top: 0.5rem;
    text-align: left;
    gap: 0.5rem;
    padding: 0.5rem;
`
export const SearchResultListItem = styled.div``
export const SearchResultChevron = styled.span<{ open: boolean }>`
    &:after {
        content: '^';
    }
    position: absolute;
    top: 50%;
    right: 10px;
    transition: 200ms;
    ${(props) => {
        if (props.open) {
            return `
                transform:translateY(-50%) rotate(180deg) 
            `
        }
        return `
            transform:translateY(-50%) rotate(90deg) 
        `
    }};
`
