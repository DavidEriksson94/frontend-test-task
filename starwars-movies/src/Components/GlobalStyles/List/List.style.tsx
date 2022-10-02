import styled from 'styled-components'

export const UnstyledList = styled.div`
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    padding: 0;
`
export const UnstyledListItem = styled.div`
    flex: 0 1 25%;
    @media (max-width: 768px) {
        flex: 0 1 33%;
    }
    @media (max-width: 480) {
        flex: 0 1 100%;
    }
`
