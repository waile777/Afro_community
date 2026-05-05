import React from 'react'
import { Navigate } from "react-router-dom"


function PublicRoute({ children }) {
    
    const token = localStorage.getItem('token')
    const url = window.location.pathname
    if (token && (url === "/")) {
        return <Navigate to="/discover" replace />
    }
    return children

}
export default PublicRoute
