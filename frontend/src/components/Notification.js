import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Notification = ({ open, message, severity, onClose }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        onClose()
    }

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={severity} elevation={6} variant="filled">
                {message}
            </MuiAlert>
        </Snackbar>
    )
}

export default Notification