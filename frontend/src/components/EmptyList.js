import React from 'react'
import EmptyIcon from '@mui/icons-material/Inbox'
import { Typography } from '@mui/material'

const EmptyListComponent = ({ message }) => {
    return (
        <div style={{ textAlign: 'center', padding: '20px', marginTop: '20%' }}>
            <EmptyIcon
                style={{
                    fontSize: '128px',
                    marginBottom: '10px',
                    color: '#ccc',
                }}
            />
            <Typography variant="h3" color="textSecondary">
                {message || 'No properties to show.'}
            </Typography>
        </div>
    )
}

export default EmptyListComponent
