import { useEffect, useState } from 'react'
import Header from './Header'
import PropertyList from './PropertyList'
import { useMoralis } from 'react-moralis'
import PropertyForm from './PropertyForm'
import { Modal, Box } from '@mui/material'
import { GetContractOwner } from '../contractServices/index.js'

const Dashboard = () => {
    const { isWeb3Enabled, account } = useMoralis()
    const [ownerAddress, setOwnerAddress] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const getContractOwner = GetContractOwner()

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
            {account &&
                ownerAddress &&
                account.toLowerCase() === ownerAddress && (
                <button onClick={() => setIsModalOpen(true)}>
                        Add Property
                </button>
            )}
            <PropertyList />
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
