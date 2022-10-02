import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllFilmsQuery } from '../Services/films'

const Films = () => {
    const { data, error, isLoading } = useGetAllFilmsQuery()
    return <div>films</div>
}

export default Films
