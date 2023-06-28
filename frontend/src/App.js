import React from 'react'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Dashboard from './components/Dashboard/dashboard'
import { Routes, Route } from 'react-router-dom'


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default App
