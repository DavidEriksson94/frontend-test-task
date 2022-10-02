import React from 'react'
import { HeroTitle, HeroWrapper } from './Hero.style'

interface Props {
    title: string
    background_url: string
}
const Hero = ({ title, background_url }: Props) => {
    return (
        <HeroWrapper url={background_url}>
            <HeroTitle>{title}</HeroTitle>
        </HeroWrapper>
    )
}

export default Hero
