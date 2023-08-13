import { useNotification } from 'web3uikit'
import { useContext } from 'react'
import { DispatchContext } from './Dashboard'

const Notification = () => {
    const dispatch = useNotification()
    const stateDispatch = useContext(DispatchContext)

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        stateDispatch({ type: 'dispatched' })
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
            title: 'Requested Failure',
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