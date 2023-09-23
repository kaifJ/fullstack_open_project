import React from 'react'
import EmptyIcon from '@mui/icons-material/Inbox'
import { Typography } from '@mui/material'
import { emptyListStyles as styles } from '../styles'

const EmptyListComponent = ({ message }) => {
    return (
        <div style={styles.empptyListStyles}>
            <EmptyIcon
                style={styles.iconStyle}
            />
            <Typography variant="h3" color="textSecondary">
                {message || 'No properties to show.'}
            </Typography>
        </div>
    )
}

export default EmptyListComponent
