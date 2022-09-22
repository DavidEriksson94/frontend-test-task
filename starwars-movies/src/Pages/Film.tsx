import React, { useEffect } from 'react'
import { getAllFilms } from '../Services/swapi'

const Film = () => {
  useEffect(() => {
    getAllFilms().then(res => {
      console.log(res)
    })
    
  },[])
  return (
    <div>Film</div>
  )
}

export default Film