import { useEffect, useState } from 'react'
import Header from './Header'
import PropertyList from './PropertyList'
import { contractAddresses, abi } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import PropertyForm from './PropertyForm'
import { Modal, Box } from '@mui/material'

const Dashboard = () => {
    const { isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const [ownerAddress, setOwnerAddress] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: getContractOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'getContractOwner',
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            getContractOwner().then((ownerAddress) => {
                setOwnerAddress(ownerAddress.toLowerCase())
            })
        }
    }, [isWeb3Enabled])

    const handleClose = () => setIsModalOpen(false)

    return (
        <div>
            <Header />
            <PropertyList />
            {account &&
                ownerAddress &&
                account.toLowerCase() === ownerAddress && (
                <button onClick={() => setIsModalOpen(true)}>
                        Add Property
                </button>
            )}
            {isModalOpen && (
                <Modal open={isModalOpen} onClose={handleClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            minWidth: 300,
                            maxWidth: '80%',
                        }}
                    >
                        <PropertyForm handleClose={handleClose} />
                    </Box>
                </Modal>
            )}
        </div>
    )
}

export default Dashboard
