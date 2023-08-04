import { useNotification } from 'web3uikit'

const Notification = () => {
    const dispatch = useNotification()

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNotification()
    }

    const handleFailure = async (error) => {
        handleNotificationFailure(error)
    }

    const handleNotification = () => {
        dispatch({
            type: 'success',
            title: 'Requested Successful',
            position: 'topR',
        })
    }

    const handleNotificationFailure = (error) => {
        dispatch({
            type: 'failure',
            title: 'Requested Successful',
            message: `${error.message || error[0]}`,
            position: 'topR',
        })
    }

    return {
        handleSuccess,
        handleFailure,
    }
}

export default Notification