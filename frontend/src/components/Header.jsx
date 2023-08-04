import { ConnectButton } from 'web3uikit'

const Header = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <ConnectButton moralisAuth={false}/>
        </div>
    )
}

export default Header