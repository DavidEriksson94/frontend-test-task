import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useGetAllFilmsQuery } from '../Services/films'

const Films = () => {
    const { data, error, isLoading } = useGetAllFilmsQuery()
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Films
