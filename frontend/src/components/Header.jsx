import { ConnectButton } from 'web3uikit'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('jwtTokn')
        navigate('/login')
    }

    return (
        <div className="header--container">
            <div className="header--container--left">
                <h1 className="header--header1">Dashboard</h1>
                <ConnectButton moralisAuth={false} />
            </div>
            <div className="header--container--right">
                <Button variant="contained" size="large" onClick={logout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Header
