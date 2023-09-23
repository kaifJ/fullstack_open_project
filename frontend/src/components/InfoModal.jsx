import { useState, useEffect } from 'react'
import formatPrice from '../utils/priceFormatter'
import CloseIcon from '@mui/icons-material/Close'
import { Modal, Box, Typography, Button } from '@mui/material'
import { weiToEth, ethToUsd } from '../utils/priceConversions'
import { infoModalStyles as styles } from '../styles'

const InfoModal = ({ requesterInfo, isModalOpen, handleClose }) => {
    const [usdPrice, setUsdPrice] = useState('0')

    useEffect(() => {
        const eth = weiToEth(requesterInfo.price.toString())
        ethToUsd(eth).then((usd) => {
            setUsdPrice(usd.toString())
        })
    }, [])
    return (
        <Modal open={isModalOpen} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    borderRadius: '5px',
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
                <div style={styles.button}>
                    <Button onClick={handleClose} startIcon={<CloseIcon />} />
                </div>
                <Box mt={2}>
                    <Typography variant="h5" component="div">
                        <span className="form-label">Requester: </span>{' '}
                        {requesterInfo.requester}
                    </Typography>
                    <Box className="details" style={styles.typographyStyle}>
                        <Typography variant="h5" mr={2}>
                            <span className="form-label">USD:</span>{' '}
                            {formatPrice(usdPrice)}
                        </Typography>
                        <Typography variant="h5" mr={2}>
                            <span className="form-label">Ethers:</span>{' '}
                            {weiToEth(requesterInfo.price.toString())}
                        </Typography>
                        <Typography variant="h5">
                            <span className="form-label">Wei:</span>{' '}
                            {requesterInfo.price.toString()}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h5" component="div">
                    <span className="form-label">Green light to transfer!!</span>{' '}
                </Typography>
            </Box>
        </Modal>
    )
}

export default InfoModal
