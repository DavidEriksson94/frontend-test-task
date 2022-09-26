import styled from 'styled-components'

export const Page = styled.div<{ roundedTop?: boolean }>`
    position: relative;
    background: #101010;
    padding: 2rem;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    gap: 1rem;
    border-radius: ${(props) => (props.roundedTop ? '2rem 2rem 0 0' : '0')};
    margin-top: ${(props) => (props.roundedTop ? '-2rem' : '0')};
`

export const PageHeader = styled.div`
    text-align: left;
    color: white;
`
export const PageHeaderTitle = styled.h1`
    margin: 0;
    padding: 1rem 0;
    border-bottom: 1px solid white;
`
export const PageHeaderSubTitle = styled.h2`
    margin: 0;
    padding: 0.5rem 0;
`
