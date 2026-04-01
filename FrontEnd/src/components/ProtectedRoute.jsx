import React from 'react'
import { Navigate } from "react-router-dom"
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')
    if (!token) {        
        return <Navigate to="/login" />
    }
    console.log('is logged in', token)
    return children
}

export default ProtectedRoute