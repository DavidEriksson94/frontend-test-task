import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getAllFilms } from '../Services/swapi'

const Films = () => {
  useEffect(() => {
    getAllFilms().then(res => {
      console.log(res)
    })
    
  },[])
  return (
    <div>Films

      <Outlet />
    </div>
    
  )
}

export default Films