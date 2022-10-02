import styled from 'styled-components'

export const SearchBarWrapper = styled.div<{ minimize: boolean }>`
    position: relative;
    transition: 400ms;
    width: fit-content;
    ${(props) => {
        if (props.minimize) {
            return `
                padding-top:0px;
            `
        }
        return `
                padding-top: calc(50vh - 28px);
            `
    }};
`
export const SearchBarOuterWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`
export const SearchBarInput = styled.input`
    outline: none;
    padding: 0.75rem;
    max-width: 100%;
    width: 300px;
    border: 1px solid #393939;
    background: black;
    color: yellow;
    border-radius: 0.3rem;
    font-size: 1.5rem;
`
export const SearchBarClearButton = styled.span<{ show: boolean }>`
    width: 30px;
    height: 30px;
    position: absolute;
    color: yellow;
    background: #393939;
    border-radius: 100%;
    line-height: 27px;
    text-align: center;
    transform: translateY(-50%);
    transition: 400ms;
    &:after {
        content: 'x';
    }
    ${(props) => {
        if (props.show) {
            return `
                opacity: 1.0;
                right: 20px;
                top: 50%;
            `
        }
        return `
                opacity: 0.0;
                right: 10px;
                top: 0%;
            `
    }};
`
