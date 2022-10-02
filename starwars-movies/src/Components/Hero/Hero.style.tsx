import styled from 'styled-components'

export const HeroWrapper = styled.div<{ url: string }>`
    width: 100%;
    position: relative;
    min-height: 400px;
    background-size: cover;
    background-image: ${(props) =>
        props.url
            ? `url(${props.url})`
            : 'url(https://cdn.pixabay.com/photo/2016/01/27/15/25/space-1164579_1280.png)'};'
`
export const HeroTitle = styled.h1`
    color: yellow;
    text-shadow: 1px 1px 4px black;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
`
