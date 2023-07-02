import React from 'react'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Dashboard from './components/Dashboard/dashboard'
import Loading from './components/Loading'
import { Routes, Route, useNavigate } from 'react-router-dom'


const App = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const token = localStorage.getItem('jwtToken')
        if(token)
            navigate('/')
        else
            navigate('/login')

        setLoading(false)

    }, [])

    if(loading) return <Loading />

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default App
