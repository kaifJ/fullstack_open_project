import { CircularProgress } from '@mui/material'

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
}

const Loading = () => {
    return (
        <div style={styles.container}>
            <CircularProgress />
        </div>
    )
}

export default Loading