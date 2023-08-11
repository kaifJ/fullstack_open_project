import React, { useState } from 'react'
import { Modal, Box } from '@mui/material'

const ImageViewer = ({ images, open, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            Math.min(prevIndex + 1, images.length - 1)
        )
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
                    minWidth: '50%',
                    maxWidth: '80%',
                }}
            >
                <img
                    src={images[currentImageIndex]['path']}
                    alt={`Image ${currentImageIndex + 1}`}
                    height={'100%'}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        margin: '5px',
                    }}
                />
                <div>
                    <button
                        onClick={handlePrevImage}
                        disabled={currentImageIndex === 0}
                    >
                        Previous
                    </button>
                    <button onClick={onClose}>Close</button>
                    <button
                        onClick={handleNextImage}
                        disabled={currentImageIndex === images.length - 1}
                    >
                        Next
                    </button>
                </div>
            </Box>
        </Modal>
    )
}

export default ImageViewer
