import styled, { keyframes } from 'styled-components'

const moveCrawlAnimation = keyframes`
  from {
    opacity: 0.0;
    transform: rotateX(8deg) scaleY(0.5) translateY(300px);
  }
  10%{
    opacity: 1.0;
  }
  90&{
    opacity: 1.0;
  }
  to {
    opacity: 0.0;
    transform: rotateX(8deg) scaleY(0.5) translateY(-500px);
  }
`

export const OpeningCrawlWrapper = styled.div`
    background: black;
    position: relative;
    padding: 10px;
    right: 0;
    top: 0;
    left: 0;
    height: 400px;
    perspective: 60px;
    overflow: hidden;
`
export const OpeningCrawlInnerWrapper = styled.div`
    color: yellow;
    transform: rotateX(8deg) scaleY(1.5);
    animation: ${moveCrawlAnimation} 60s linear infinite;
    width: 300px;
    position: absolute;
    left: calc(50% - 150px);
`
export const OpeningCrawlTitle = styled.h1`
    font-size: 2rem;
`
export const OpeningCrawlText = styled.div``
export const OpeningCrawlParagraph = styled.p`
    font-size: 1rem;
`
