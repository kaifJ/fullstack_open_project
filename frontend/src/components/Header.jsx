import { ConnectButton } from 'web3uikit'

const Header = () => {
    return (
        <div className="header--container">
            <h1 className="header--header1">Dashboard</h1>
            <ConnectButton moralisAuth={false}/>
        </div>
    )
}

export default Header