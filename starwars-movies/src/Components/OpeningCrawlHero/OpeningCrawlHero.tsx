import React from 'react'
import {
    OpeningCrawlInnerWrapper,
    OpeningCrawlParagraph,
    OpeningCrawlText,
    OpeningCrawlTitle,
    OpeningCrawlWrapper,
} from './OpeningCrawlHero.style'

interface Props {
    title: string
    text: string
}
const OpeningCrawlHero = ({ title, text }: Props) => {
    console.log(text)
    const dividedText = () => {
        return text
            .split('\r\n\r\n')
            .map((paragraph) => (
                <OpeningCrawlParagraph>{paragraph}</OpeningCrawlParagraph>
            ))
    }
    return (
        <OpeningCrawlWrapper>
            <OpeningCrawlInnerWrapper>
                <OpeningCrawlTitle>{title}</OpeningCrawlTitle>
                <OpeningCrawlText>{dividedText()}</OpeningCrawlText>
            </OpeningCrawlInnerWrapper>
        </OpeningCrawlWrapper>
    )
}

export default OpeningCrawlHero
