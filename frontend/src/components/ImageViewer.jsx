import React, { useState } from 'react'
import { Modal, Box, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { imageViewerStyles as styles } from '../styles'

const ImageViewer = ({ images, open, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1))
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    minWidth: '60%',
                    maxWidth: '90%',
                    minHeight: '60%',
                    maxHeight: '90%',
                    width: '90%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={styles.buttonContainer}>
                    <Button onClick={onClose} startIcon={<CloseIcon style={styles.closeIconStyle}/>} />
                </div>
                <div style={styles.iconContainer}>
                    <Button onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                        <ArrowLeftIcon fontSize="large" style={styles.iconStyle}/>
                    </Button>
                    <img
                        src={images[currentImageIndex]?.['path']}
                        alt={`Image ${currentImageIndex + 1}`}
                        style={styles.image}
                    />

                    <Button onClick={handleNextImage} disabled={currentImageIndex === images.length - 1}>
                        <ArrowRightIcon fontSize="large" style={styles.iconStyle}/>
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ImageViewer
