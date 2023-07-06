import React, { useState, useEffect } from 'react'
import { Snackbar, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

const Toast = ({ message, onClose, autoCloseDuration = 3000 }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(true)

        const timer = setTimeout(() => {
            handleClose()
        }, autoCloseDuration)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setOpen(false)
        if (onClose) {
            onClose()
        }
    }

    return (
        <Snackbar
            style={{ '--message-color': 'red' }}
            open={open}
            autoHideDuration={autoCloseDuration}
            onClose={handleClose}
            message={message}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            action={
                <IconButton size="small" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    )
}

export default Toast
